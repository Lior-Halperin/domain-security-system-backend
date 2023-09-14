import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cron from "node-cron";
import { RouteNotFoundError } from "./4-models/errors-model";
import catchAll from "./3-middlewares/catch-all";
import config from "./2-utils/config";
import domainController from "./6-controllers/domain-controller";
import scanDomainsLogic from "./5-logic/scanDomains-logic";
import dbDal from "./2-utils/db-dal";
import { DomainModel } from "./4-models/domain-model";

const server = express();

async function scanDomains() {
  try {
    // Get the domains required for scanning by date from the DB
    const domainsToScan: DomainModel[] =
      await scanDomainsLogic.getDomainsByLastUpdateDate(); // Todo: Add domainModel[] type

    console.log(domainsToScan);
    // Creates an array of domain names:
    const domainNamesList: string[] = domainsToScan.map(
      (domain) => domain.domainName
    );

    // Send domains list to scan
    scanDomainsLogic.processDomainsWithInterval(domainNamesList, 1000); // Todo: domains is variable
  } catch (err: any) {
    throw err;
  }
}
// This will schedule the function to run at 9 in the morning and 11 at night.
cron.schedule("0 9,23 * * *", scanDomains);

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") server.use(cors());

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Endpoint
server.use("/api", domainController);
// Todo: add "add-domain" endpoint.

// Route not found
server.use("*", (request: Request, response: Response, next: NextFunction) => {
  console.log("---Route not found---");

  const err = new RouteNotFoundError(request.method, request.originalUrl);
  next(err);
});

server.use(catchAll);

server.listen(config.serverPort, () => {
  try {
    console.log(`Listening on http://localhost:${config.serverPort}`);
  } catch (err: any) {
    console.log("Error connecting to database:", err);
  }
});
