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
  const sql = `SELECT * FROM domains AS do JOIN identity_info AS ide ON do.domainId = ide.domainId JOIN security_info AS se ON do.domainId = se.domainId WHERE do.domainId ="${domainName}"`;

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
  const sqlDomainChecking = `SELECT * FROM domains WHERE domainId = ?`;

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
  const connection = await dal.getConnection();
  try {
    await dal.beginTransaction(connection);

    // SQL queries
    const sql1 = `INSERT INTO domains(domainId, activityStatus) VALUES(?,?)`;
    const sql2 = `INSERT INTO identity_info(domainId, status) VALUES(?,?)`;
    const sql3 = `INSERT INTO security_info(domainId, status) VALUES(?,?)`;

    // Execute queries within the transaction using the same connection
    await dal.execute(sql1, [domainName, "active"], connection); 
    await dal.execute(sql2, [domainName, "pending"], connection);
    await dal.execute(sql3, [domainName, "pending"], connection);

    // Commit transaction if all queries succeed
    await dal.commitTransaction(connection);
  } catch (error) {
    // Rollback transaction if any query fails
    await dal.rollbackTransaction(connection);

    // Re-throw the error for further handling
    throw error;
  } finally {
    // Ensure the connection is released back to the pool
    connection.release();
  }
}

export default {
  getDomainFullDetailsByName,
  addNewDomain,
};
