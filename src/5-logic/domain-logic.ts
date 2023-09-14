import dal from "../2-utils/db-dal";
import {
  AddingExistingParameterError,
  ResourceNotFoundError,
  ValidationError,
} from "../4-models/errors-model";

async function getDomainInfoByName(domainName: string): Promise<any> { // Todo: promise type
  // Todo: Promise<domainInfoResponse>

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

  if (!domain) {
    // sql query:
    const sql = `INSERT INTO domains(domainName) VALUES(?)`;

    // Send query do DB - add domain
    await dal.execute(sql, [domainName]);
    throw new ResourceNotFoundError(domainName);
  }

  // return domainInfoResponse
  return domain;
}

async function addNewDomain(domainName: string): Promise<any>{ // Todo: promise type
 
    
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

  // sql query:
  const sql = `INSERT INTO domains(domainName,activityStatus) VALUES(?,?)`;

  // Send query do DB - add domain
  await dal.execute(sql, [domainName]);

  return "The domain has been accepted and is waiting to be scanned.";
}

export default {
  getDomainInfoByName,
  addNewDomain,
};
