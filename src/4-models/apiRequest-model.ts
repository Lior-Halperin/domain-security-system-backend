import axios, { AxiosResponse } from "axios";
import { ApisList } from "./apis-list";
import tools from "../2-utils/tools";
import dbDal from "../2-utils/db-dal";
import { IdentityInfoModel } from "./identityInfo-model";
import { SecurityInfoModel } from "./securityInfo-model";

class ApiRequestModel {
  private endpoint: string;
  public readonly limitRequest: number;
  public readonly duration: number;
  private paramsApi: object;
  private headersApi: object;
  public apiType: ApisList;

  public constructor(apiName: ApisList) {
    this.endpoint = process.env[`API_URL_${apiName}`];
    this.duration = Number(process.env[`API_LIMITED_DURATION_${apiName}`]); // 1000
    this.limitRequest = Number(process.env[`API_LIMITED_REQUEST_DURATION_${apiName}`]); // 50
    this.apiType = apiName;

    switch (apiName) {
      case ApisList.whois:
        this.paramsApi = {
          apiKey: process.env[`API_KEY_${apiName}`],
          domainName: "",
          outputFormat: "JSON",
        };
        break;
      case ApisList.virusTotal:
        this.headersApi = {
          "x-apikey": process.env[`API_KEY_${apiName}`],
        };
        break;
    }
  }

  public async axiosRequest(domainName: string) {
    try {
      const endpoint =
        this.apiType === ApisList.virusTotal
          ? this.endpoint + domainName
          : this.endpoint;

      this.apiType === ApisList.whois &&
        (this.paramsApi["domainName"] = domainName);
      const response: AxiosResponse = await axios.get(endpoint, {
        params: this.paramsApi,
        headers: this.headersApi,
      });
      //   return response.data;
      this.updateApiTableOnDB(response);
    } catch (err: any) {
      console.error(`Error occurred for ${domainName}: ${err.message}`);
      throw err;
    }
  }

  private async updateApiTableOnDB(apiResponse: AxiosResponse) {
    try {
      const scanDate = tools.creatorDateNew();
      let dateApi = apiResponse.data;
      console.log(dateApi);
      // Put the data into the database
      let sql: string = "";
      let values = [];
      switch (this.apiType) {
        case ApisList.whois:
          dateApi = dateApi.WhoisRecord;
          const identityInfo: IdentityInfoModel = new IdentityInfoModel({
            domainName: dateApi.domainName,
            expiresDate: dateApi.expiresDate,
            registrant: dateApi.registrant,
            administrativeContact: dateApi.administrativeContact,
            technicalContact: dateApi.technicalContact,
            hostNames: dateApi.nameServers["hostNames"],
            status: "completed",
            scanDate: scanDate,
          });
          sql =
            "UPDATE identity_info SET domainName = ?, expiresDate = ?, registrant = ?, administrativeContact = ?, technicalContact = ?, hostNames = ?, scanDate = ?, status = ? WHERE domainName  = ?";
          values = [
            identityInfo.domainName,
            identityInfo.expiresDate,
            identityInfo.registrant,
            identityInfo.administrativeContact,
            identityInfo.technicalContact,
            identityInfo.hostNames,
            identityInfo.scanDate,
            identityInfo.status,
            identityInfo.domainName,
          ];
          break;
        case ApisList.virusTotal:
          dateApi = dateApi.data;
          const securityInfoModel: SecurityInfoModel = new SecurityInfoModel({
            domainId: dateApi.id,
            whois: dateApi.attributes.whois,
            lastHttpsCertificate: dateApi.attributes.last_https_certificate,
            reputation: dateApi.attributes.reputation,
            lastAnalysisResults: dateApi.attributes.last_analysis_results,
            categories: dateApi.attributes.categories,
            totalVotes: dateApi.attributes.total_votes,
            createdDate: dateApi.creation_date,
            updatedDate: dateApi.last_update_date,
            status: "completed",
            scanDate: scanDate,
          });
          sql =
            "UPDATE security_info SET domainId = ? , whois = ? , lastHttpsCertificate = ? , reputation = ? , lastAnalysisResults = ? , categories = ? , totalVotes = ? , createdDate = ? , updatedDate = ? , status = ? , scanDate = ?   WHERE domainId  = ?";
          values = [
            securityInfoModel.domainId,
            securityInfoModel.whois,
            securityInfoModel.lastHttpsCertificate,
            securityInfoModel.reputation,
            securityInfoModel.lastAnalysisResults,
            securityInfoModel.categories,
            securityInfoModel.totalVotes,
            securityInfoModel.createdDate,
            securityInfoModel.updatedDate,
            securityInfoModel.status,
            securityInfoModel.scanDate,
            securityInfoModel.domainId,
          ];
          break;
      }
      await dbDal.execute(sql, values);
      //   console.log(`Inserted data for ${domain}`);
    } catch (err: any) {
      //   console.error(`Failed to fetch data for ${domain}`);
      throw err;
    }
  }
}

export default ApiRequestModel;
