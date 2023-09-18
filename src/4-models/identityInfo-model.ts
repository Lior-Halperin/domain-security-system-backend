import { IIdentityOrganization } from "./identityOrganization";

export interface IIdentityInfo {
  domainName: string;
  expiresDate: string;
  registrant: IIdentityOrganization;
  administrativeContact: IIdentityOrganization;
  technicalContact: IIdentityOrganization;
  hostNames: [];
  status: 'pending' | 'completed';
  scanDate: string;
}

export class IdentityInfoModel {
  public domainName: string;
  public expiresDate: string;
  public registrant: string;
  public administrativeContact: string;
  public technicalContact: string;
  public hostNames: string;
  public  status: 'pending' | 'completed';
  public scanDate: string;

  constructor(data: IIdentityInfo) {
    this.domainName = data.domainName;
    this.expiresDate = data.expiresDate;
    this.registrant = JSON.stringify(data.registrant);
    this.administrativeContact = JSON.stringify(data.administrativeContact);
    this.technicalContact = JSON.stringify(data.technicalContact);
    this.hostNames = JSON.stringify(data.hostNames);
    this.status = data.status;
    this.scanDate = data.scanDate
  }

  // Todo - add validation
}
