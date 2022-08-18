import { cnx } from "../config/connect-mysql.js"


export function invoiceForUser(req, res){
    try {
        let {id_user} = req.params
        cnx.query(`SELECT * FROM invoice WHERE id_user=?`,[id_user], function(error, results, fields) {
            if (error) throw error
            res.json({msg:results})
        });
        cnx.end()
    } catch (error) {
        res.json({error:error})
    }
}
export function allInvoice(req, res){
    try {
        cnx.query(`SELECT * FROM invoice`, function(error, results, fields) {
            if (error) throw error
            res.json({msg:results})
        });
        cnx.end()
    } catch (error) {
        res.json({error:error})
    }
}

export async function createinvoice(req, res){
    try {
        let {car,totalList,date } = req.body 
        cnx.query(`INSERT INTO invoice (id, id_user, total, date, details) VALUES (NULL, '1', '${totalList}', '${date}','${JSON.stringify(car)}')`, function(err, results, fields) {
                if (err) throw err
            }
        );
        cnx.end()
        res.json({msg:'invoice created'})
    } catch (error) {
        res.json({msg:error})
    }
}