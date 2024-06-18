import { response } from "express";
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
  switch (apiName) {
    case ApisList.whois:
      sql =
        "SELECT domainName FROM identity_info WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR scanDate = 'pending' ORDER BY scanDate ASC";
      break;
    case ApisList.virusTotal:
      sql =
        "SELECT domainId AS domainName FROM security_info WHERE DATEDIFF(CURDATE(), scanDate) > 30 OR scanDate = 'pending' ORDER BY scanDate ASC";
      break;
  }
  const domains = await dbDal.execute(sql);
  console.log(domains);
  return domains;
}

// Function that sends API requests every x milliseconds for each domain until the list is exhausted
async function processDomainsWithInterval(domains: string[],apiRequestModel: ApiRequestModel): Promise<void> {
  // Calculate the delay interval
  const intervalDelay: number =
    apiRequestModel.duration / apiRequestModel.limitRequest;

  const promises: Promise<any>[] = [];

  // Run the function that brings information from the external API for each domain
  for (let index = 0; index < domains.length; index++) {
    // Create a promise for the delay
    const delayPromise = new Promise((resolve) =>
      setTimeout(resolve, intervalDelay)
    );

    // Chain the API request to the delay promise
    const requestPromise = delayPromise.then(() =>
      apiRequestModel
        .axiosRequest(domains[index])
        .then((response) => ({ status: "fulfilled", value: response }))
        .catch((error) => ({ status: "rejected", reason: error }))
    );
    // Add the chained promise to the array
    promises.push(requestPromise);
  }

  // Use Promise.allSettled to send API calls concurrently and handel all outcomes
  const results = await Promise.allSettled(promises);

  // Process the results
  results.forEach((result, idx) => {
    if (result.status === "fulfilled") {
      console.log(`Response from ${domains[idx]}:`, result.value);
    } else {
      console.error(`Error from ${domains[idx]}:`, result.reason);
    }
  });
}

export default {
  processDomainsWithInterval,
  getDomainsByLastUpdateDate,
};
