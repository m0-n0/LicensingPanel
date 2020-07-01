import * as express from 'express'
import { Request, Response } from 'express'
import IControllerBase from 'interfaces/IControllerBase'
import {SessionRequest} from '../../extends/ExtendedRequest'

class HomeController implements IControllerBase {
    public path = '/'
    public router = express.Router()

    constructor() {
        this.initRoutes()
    }

    public initRoutes() {
        this.router.get('/', this.index)
        this.router.get('/login', this.index)
        this.router.post('/login', this.auth)
        this.router.get('/logout', this.logout)
    }

    index = (req: SessionRequest, res: Response) => {
        if(req.session.admin){
            res.redirect('/admin/');
            return;
        }
        res.render('home/auth');
    }
    auth = (req: SessionRequest, res: Response) => {
        var data = {
            password: req.body.password,
            login: req.body.username
        };
        if(data.login == 'admin' ){//&& data.password == 'CTsft9879'
            req.session.admin = true;
            res.send({location:"/admin/"});
            return;
        }
        res.send({error:"User not found!"});
    }
    logout = (req: SessionRequest, res: Response) => {
        req.session.admin = false;
        req.session.name  = '';
        res.redirect('login');
        res.end();
    }
}

export default HomeController