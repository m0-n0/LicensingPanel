import { Request, Response } from 'express'
import Logger from './../models/logger.model'

const loggerMiddleware = (req: Request, resp: Response, next) => {
    var ip = req.connection.remoteAddress;
      
    //console.log('Request logged:', req.method, req.path)
    var logger = new Logger({
        ip: ip,
        method: req.method,
        path: req.path,
        body: JSON.stringify(req.body),
        date: Date.now()
    });
    logger.save((saveError=>{
       if(saveError) console.log(saveError)
    }))
    next()
}

export default loggerMiddleware