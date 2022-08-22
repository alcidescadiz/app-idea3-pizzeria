import express from 'express';
import { invoiceForUser, allInvoice, createInvoice, invoiceForId } from '../controllers/invoice.controllers.js';
const invoiceRouter = express.Router()

export default (app)=> {
    invoiceRouter
    .get('/', allInvoice)
    .get('/:id_user', invoiceForUser)
    .get('/get/:id', invoiceForId)
    .post('/', createInvoice)
    
    app.use('/v1-api/invoice', invoiceRouter)
}