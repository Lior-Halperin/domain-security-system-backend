import express from "express"

const server = express();

// Todo - add cors

// Tell express to extract json object from request body into request.body variable:
server.use(express.json());

// Todo - add endpoint
    // domain
    // add-domain

// Todo - Rout not found

// Todo - add cathAll

server.listen(3001, ()=>{
    try{
        console.log(`Listening on http://localhost:3001`);
    }
    catch(err:any){
        console.log('Error connecting to database:', err);
    }
})



