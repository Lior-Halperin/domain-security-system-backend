import { OkPacket } from "mysql";
import dal from "../2-utils/db-dal";
import { DomainModelFullDetail } from "../4-models/domain-model";
import {
  AddingExistingParameterError,
  ResourceNotFoundError,
  ValidationError,
} from "../4-models/errors-model";


async function getDomainFullDetailsByName(domainName: string): Promise<DomainModelFullDetail> {
  // Todo: Validate domain name using ragex:
  const regex = /^.{2,20}$/; // least two characters and up to 20 characters
  const errors = regex.test(domainName);
  if (!errors) {
    throw new ValidationError("The domain is not invalid");
  }

    // sql query:
    const sql = `SELECT * FROM domains AS do JOIN identity_info AS ide ON do.identityInfoId = ide.id JOIN security_info AS se ON do.securityInfoId = se.id WHERE do.domainName ="${domainName}"`;

    // Send query do DB
    const result = await dal.execute(sql, [domainName]);

  if (!result[0]) {
    // Add domain
   await addDomainHelpFunction(domainName);
    throw new ResourceNotFoundError(domainName);
  }

  // return domainInfoResponse
  return result[0];
}

async function addNewDomain(domainName: string): Promise<string> {

  // Todo: Validate domain name using ragex:
  const regex = /^.{2,20}$/; // least two characters and up to 20 characters
  const errors = regex.test(domainName);

  if (!errors) {
    throw new ValidationError("The domain is not invalid");
  }

  // Checking if the domain exists in a database:
    // sql query:
    const sqlDomainChecking = `SELECT * FROM domains WHERE domainName = ?`;

    // Send query do DB
    const result = await dal.execute(sqlDomainChecking, [domainName]);
    
  // if the domain exists in the DB:
  if (result[0]) {
    throw new AddingExistingParameterError(domainName);
  }

  await addDomainHelpFunction(domainName);

  return "The domain has been accepted and is waiting to be scanned.";
}

// Helper function for adding a new domain - prevents duplication in the code.
async function addDomainHelpFunction(domainName: string): Promise<void> {
  try {
    // sql query:
    const sql = `INSERT INTO domains(domainName, securityInfoId, identityInfoId, activityStatus) VALUES(?,?,?,?)`;
    const sql2 = `INSERT INTO identity_info(domainName, status) VALUES(?,?)`;
    const sql3 = `INSERT INTO security_info(domainId , status) VALUES(?,?)`;

    // Send query do DB - add domain
    const identityInfo: OkPacket = await dal.execute(sql2, [domainName, "pending"]);
    const securityInfo: OkPacket = await dal.execute(sql3, [domainName, "pending"]);
    if(identityInfo.insertId > 0 && securityInfo.insertId > 0){
        await dal.execute(sql, [domainName, securityInfo.insertId, identityInfo.insertId, "active"]);
    }
  } catch (err: any) {
    throw err;
  }
}

export default {
  getDomainFullDetailsByName,
  addNewDomain,
};
