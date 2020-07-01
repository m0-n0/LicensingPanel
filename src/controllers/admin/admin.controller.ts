import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase'
import User from './../../models/user.model'

class ApiController implements IControllerBase {
    public path = '/admin'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get(    '/', this.index)
        this.router.get(    '/users', this.users)
        this.router.delete( '/users', this.removeuser)
        this.router.post(   '/users', this.edituser)
        this.router.put(    '/users', this.newuser)
        this.router.get(    '/jsonusers', this.jsonusers)

    }

    index = (req: Request, res: Response) => {
        if(!req.session.admin){
            res.redirect('/login');
            res.end();
            return;
        }
        res.render('admin/admin');
    }
    users = (req: Request, res: Response) => {
        if(!req.session.admin){
            res.redirect('/login');
            res.end();
            return;
        }
        res.render('admin/users');
    } 
  
    jsonusers = (req: Request, res: Response) => {
        if(!req.session.admin){
            res.redirect('/login');
            res.end();
            return;
        }
        User.find((err,data)=>{
            if(err) throw err;
            res.send(data);
        });
    }
    newuser = (req: Request, res: Response) => {

        var data = {
            hwid: req.body.hwid,
            userIp: req.body.ip,
            Active: req.body.Active,
            ChangedIp: req.body.ChangedIp
        };
        var us = new User(data);
        us.save((err)=>{
            if(err) res.send(err);
            else this.jsonusers(req,res);
        });
    }
    edituser = (req: Request, res: Response) => {

        var data = {
            hwid: req.body.hwid,
            userIp: req.body.ip,
            Active: req.body.Active,
            ChangedIp: req.body.ChangedIp
        };
        User.findByIdAndUpdate(req.body.id,data,(findErr,doc)=>{
            if(findErr) res.send(findErr);
            else this.jsonusers(req,res);
        } );
    }
    removeuser = (req: Request, res: Response) => {

        User.findById(req.body.id,(findErr,doc)=>{
            if(findErr) res.send(findErr);
            else {
                if(doc != null){
                    doc.remove((removeErr, data1)=>{
                        if(removeErr) res.send(removeErr);
                        else this.jsonusers(req,res);
                    });
                }
                else
                this.jsonusers(req,res);
            }
        } );
    }
  
}

export default ApiController