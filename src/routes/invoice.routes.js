import express from 'express';
import { invoiceForUser, allInvoice, createInvoice } from '../controllers/invoice.controllers.js';
const invoiceRouter = express.Router()

export default (app)=> {
    invoiceRouter
    .get('/', allInvoice)
    .get('/:id_user', invoiceForUser)
    .post('/', createInvoice)
    
    app.use('/v1-api/invoice', invoiceRouter)
}