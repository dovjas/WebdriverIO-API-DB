import request from 'supertest';
import reporter from './reporter.ts';

let payload = {
    email:"eve.holt@reqres.in",
    password:"pistol"
}

async function GET(testid:string, baseURL:string, endpoint:string, authToken:string, queryParam:string){
    if(!baseURL || !endpoint){
        throw new Error(`Base url: ${baseURL} or Endpoint: ${endpoint} is not valid`);
    };
    baseURL = baseURL.trim();
    endpoint = endpoint.trim();
    reporter.addStep(testid,'info', `Making a GET request for ${endpoint}`)
    try{
        return await request(baseURL)
          .get(endpoint)
          .query(queryParam)
          .set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('x-api-key', process.env.REQRES_API_KEY);
    }catch(err){
        err.message = `Error making GET request ${err.message}, endpoint: ${endpoint}`;
        throw err;
    };
};

async function POST(
  testid: string,
  baseURL: string,
  endpoint: string,
  authToken: string,
  payload: object
) {
  if (!baseURL || !endpoint) {
    throw new Error(`Base url: ${baseURL} or Endpoint: ${endpoint} is not valid`);
  }
  baseURL = baseURL.trim();
  endpoint = endpoint.trim();
  reporter.addStep(testid, 'info', `Making a POST request for ${endpoint}`);
  try {
    return await request(baseURL)
      .post(endpoint)
      .set('x-api-key',process.env.REQRES_API_KEY)
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send(payload);
  } catch (err) {
    err.message = `Error making POST request ${err.message}, endpoint: ${endpoint}`;
    throw err;
  }
};

export default {GET, POST};
//api/users?page=2
