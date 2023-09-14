import { IIdentityInfo } from "./identityInfo-model";
import { ISecurityInfo } from "./securityInfo-model";

export interface IDomainModel {
  domainName: string;
  securityInfo: ISecurityInfo;
  identityInfo: IIdentityInfo;
  scanDate: string;
  activityStatus: "new" | "active" | "inactive";
}

export class DomainModel {
  public id: number;
  public domainName: string;
  public securityInfo: string;
  public identityInfo: string;
  public activityStatus: "new" | "active" | "inactive";
  public scanDate: string;

  public constructor(domain: DomainModel) {
    this.domainName = domain.domainName;
    this.securityInfo = JSON.stringify(domain.securityInfo);
    this.identityInfo = JSON.stringify(domain.identityInfo);
    this.scanDate = domain.scanDate;
    this.activityStatus = domain.activityStatus;
  }
}
