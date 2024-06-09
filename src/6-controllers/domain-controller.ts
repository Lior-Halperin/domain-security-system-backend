import express, {Request, Response, NextFunction} from 'express';
import logic from '../5-logic/domain-logic';
import requestLogs from '../3-middlewares/request-logs';

const router = express.Router();

// GET http://localhost:3002/api/domain/domainName
router.get("/domain/:domainName", requestLogs, async (request: Request, response: Response, next: NextFunction)=> {
    try{
        const domainName = request.params.domainName
        const domainInfoResponse = await logic.getDomainInfoByName(domainName)

        response.json(domainInfoResponse)

    }
    catch(err:any){
        next(err)
    }
});

// POST http://localhost:3002/api/add-domain
router.post("/add-domain", requestLogs ,async (request: Request, response: Response, next: NextFunction)=>{
    try{
        const domainName:string = request.body.domain
        const messageResponse: string = await logic.addNewDomain(domainName)

        response.status(201).send(messageResponse)
    }
    catch(err:any){
         next(err)
    }
});

export default router;