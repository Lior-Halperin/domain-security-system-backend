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
  const sql = `SELECT * FROM domain WHERE domain_name = ?`;

  // Send query do DB
  const domain = await dal.execute(sql, [domainName]);

  if (!domain) {
    // sql query:
    const sql = `INSERT INTO domain(domain_name) VALUES(?)`;

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
  const sqlDomainChecking = `SELECT * FROM domain WHERE domain_name = ?`;

  // Send query do DB
  const domain = await dal.execute(sqlDomainChecking, [domainName]);

  // if the domain exists in the DB:
  if (domain[0]) {
    throw new AddingExistingParameterError(domainName);
  }

  // sql query:
  const sql = `INSERT INTO domain(domain_name) VALUES(?)`;

  // Send query do DB - add domain
  await dal.execute(sql, [domainName]);

  return "The domain has been accepted and is waiting to be scanned.";
}

export default {
  getDomainInfoByName,
  addNewDomain,
};
