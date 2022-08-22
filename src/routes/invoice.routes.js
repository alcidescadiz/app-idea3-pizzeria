import express from 'express';
import { invoiceForUser, allInvoice, createInvoice, invoiceForId } from '../controllers/invoice.controllers.js';
import { Auth } from '../middlewares/auth.middlewares.js';
const invoiceRouter = express.Router()

export default (app)=> {
    invoiceRouter
    .get('/', Auth, allInvoice)
    .get('/:id_user',Auth, invoiceForUser)
    .get('/get/:id', Auth, invoiceForId)
    .post('/', createInvoice)
    
    app.use('/v1-api/invoice', invoiceRouter)
}