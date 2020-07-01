import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase'
import User from './../../models/user.model'
import AesEncryption from './../aes.controller'

class ApiController implements IControllerBase {
    public path = '/api'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.post('/check', this.check) 
    }


    check = (req: Request, res: Response) => {
        var ip = req.connection.remoteAddress;
        
        if(typeof(req.body.data) == 'string') {

            var data:string = req.body.data;
            var pubHwid:string = req.body.hwid;
            var aes:AesEncryption = new AesEncryption();
            try
            {
                var decrypted = aes.decrypt(data);
                var protection = decrypted.protection;
                if(decrypted.hwid){

                    User.findOne({'hwid':decrypted.hwid},(findError,findData)=>{
                        
                        
                        if(findError) {
                            res.send({'error':findError});
                            return;
                        }
                        if(!findData) {
                            var us = new User();
                            us.Active = false;
                            us.hwid = decrypted.hwid;
                            us.userIp = ip;
                            us.save();
                            res.send({'error':"User not found!"});
                            return;
                        }
                        if(!findData.Active) {
                            res.send({'error':"User not found!"});
                            return;
                        }
                        if(findData.userIp != ip){
                            findData.ChangedIp = true;
                            findData.info += `IP: ${ip}\r\n`;
                           // findData.save();
                        }
                        if(decrypted.hwid!= pubHwid){
                            findData.Active = false;
                            findData.info += `HWID: ${pubHwid} || ${decrypted.hwid}\r\n`;
                           // findData.save();
                        }
                        if(decrypted.hwid!= pubHwid||findData.userIp != ip)findData.save();
                        var targetLocation = "{\"targetLocation\":{\"latitude\":4.3,\"longitude\":3.96,\"type\":\"other\"}}";
                        var data = {
                            checkpost:targetLocation,
                        }
                        res.send({'data':aes.encrypt(data)});
                        return;
                    });    
                }else{
                    res.send({error:"User Not Found!"});
                    return;
                }
                
            }catch(ex)
            {
                res.send({'error':ex});
                return;
            }
             
        }
        //if(ip != '127.0.0.1')  res.send({error:"User not found!"});
        
        //res.send({error:"User not found! "});
    }
}

export default ApiController