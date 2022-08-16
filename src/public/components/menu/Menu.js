export function Menu([fn]){
    let divMenu = document.createElement('div')
    const {status, name} = fn()
    const userAncor = `<a class="nav-link text-white " href="#user">${name}🙍‍♂️</a>`
    const loginAncor= `<a class="nav-link text-white " href="#login">Login🔐</a>`

    let contentMenu = `
    <div class="fixed-bottom bg-dark">
        <ul class="nav justify-content-center ">
            <li class="nav-item">
                ${status? userAncor : loginAncor}
            </li>
            <li class="nav-item  ">
                <a class="nav-link active text-white" aria-current="page" href="#">Menu🍕</a>
            </li>
            <li class="nav-item  ">
                <a class="nav-link text-white" href="#car">Carshop🛒</a>
            </li>
        </ul>
    </div>
    `
    divMenu.innerHTML = contentMenu
    return divMenu
}