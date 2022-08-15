// npm i express cors dotenv ejs
import path from 'path'
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// @ts-ignore
import express from 'express'
// @ts-ignore
import cors from 'cors'

const app = express()
// @ts-ignore
app.use(cors())
// @ts-ignore
app.use(express.json())
// @ts-ignore
app.use(express.urlencoded({extended : false}))
// @ts-ignore
app.use(express.static(path.join(__dirname, 'public')))
// @ts-ignore
app.set('view engine', 'ejs')
// @ts-ignore
app.set('views', path.join(__dirname, 'views'))

/** Middleware APIS */


// @ts-ignore  render de plantillas ejs
app.get('/', (req, res)=>{
    res.render('index', {title: 'Pizza Restaurant'})
})

// @ts-ignore  redirecct to index
app.use((req, res) => {
    res.redirect("/");
});

export default app
