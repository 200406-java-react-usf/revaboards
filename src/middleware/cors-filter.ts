import { Request, Response } from 'express';

export function corsFilter(req: Request, resp: Response, next) {

    // Using req.headers.origin to specify this header value is for dev use only (never use in prod!)
    resp.header('Access-Control-Allow-Origin', `${req.headers.origin}`);
    resp.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');
    resp.header('Access-Control-Allow-Credentials', 'true');
    resp.header('Access-Control-Allow-Methods', 'POST, PUT, PATCH, GET, DELETE');
    
    // If this request is an OPTIONS request (aka "pre-flight request") send it back with a status of 200
    if(req.method === 'OPTIONS') {
        resp.sendStatus(200)
    } else{
        next();
    }

}