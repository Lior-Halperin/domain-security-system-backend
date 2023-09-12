import dal from "../2-utils/db-dal";

async function getDomainInfoByName(domainName: string): Promise<void> { // Todo: Promise<domainInfoResponse>
  try {

    // Todo: Validate domain name using JOI / ragex :
    // const errors = domainRequest.validateDomain();

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

async function addNewDomain(domainName:string) {

    // Todo: Validate domain name using JOI / ragex:
    // const errors = domainRequest.validateDomain(); 

    // if (errors) {
        // throw new ValidationError(errors)
    // }

    // Checking if the domain exists in a database:
    const domainChecking = await getDomainInfoByName(domainName);

    if(domainChecking[0]){
        return "The domain exists in the system."
    }
    else{
        // sql ..... add domain
        return "The domain has been accepted and is waiting to be scanned."
    }

}

export default {
  getDomainInfoByName,
};
