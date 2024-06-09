import { NextFunction, Request, Response } from "express";
import addLogRequest from "../5-logic/request-log-logic";
import RequestLogsModel from "../4-models/request-log-model";

async function requestLogs(request: Request, response: Response, next: NextFunction): Promise<void> {
  try {
    const { method, url, headers, body } = request;
    const req = new RequestLogsModel({ method, url, headers, body });
    await addLogRequest(req);
    next()
  } catch (err: any) {
    console.log(err);
  }
}

export default requestLogs ;
