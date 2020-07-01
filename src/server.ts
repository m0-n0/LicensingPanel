import App from './app'

import * as bodyParser from 'body-parser'
import loggerMiddleware from './middleware/logger'

import ApiController from './controllers/api/api.controller'
import HomeController from './controllers/home/home.controller'
import AdminController from './controllers/admin/admin.controller'


const app = new App({
    controllers: [
        new HomeController(),
        new AdminController(),
        new ApiController()
    ],
    middleWares: [
        bodyParser.json({limit: '50mb'}),
        bodyParser.urlencoded({limit: '50mb', extended: true }),
        loggerMiddleware
    ]
})

app.listen(8080)