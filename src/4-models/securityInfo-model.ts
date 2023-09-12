import { IApiRawData } from "./apiRawData";
import { IDateStamp } from "./dateStamp";

export interface ISecurityInfo extends IDateStamp, IApiRawData {
  domainId: string;
  categories: object;
  lastAnalysis_results: object;
  lastHttpsCertificate: object;
  whois: string;
  reputation: number;
  totalVotes: object;
  createdDate: number;
  updatedDate: number;
}

export class SecurityInfoModel {
  public readonly _id: string;
  public readonly domainId: string;
  public readonly categories: string;
  public readonly lastAnalysis_results: string;
  public readonly lastHttpsCertificate: string;
  public readonly whois: string;
  public readonly reputation: number;
  public readonly totalVotes: string;
  public readonly createdDate: number;
  public readonly updatedDate: number;
  public readonly rawData: string;
  public readonly apiType: string;
  public readonly hashSelectedData: string;

  public constructor(data: ISecurityInfo) {
    this._id = data.domainId;
    this.domainId = data.domainId;
    this.categories = JSON.stringify(data.categories);
    this.lastAnalysis_results = JSON.stringify(data.lastAnalysis_results);
    this.lastHttpsCertificate = JSON.stringify(data.lastHttpsCertificate);
    this.whois = data.whois;
    this.reputation = data.reputation;
    this.totalVotes = JSON.stringify(data.totalVotes);
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.rawData = JSON.stringify(data.rawData);
    this.apiType = data.apiType;
    this.hashSelectedData = data.hashSelectedData;
  }

  // Todo - add validation
}
