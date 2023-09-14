class whoisConfig {
  public readonly endpoint = process.env.API_URL_WHOIS;
  public readonly limitRequest = process.env.API_LIMITED_DURATION_WHOIS; // 1000
  public readonly duration = process.env.API_LIMITED_REQUEST_DURATION_WHOIS; // 50
  public readonly apiKey = process.env.API_KEY_WHOIS;
  public readonly outputFormat = "JSON";
}

import axios from "axios";
import dbDal from "./db-dal";
import tools from "./tools";
// host: process.env[`DB_HOST${operator}`],

// Send request and update database
async function sendRequestAndUpdateDB(domain: string) {
  try {
    // Replace this with your actual API endpoint and request payload if needed
    const response = await axios.get(
      `${process.env.API_URL_WHOIS}`,
      {
        params: {
          apiKey: process.env[`API_KEY_WHOIS`],
          domainName: domain,
          outputFormat: "JSON",
        },
      }
    );
      console.log(response)
    if (response.status === 200) {
        const scanDate = tools.creatorDateNew()
        const rawData = JSON.stringify(response.data)
      // Put the data into the database
      const sql = "UPDATE domains SET identityInfo = ?, scanDate = ?, activityStatus = ? WHERE domainName  = ?";
      await dbDal.execute(sql, [rawData, scanDate, 'active' ,domain ]);
      console.log(`Inserted data for ${domain}`);
    } else {
      console.error(`Failed to fetch data for ${domain}`);
    }
  } catch (error) {
      console.error(`Error occurred for ${domain}: ${error.message}`);
      throw error;
  }
}

export default sendRequestAndUpdateDB;
