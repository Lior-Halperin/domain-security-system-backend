
async function getDomainInfoByName(name: string): Promise<void> { // Todo: Promise<domainInfoResponse>
  try {

    // Todo: Validate domain name using JOI:
    // const errors = domainRequest.validateGetDomain();

    // if (errors) {
        // throw new ValidationError(errors)
    // }

    // Todo: Writing an sql query:
    // const sql = SELECT ....

    // Todo: Send query do DB:
    // const domainInfoResponse: domainInfoResponseModel = await dalDB.execute(sql,[id]); // return string || domainModel

    // Todo: handel domainInfoResponse
    // if (typeof domainInfoResponse === 'string'){
    //          add  a domain to a list for analysis.
    // }

    // return domainInfoResponse

  } catch (err: any) {}
}

export default {
  getDomainInfoByName,
};
