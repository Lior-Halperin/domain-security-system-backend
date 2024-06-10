import dal from "../2-utils/db-dal";
import { DomainModel } from "../4-models/domain-model";
import {
  AddingExistingParameterError,
  ResourceNotFoundError,
  ValidationError,
} from "../4-models/errors-model";

async function getDomainByName(domainName: string): Promise<DomainModel> {
  // Todo: Validate domain name using ragex:
  const regex = /^.{2,20}$/; // least two characters and up to 20 characters
  const errors = regex.test(domainName);

  if (!errors) {
    throw new ValidationError("The domain is not invalid");
  }

  // Send query do DB
  const domain = await getDomainByNameHelpFunction(domainName)

  if (!!domain[0]) {
    // Add domain
   await addDomainHelpFunction(domainName);
    throw new ResourceNotFoundError(domainName);
  }

  // return domainInfoResponse
  return domain[0];
}

async function addNewDomain(domainName: string): Promise<string> {

  // Todo: Validate domain name using ragex:
  const regex = /^.{2,20}$/; // least two characters and up to 20 characters
  const errors = regex.test(domainName);

  if (!errors) {
    throw new ValidationError("The domain is not invalid");
  }

  // Checking if the domain exists in a database:
  const result = await getDomainByNameHelpFunction(domainName)

  // if the domain exists in the DB:
  if (result[0]) {
    throw new AddingExistingParameterError(domainName);
  }

  await addDomainHelpFunction(domainName);

  return "The domain has been accepted and is waiting to be scanned.";
}

// Helper function for get domain by name - prevents duplication in the code.
async function getDomainByNameHelpFunction(domainName: string): Promise<DomainModel[]> {
  try {
    // sql query:
    const sqlDomainChecking = `SELECT * FROM domains WHERE domainName = ?`;

    // Send query do DB
    const result = await dal.execute(sqlDomainChecking, [domainName]);

    return result;
  } catch (err: any) {
    throw err
  }
}

// Helper function for adding a new domain - prevents duplication in the code.
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
