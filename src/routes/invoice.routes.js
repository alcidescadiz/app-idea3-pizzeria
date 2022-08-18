import express from 'express';
import { createinvoice, invoiceForUser, allInvoice } from '../controllers/invoice.controllers.js';
const invoiceRouter = express.Router()

export default (app)=> {
    invoiceRouter
    .get('/', allInvoice)
    .get('/:id_user', invoiceForUser)
    .post('/', createinvoice)
    
    app.use('/v1-api/invoice', invoiceRouter)
}