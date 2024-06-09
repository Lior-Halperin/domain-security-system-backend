import { IncomingHttpHeaders } from "http";

interface IRequestLogsModel {
    method: string
    url: string
    headers:IncomingHttpHeaders
    body:IncomingHttpHeaders
} 

class RequestLogsModel {
  private _method: string;
  private _url: string;
  private _headers: string;
  private _body: string;
  private _timestamp: Date;

  public constructor(req: IRequestLogsModel) {
    this._method = req.method;
    this._url = req.url;
    this._headers = JSON.stringify(req.headers);
    this._body = JSON.stringify(req.headers);
    this._timestamp = new Date();
  }

  public get method() {
    return this._method;
  }
  public get url() {
    return this._url;
  }
  public get headers() {
    return this._headers;
  }
  public get body() {
    return this._body;
  }
  public get timestamp() {
    return this._timestamp;
  }
}

export default RequestLogsModel;
