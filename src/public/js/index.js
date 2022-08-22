'use strict'
// @ts-check

import Router from "../modules/Router.clouser.js";
import {Menu,ListFood,LoginPage,User,Register,CarShop,Invoice} from '../components/index.js'

let {Loading, Route, Render, RenderEvent, PageNotFound, Login, appSesionStorage,messageForm} = Router();

appSesionStorage.getSesionStorage({keyStorage:'sessionAppPizzeria', goTo:'#login'})
// appSesionStorage.upateSesionStorage({ token: 'antonio', dos:'dos'},'algo')

Route({ path: null,        template: Menu,       props: [Login], protect: false  });
Route({ path: "",          template: ListFood,   props: [Login, messageForm], protect: false  });
Route({ path: "#login",    template: LoginPage,  props: [Login, messageForm,appSesionStorage], protect: false  });
Route({ path: "#user",     template: User,       props: [Login, appSesionStorage], protect: false  });
Route({ path: "#register", template: Register,   props: [messageForm], protect: false  });
Route({ path: "#car",      template: CarShop,    props: [Login, messageForm], protect: false  });
Route({ path: "#invoice",  template: Invoice,    props: [Login], protect: false  });

Render();
RenderEvent();