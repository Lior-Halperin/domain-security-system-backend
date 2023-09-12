import express, {Request, Response, NextFunction} from 'express';
import logic from '../5-logic/domain-logic';

const router = express.Router();

// GET http://localhost:3002/api/domain/domainName
router.get("/domain/:domainName", async (request: Request, response: Response, next: NextFunction)=> {
    try{
        // console.log(request.params.domainName)
        const domainName = request.params.domainName
        // Todo: const domainInfoResponse: domainInfoResponseModel = await logic.getDomainInfoByName(domainName)
        const domainInfoResponse = await logic.getDomainInfoByName(domainName)

        // Todo: response.json(domainInfoResponse)

        response.json(domainInfoResponse)
        // response.json('OK')

    }
    catch(err:any){
        console.log(111111)
        next(err)
    }
});

export default router;