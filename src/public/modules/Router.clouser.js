'use strict'
// @ts-check

/** @returns */
let Router = () => {

    /**@type {HTMLDivElement} */
    let loading = document.createElement('div');
    loading.classList.add('container')
    loading.innerHTML = `<h2>Loading....</h2>`

    /**
     * @name isLogin
     * @type {{status:boolean|null,user:object,car:Array<object>,token:string}} */
    let isLogin = { status: null,user:{}, car : [],token: "" };

    /**@type {Array<any>} */
    let Routes = [];

    /**@type {HTMLDivElement} */
    let NotFount = document.createElement('div')
      NotFount.innerHTML= '<h2 class="container">Page not found</h2>'

    /** @param {HTMLDivElement} addLoading */  
    let Loading = function(addLoading){loading = addLoading};

    /**
     * @param {{path:string|null, template:function|HTMLDivElement,protect:boolean, props:Array<any>}} param0 
     */
    let Route = function({ path = null, template, protect = false, props = [] }){
      Routes.push({ path, template, protect, props });
    };

    /**
     * @param {string} idRoot id del div principal del html donde se va renderizar la app
     * @returns
     */
    let Render = function(idRoot = "root"){
      let rootDiv = document.getElementById(idRoot)
      try {
        //@ts-ignore
        rootDiv.innerHTML = ''
        rootDiv?.appendChild(Routes[0].template(Routes[0].props))
        rootDiv?.appendChild(loading)

        if (Routes.length === 0) {
          let helloDiv = document.createElement('div')
          helloDiv.innerHTML = "<h3 class='container m-5'>Hello World</h3>"
          rootDiv?.appendChild(helloDiv)
          return;
        }
        setTimeout(() => {
          // @ts-ignore
          rootDiv.innerHTML = ''
          let pathname = window.location.hash;
          if (!Routes.map((e) => e.path).includes(pathname)) {
            rootDiv?.appendChild(Routes[0].template(Routes[0].props))
            rootDiv?.appendChild(NotFount);
            return;
          } else {
            Routes.map((e, i) => {
              if ((e.path === null || e.path === pathname) && e.protect === false) {
                rootDiv?.append(e.template([...e.props]));
              } else {
                if (
                  e.path === pathname &&
                  e.protect === isLogin.status &&
                  e.protect === true
                ) {
                  rootDiv?.append(e.template([...e.props]));
                }
              }
            });
          }
        }, 10);
      } catch (error) {
      }
    };

    /**
     * @returns
     */
    let RenderEvent = function(){
      try {
        window.addEventListener("hashchange", (e) => {
          console.log("render");
          Render();
        });
      } catch (error) {
      }
    };

    /** @param {HTMLDivElement} addNotFound  */ 
    let PageNotFound = (addNotFound) => (NotFount = addNotFound);

    /**
     * @param {isLogin} isLogin
     * @returns 
     */
    let Login = ({ ...props } = isLogin) => {
      isLogin = { ...isLogin, ...props };
      return isLogin;
    };

    let appSesionStorage = {
      setSesionStorage:function({...props},keyStorage){
            sessionStorage.setItem(keyStorage, JSON.stringify({...props}))
      },
      getSesionStorage: function({keyStorage, goTo}){
        if (sessionStorage.getItem(keyStorage)){
          // @ts-ignore
          let dataSession = JSON.parse(sessionStorage.getItem(keyStorage))
          Login({...dataSession })
        }else{
            window.location.hash= goTo 
        }
      },
      upateSesionStorage:function({...props},keyStorage){
        if (sessionStorage.getItem(keyStorage)){
            //@ts-ignore: Object is possibly 'null'.
            let dataSession = JSON.parse(sessionStorage.getItem(keyStorage))
            Login({...dataSession,...props })
            sessionStorage.setItem(keyStorage, JSON.stringify({...dataSession,...props }))
        }    
      },
      destroySesionStorage: ()=> sessionStorage.clear()
    }
    return {Loading, Route, Render, RenderEvent, PageNotFound, Login, appSesionStorage};
  };

  export default Router
