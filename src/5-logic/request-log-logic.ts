import dbDal from "../2-utils/db-dal";
import RequestLogsModel from "../4-models/request-log-model";

async function addLogRequest(req: RequestLogsModel): Promise<void> {
  try {
    const sql = `INSERT INTO request_logs(method, url, headers, body, timestamp) VALUES(?,?,?,?,?)`;
    await dbDal.execute(sql, [
      req.method,
      req.url,
      req.headers,
      req.body,
      req.timestamp,
    ]);
  } catch (err: any) {
    console.log(err);
  }
}

export default addLogRequest;
