import * as express from 'express'
import * as mongoose from 'mongoose'
import { Application } from 'express'
import * as session from 'express-session';
import * as connectMongo from 'connect-mongo'


var MongoStore = connectMongo(session);
mongoose.connect('mongodb://localhost:27017/LicensePanel',{ useNewUrlParser: true,useUnifiedTopology: true });

class App {
    public app: Application

    constructor(appInit: { middleWares: any; controllers: any; }) {
        this.app = express()

        this.assets()
        this.middlewares(appInit.middleWares)
        this.template()
        this.routes(appInit.controllers)
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void; }) {
        middleWares.forEach(middleWare => {
            this.app.use(middleWare)
        })
    }

    private routes(controllers: { forEach: (arg0: (controller: any) => void) => void; }) {
        controllers.forEach(controller => {
            this.app.use(controller.path, controller.router)
        })
    }

    private assets() {
        this.app.use(express.static('public'))
        this.app.use(express.static('views'))
        // console.log(session)
        this.app.use(session({
            name: "qid",
            secret: '3456hgfhgjfghj5463456',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
            },
            store: new MongoStore({ mongooseConnection: mongoose.connection })
        }));
    }

    private template() {
        this.app.set('view engine', 'ejs')
    }

    public listen(port: number) {
        this.app.listen(port, () => {
            console.log(`App listening on the http://localhost:${port}`)
        })
    }
}

export default App