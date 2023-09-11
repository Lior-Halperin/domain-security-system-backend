import express, { NextFunction, Request, Response } from "express"
import { RouteNotFoundError } from "./4-models/errors-model";

const server = express();

// Todo - add cors

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Todo - add endpoint
    // domain
    // add-domain

// Route not found
server.use("*", (request: Request, response: Response, next: NextFunction) => {
    console.log("---Route not found---")

    const err = new RouteNotFoundError(request.method, request.originalUrl);
    next(err);
});

// Todo - add cathAll

server.listen(3001, ()=>{
    try{
        console.log(`Listening on http://localhost:3001`);
    }
    catch(err:any){
        console.log('Error connecting to database:', err);
    }
})



