import dal from "../2-utils/db-dal";
import { DomainModel } from "../4-models/domain-model";
import {
  AddingExistingParameterError,
  ResourceNotFoundError,
  ValidationError,
} from "../4-models/errors-model";

async function getDomainByName(domainName: string): Promise<DomainModel> {
  // Todo: promise type

  // Todo: Validate domain name using ragex:
  const regex = /^.{2,20}$/; // least two characters and up to 20 characters
  const errors = regex.test(domainName);

  if (!errors) {
    throw new ValidationError("The domain is not invalid");
  }

  // sql query:
  const sql = `SELECT * FROM domains WHERE domainName = ?`;

  // Send query do DB
  const domain = await dal.execute(sql, [domainName]);

  if (domain.length === 0) {

    // Add domain
    addDomainHelpFunction(domainName)
    throw new ResourceNotFoundError(domainName);
  }

  // return domainInfoResponse
  return domain;
}

async function addNewDomain(domainName: string): Promise<any> {
  // Todo: promise type

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

    addDomainHelpFunction(domainName)

  return "The domain has been accepted and is waiting to be scanned.";
}

async function addDomainHelpFunction(domainName: string): Promise<void> {
  try {
    // sql query:
    const sql = `INSERT INTO domains(domainName,activityStatus) VALUES(?,?)`;
    const sql2 = `INSERT INTO identity_info(domainName, status) VALUES(?,?)`;
    const sql3 = `INSERT INTO security_info(domainId , status) VALUES(?,?)`;

    // Send query do DB - add domain
    await dal.execute(sql, [domainName, "active"]);
    await dal.execute(sql2, [domainName, "pending"]);
    await dal.execute(sql3, [domainName, "pending"]);

  } catch (err: any) {
    throw err;
  }
}

export default {
  getDomainByName,
  addNewDomain,
};
