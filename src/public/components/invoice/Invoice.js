export function Invoice([fn]){
    let mainInvoice = document.createElement('main')
    const {status, user, idInvoice} =fn()
    if (status !== true) {
        window.location.hash= '#login'
        return
    }
    let contentInvoice = `
    <div class="text-center text-white display-5" id="codiceInvoice">Factura ${'codigo'}</div>
    <br>
    <div class="text-center text-white h5" id="clientInvoice">Cliente: ${'cliente'} </div>
    <div class="text-center text-white h5" id="dateInvoice">Fecha: ${'fecha'} </div>
    <br>
    <!--- Desglose Factura --->  
    <div class="container">
        <table class="table bg-light table-responsive">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Id Producto</th>
                    <th scope="col">Producto</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Monto</th>
                </tr>
            </thead>
            <tbody class="table-group-divider" id="tableInvoice">
                
            </tbody>
        </table> 
    </div>`
    
    let listDetailInvoice = (invoice)=>{
        let totalList = ()=> invoice.reduce((a,e) => a +(e.price * e.quantity),0)
        let gererateDetailInvoice =  invoice.map((e,i)=>{
            return `<tr>
                        <td>${i+1}</td>
                        <td>${e.id}</td>
                        <td>${e.name}</td>
                        <td>${e.price}</td>
                        <td>${e.quantity}</td>
                        <td>${e.price * e.quantity}</td>
                    </tr>`
        }).join('')
        let totalInvoice = `
            <tr class="table-group-divider">
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td><b>Total</b></td>
                <td>${totalList() || 0}</td>
            </tr>
        `
        // @ts-ignore
        document.getElementById("tableInvoice").innerHTML = gererateDetailInvoice + totalInvoice
    }
    fetch(window.location.origin + `/v1-api/invoice/get/${idInvoice}`,{
        method:"GET",
        headers:{
            "Content-Type": "application/json"
        }
    }) 
    .then((res) => res.json())
    .then((json) => {
        if(json.msg.length === 1){
          console.log(json)
        // @ts-ignore
        document.getElementById("codiceInvoice").innerHTML= `Factura N°: ${json.msg[0].id}`
        // @ts-ignore
        document.getElementById("dateInvoice").innerHTML= `Fecha: ${json.msg[0].date}`
        // @ts-ignore
        document.getElementById("clientInvoice").innerHTML= `Cliente: ${user.name.toUpperCase()}`
        //let setInvoice = JSON.parse(json.msg[0].details) mysql
        let setInvoice = json.msg[0].details // postgres
        listDetailInvoice(setInvoice)
      }
    });
    mainInvoice.innerHTML = contentInvoice

    return mainInvoice
}