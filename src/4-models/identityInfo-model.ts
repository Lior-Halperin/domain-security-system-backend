import { IIdentityOrganization } from "./identityOrganization";

export interface IIdentityInfo {
  domainName: string;
  expiresDate: string;
  registrant: IIdentityOrganization;
  administrativeContact: IIdentityOrganization;
  technicalContact: IIdentityOrganization;
  hostNames: [];
  status: string;
}

export class IdentityInfoModel {
  public readonly _id: string;
  public readonly domainName: string;
  public readonly expiresDate: string;
  public readonly registrant: string;
  public readonly administrativeContact: string;
  public readonly technicalContact: string;
  public readonly hostNames: string;
  public readonly status: string;

  constructor(data: IIdentityInfo) {
    this._id = data.domainName;
    this.domainName = data.domainName;
    this.expiresDate = data.expiresDate;
    this.registrant = JSON.stringify(data.registrant);
    this.administrativeContact = JSON.stringify(data.administrativeContact);
    this.technicalContact = JSON.stringify(data.technicalContact);
    this.hostNames = JSON.stringify(data.hostNames);
    this.status = data.status;
  }

  // Todo - add validation
}
