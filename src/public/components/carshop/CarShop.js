export function CarShop([fn]){
    let {status, car, user} = fn()
    if (status !== true) {
        window.location.hash= '#login'
        return
    }
    let mainCarShop = document.createElement('main')
    mainCarShop.classList.add('car-shop', "pb-5", "container")
    let listCardShop= car.map((e,i)=>{
        return `<tr>
                    <td>${i+1}</td>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td>${e.price}</td>
                    <td>${e.quantity}</td>
                    <td>${e.price * e.quantity}</td>
                </tr>`
    }).join('')
    let totalList =car.reduce((a,e) => a +(e.price * e.quantity),0)
    let contentCarShop = `
    <div class="text-center text-white display-5">Pedido a realizar: </div>
    <br>
    <div class="text-center text-white h5">${new Intl.DateTimeFormat('es').format(new Date())} </div>
    <br>
    <!--- Tabla Pedido --->  
    <div>
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
            <tbody class="table-group-divider">
                ${listCardShop}
                <tr class="table-group-divider">
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td><b>Total</b></td>
                    <td>${totalList || 0}</td>
                </tr>
            </tbody>
        </table> 
    </div> 
    <buttom class="btn btn-primary" id="addBuyToConfirm"> Realizar pedido </buttom>
    `
    setTimeout(()=>{
        document.getElementById("addBuyToConfirm")?.addEventListener("click", e =>{
            let dataToConfirm = {
                car, totalList,
                id_user: user.id,
                date: new Intl.DateTimeFormat('es').format(new Date())
            }
            if (dataToConfirm.totalList === 0){
                alert('No tiene pedidos a realizar')
                return
            }
            fetch(window.location.origin + "/v1-api/invoice",{
                body: JSON.stringify(dataToConfirm),
                method:"POST",
                headers:{
                    "Content-Type": "application/json"
                }
            }) 
            .then((res) => res.json())
            .then((json) => {
              if(json.msg === 1){
                fn({car:[]})
                console.log(fn())
                window.location.hash= '#'
              }
            });
        })
    },10)

    mainCarShop.innerHTML = contentCarShop
    return mainCarShop
}