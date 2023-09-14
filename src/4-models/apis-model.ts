import axios from "axios";
import { ApisList } from "./apis-list";

class ApiRequest {
  private endpoint: string;
  private limitRequest: string;
  private duration: string;
  private paramsApi: object;
  private headersApi: object;
  public apiType: ApisList;

  public constructor(apiName: ApisList) {
    this.endpoint = process.env[`API_URL_${apiName}`];
    this.limitRequest = process.env[`API_LIMITED_DURATION_${apiName}`]; // 1000
    this.duration = process.env[`API_LIMITED_REQUEST_DURATION_${apiName}`]; // 50
    this.apiType = apiName
    // this.apiKey = process.env[`API_KEY_${apiName}`];
    // this.outputFormat = "JSON";
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
    const endpoint =
      this.apiType === ApisList.virusTotal
        ? this.endpoint + domainName
        : this.endpoint;

      this.apiType === ApisList.whois
        && (this.paramsApi["domainName"] = domainName)
    const response = await axios.get(endpoint, {
      params: this.paramsApi,
      headers: this.headersApi,
    });
    return response;
  }
}

export default ApiRequest;
