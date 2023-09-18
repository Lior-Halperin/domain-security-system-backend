import { IDateStamp } from "./dateStamp";

export interface ISecurityInfo extends IDateStamp {
  domainId: string;
  categories: object;
  lastAnalysisResults: object;
  lastHttpsCertificate: object;
  whois: string;
  reputation: number;
  totalVotes: object;
  createdDate: number;
  updatedDate: number;
  status: 'pending' | 'completed'; // Todo: change to enum
  scanDate: string;
}

export class SecurityInfoModel {
  public domainId : string;
  public categories : string;
  public lastAnalysisResults : string;
  public lastHttpsCertificate : string;
  public whois : string;
  public reputation : number;
  public totalVotes : string;
  public createdDate : number;
  public updatedDate : number;
  public status : 'pending' | 'completed';
  public scanDate: string;



  public constructor(data: ISecurityInfo) {
    this.domainId = data.domainId;
    this.categories = JSON.stringify(data.categories);
    this.lastAnalysisResults = JSON.stringify(data.lastAnalysisResults);
    this.lastHttpsCertificate = JSON.stringify(data.lastHttpsCertificate);
    this.whois = data.whois;
    this.reputation = data.reputation;
    this.totalVotes = JSON.stringify(data.totalVotes);
    this.createdDate = data.createdDate;
    this.updatedDate = data.updatedDate;
    this.status = data.status;
    this.scanDate = data.scanDate
}

  // Todo - add validation
}
