import {ValidarEsquema} from 'validaresquema'
import { InvoiceSchema } from '../model/invoice.schema.js'


export async function validateDataInvoiceCreate(req, res, next){
    try {
        let {id_user, totalList,date, details } = req.body 
        const result = ValidarEsquema(InvoiceSchema(id_user, totalList,date, details))
        if (result.Result === 'Errors') throw result.Response
        next()
        return
    } catch (error) {
        res.json({error})
    }
}