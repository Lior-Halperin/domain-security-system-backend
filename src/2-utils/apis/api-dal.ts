// import { APIRequester } from './apiRequester';
// import config from './config.json';

// const apiRequesters = config.apis.map(apiConfig => new APIRequester(apiConfig));

// async function checkDomains(domains: string[]) {
//     const results = [];

//     for (const domain of domains) {
//         const domainResults = {};

//         for (const requester of apiRequesters) {
//             try {
//                 const data = await requester.request(domain);
//                 domainResults[requester.config.endpoint] = data;
//             } catch (error) {
//                 domainResults[requester.config.endpoint] = { error: error.message };
//             }
//         }

//         results.push(domainResults);
//     }

//     return results;
// }

// (async () => {
//     const domains = ['example.com', 'example.net']; // get domain from DB
//     const results = await checkDomains(domains);
//     console.log(results);
// })();

// ---------------------------------------------------------------
// function apiWhois() {
//     const Configs = new whoisConfig();
//     const domainList = [
//       "domain-1",
//       "domain-2",
//       "domain-3",
//       "domain-4",
//       "domain-5",
//     ];
  
//     let intervalId;
  
  
//     intervalId = setInterval(() => {
//       console.log("G");
//     }, Number(Configs.duration));
//   }