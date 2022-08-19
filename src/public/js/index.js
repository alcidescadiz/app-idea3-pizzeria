'use strict'
// @ts-check

import Router from "../modules/Router.clouser.js";
import {Menu,ListFood,LoginPage,User,Register,CarShop,Invoice} from '../components/index.js'

let {Loading, Route, Render, RenderEvent, PageNotFound, Login, appSesionStorage} = Router();

// appSesionStorage.setSesionStorage({status: true, token: 'Alcides'},'algo')
// appSesionStorage.getSesionStorage({keyStorage:'algo', goTo:'#login'})
// console.log(Login())
// appSesionStorage.upateSesionStorage({ token: 'antonio', dos:'dos'},'algo')
//console.log(Login({ name: 'antonio', status:true,car:[], token: ""}))

Route({ path: null,        template: Menu,       props: [Login], protect: false  });
Route({ path: "",          template: ListFood,   props: [Login], protect: false  });
Route({ path: "#login",    template: LoginPage,  props: [Login], protect: false  });
Route({ path: "#user",     template: User,       props: [Login], protect: false  });
Route({ path: "#register", template: Register,   props: [], protect: false  });
Route({ path: "#car",      template: CarShop,    props: [Login], protect: false  });
Route({ path: "#invoice",  template: Invoice,    props: [], protect: false  });

Render();
RenderEvent();