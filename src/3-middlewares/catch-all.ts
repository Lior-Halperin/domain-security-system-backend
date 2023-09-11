import fs from "fs/promises";
import { NextFunction, Request, Response } from "express";

const filePath = "./src/1-assets/err.txt"


async function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    console.log(err)
    logStackTrace(err)

    const status = err.status || 500;
    const message = err.message || "Unknown Error";

    if (status === 500) {

        const now = new Date();
        const method = request.method;
        const route = request.originalUrl;
        const ip = request.ip;

        const data = `Time: ${now.toLocaleString()}, Method: ${method}, Route: ${route},
        err status: ${status}, err message: ${message}, ip:${ip}\n\n`;

        await fs.appendFile(filePath, data);
    }

    

    response.status(status).send(message);

}

export default catchAll;

function logStackTrace(error: Error): void {
    console.error('=== STACK TRACE ===');
    console.error(error.stack);
  
    const stackTrace = error.stack || '';
    const callsites = stackTrace
      .split('\n')
      .slice(1)
      .map((line) => line.trim().split('at ')[1])
      .filter((line) => line !== undefined);
  
    console.error('=== FUNCTION FLOW ===');
    console.error(callsites.reverse().join('\n'));
  }