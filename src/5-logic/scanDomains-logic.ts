import dbDal from "../2-utils/db-dal";
import ApiRequestModel from "../4-models/apiRequest-model";
import { ApisList } from "../4-models/apis-list";

// Function that get the domains required for scanning by date from the DB:
async function getDomainsByLastUpdateDate(apiName: string): Promise<any> {
  //Todo: the promise type need to be domainModel[]

  // ASC - With this change, the domains that were scanned longest ago (over a month ago) will appear first, while those that were scanned more recently (but still over a month ago) will appear last.
//   const sql =
    // "SELECT * FROM domains WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR activityStatus = 'new' ORDER BY scanDate ASC";
    let sql: string;
    switch (apiName){
        case (ApisList.whois):
        sql = "SELECT domainName FROM identity_info WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR scanDate = 'pending' ORDER BY scanDate ASC";
        break;
        case (ApisList.virusTotal):
        sql = "SELECT domainId AS domainName FROM security_info WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR scanDate = 'pending' ORDER BY scanDate ASC";
        break;
    }
  const domains = await dbDal.execute(sql);
console.log(domains)
  return domains;
}

// Function that sends API requests every x milliseconds for each domain until the list is exhausted
function processDomainsWithInterval(domains: string[],apiRequestModel: ApiRequestModel) {
  let index = 0;
  
    const intervalDelay:number = apiRequestModel.duration/apiRequestModel.limitRequest
  // Runs the function that brings information from the external API as the number of domains I received, in a time interval according to the variable I received
  const intervalId = setInterval(() => {
    if (index < domains.length) {
    //   sendRequestAndUpdateDB(domains[index]).catch((error) =>
    apiRequestModel.axiosRequest(domains[index])        
    //   ); // Todo: Document the errors.
      index++;
    } else {
      clearInterval(intervalId); // clear interval once all domains are processed
    }
  }, intervalDelay);
}

export default {
  processDomainsWithInterval,
  getDomainsByLastUpdateDate,
};
