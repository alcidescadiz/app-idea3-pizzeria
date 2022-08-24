import {pool} from './connect-posgres.js';


async function allRowTable(table){
    try {
        let data = await pool.query(`SELECT * FROM ${table}`)
        return data.rows
    } catch (error) {
        console.log({error:error})
    }
}

async function rowTableForIdUser(id_user, table){
    let row = await pool.query(`SELECT * FROM ${table} WHERE id_user=${id_user}`)
    return row.rows
}
async function rowTableForId(id, table){
    let row = await pool.query(`SELECT * FROM ${table} WHERE id=${id}`)
    return row.rows
}
async function rowTableForTwoWhere(filds, field1, value1, field2, value2, table){
    try {
        let rows = await pool.query(`SELECT ${filds} FROM ${table} WHERE ${field1}=$1 AND ${field2}=$2`,[value1, value2])
        return rows.rows
    } catch (error) {
        return error
    }
}
async function rowTableForOneWhere(filds, field1, value1, table){
    try {
        let rows = await pool.query(`SELECT ${filds} FROM ${table} WHERE ${field1}=$1`,[value1])
        return rows.rows
    } catch (error) {
        return error
    }
}

async function addInvoiceTable({id_user,totalList,date,details},table){
    try {
        let invoice = await pool.query(`INSERT INTO ${table} ( id_user, total, date, details) VALUES (${id_user}, '${totalList}', '${date}','${details}')`)
        return invoice.rowCount
    } catch (error) {
        return error
    }
}

async function addUserTable({name,email,password },table){
    let user = await pool.query(`INSERT INTO ${table} ( name, email, password, role) VALUES ( '${name}', '${email}','${password}','client')`)
    return user.rowCount
}

export default  {
    allRowTable,
    rowTableForIdUser,
    rowTableForId,
    rowTableForOneWhere,
    rowTableForTwoWhere,
    addInvoiceTable,
    addUserTable
}