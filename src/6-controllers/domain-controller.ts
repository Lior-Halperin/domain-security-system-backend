import express, {Request, Response, NextFunction} from 'express';

const router = express.Router();

// GET http://localhost:3002/api/domain/domainName
router.get("/domain/:domainName", async (request: Request, response: Response, next: NextFunction)=> {
    try{
        const domainName = request.params.domainName
        // Todo: const domainInfoResponse: domainInfoResponseModel = await logic.getDomainInfoByName(domainName)

        // Todo: response.json(domainInfoResponse)

        response.json(domainName)
        // response.json('OK')

    }
    catch(err:any){
        console.log(111111)
        next(err)
    }
});

export default router;