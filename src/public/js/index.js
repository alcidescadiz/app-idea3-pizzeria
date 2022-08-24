'use strict'
// @ts-check

import Router from "../modules/Router.clouser.js";
import {Menu,ListFood,LoginPage,User,Register,CarShop,Invoice} from '../components/index.js'

let {Loading, Route, Render, RenderEvent, PageNotFound, Login, appSesionStorage,messageForm} = Router();
appSesionStorage.getSesionStorage({keyStorage:'sessionAppPizzeria', goTo:'#login'})
// appSesionStorage.upateSesionStorage({ token: 'antonio', dos:'dos'},'algo')


Route({ path: null,       template: Menu,     props: [Login],                               protect: false, title:null});
Route({ path: "",         template: ListFood, props: [Login, messageForm],                  protect: false, title:'Pizzeria Remolo'});
Route({ path: "#login",   template: LoginPage,props: [Login, messageForm,appSesionStorage], protect: false, title:'Login'});
Route({ path: "#user",    template: User,     props: [Login, appSesionStorage],             protect: true,  title:'User'});
Route({ path: "#register",template: Register, props: [messageForm],                         protect: false, title:'Register'});
Route({ path: "#car",     template: CarShop,  props: [Login, messageForm],                  protect: true,  title:'Shop Car'});
Route({ path: "#invoice", template: Invoice,  props: [Login],                               protect: true,  title:null});

Render();
RenderEvent();