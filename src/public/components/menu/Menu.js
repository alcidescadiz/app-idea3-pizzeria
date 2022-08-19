export function Menu([fn]){
    let headerMenu = document.createElement('header')
    const {status, user} = fn()
    const userAncor = `<a class="nav-link text-white " href="#user">${user.name}🙍‍♂️</a>`
    const loginAncor= `<a class="nav-link text-white " href="#login">Login🔐</a>`

    let contentMenu = `
        <nav class="fixed-bottom bg-dark">
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
        </nav>
    `
    headerMenu.innerHTML = contentMenu
    return headerMenu
}