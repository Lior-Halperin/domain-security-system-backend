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
        next(err)
    }
});

// GET http://localhost:3002/api/add-domain
router.post("/add-domain", async (request: Request, response: Response, next: NextFunction)=>{
    try{
        const domainName = request.body.domain
        const messageResponse: string = await logic.addNewDomain(domainName)

        response.status(201).send(messageResponse)
    }
    catch(err:any){
         next(err)
    }
});

export default router;