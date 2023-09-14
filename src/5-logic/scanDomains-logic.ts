import dbDal from "../2-utils/db-dal";
import sendRequestAndUpdateDB from "../2-utils/whois-api-dal";

// Function that get the domains required for scanning by date from the DB:
async function getDomainsByLastUpdateDate(): Promise<any> {
  //Todo: the promise type need to be domainModel[]

  // ASC - With this change, the domains that were scanned longest ago (over a month ago) will appear first, while those that were scanned more recently (but still over a month ago) will appear last.
  const sql =
    "SELECT * FROM domains WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR activityStatus = 'new' ORDER BY scanDate ASC";
  const domains = await dbDal.execute(sql);
console.log(2222222)
  return domains;
}

// Function that sends API requests every x milliseconds for each domain until the list is exhausted
function processDomainsWithInterval(domains: string[], duration: number) {
  let index = 0;

  // Runs the function that brings information from the external API as the number of domains I received, in a time interval according to the variable I received
  const intervalId = setInterval(() => {
    if (index < domains.length) {
      sendRequestAndUpdateDB(domains[index]).catch((error) =>
        console.error(error)
      ); // Todo: Document the errors.
      index++;
    } else {
      clearInterval(intervalId); // clear interval once all domains are processed
    }
  }, duration);
}

export default {
  processDomainsWithInterval,
  getDomainsByLastUpdateDate,
};
