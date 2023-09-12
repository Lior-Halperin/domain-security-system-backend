import { IIdentityInfo } from "./identityInfo-model";
import { ISecurityInfo } from "./securityInfo-model";

export interface IDomainModel {
  securityInfo: ISecurityInfo;
  identityInfo: IIdentityInfo;
  activityStatus: boolean;
}

export class DomainModel {
  public readonly securityInfo: string;
  public readonly identityInfo: string;
  public readonly activityStatus: string;

  public constructor(data: IDomainModel) {
    this.securityInfo = JSON.stringify(data.securityInfo);
    this.identityInfo = JSON.stringify(data.identityInfo);
    this.activityStatus = JSON.stringify(data.activityStatus);
  }
}
