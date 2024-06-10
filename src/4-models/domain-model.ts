import { IdentityInfoModel } from "./identityInfo-model";
import { SecurityInfoModel } from "./securityInfo-model";

export interface IDomainModelFullDetail {
  domainName: string;
  securityInfoId: SecurityInfoModel;
  identityInfoId: IdentityInfoModel;
  scanDate: string;
  activityStatus: "new" | "active" | "inactive";
}

export class DomainModelFullDetail implements IDomainModelFullDetail{
  public id: number;
  public domainName: string;
  public securityInfoId: SecurityInfoModel;
  public identityInfoId: IdentityInfoModel;
  public activityStatus: "new" | "active" | "inactive";
  public scanDate: string;

  public constructor(domain: IDomainModelFullDetail) {
    this.domainName = domain.domainName;
    this.securityInfoId = domain.securityInfoId;
    this.identityInfoId = domain.identityInfoId;
    this.scanDate = domain.scanDate;
    this.activityStatus = domain.activityStatus;
  }
}
