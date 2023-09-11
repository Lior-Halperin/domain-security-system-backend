import express, { NextFunction, Request, Response } from "express"
import cors from "cors"
import { RouteNotFoundError } from "./4-models/errors-model";
import catchAll from "./3-middlewares/catch-all";

const server = express();

//  Backend approval to browse AJAX to backend API
if (process.env.NODE_ENV === "development") server.use(cors());

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

server.use(catchAll);

server.listen(3001, ()=>{
    try{
        console.log(`Listening on http://localhost:3001`);
    }
    catch(err:any){
        console.log('Error connecting to database:', err);
    }
})



