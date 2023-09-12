import dal from "../2-utils/db-dal";

async function getDomainInfoByName(domainName: string): Promise<void> { // Todo: Promise<domainInfoResponse>
  try {

    // Todo: Validate domain name using JOI:
    // const errors = domainRequest.validateGetDomain();

    // if (errors) {
        // throw new ValidationError(errors)
    // }

    // sql query:
    const sql = `SELECT * FROM domain WHERE domain_name = ?`;

    // Send query do DB
    const domain = await dal.execute(sql,[domainName]);

    // Todo: if (!domain) addDomainToAnalysis(domainName)
    
    // return domainInfoResponse
    return domain

  } catch (err: any) {}
}

export default {
  getDomainInfoByName,
};
