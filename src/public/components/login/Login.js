export function LoginPage([fn,messageForm]){
    let divLogin = document.createElement('div')

    let contentLogin = `
    <!-- Background image -->
    <div id="intro" class="bg-image shadow-2-strong">
      <div class="mask d-flex align-items-center h-100" style="background-color: rgba(0, 0, 0, 0.8);">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-md-8 text-black">
              <form class="bg-white  rounded-5 shadow-5-strong p-5" id="formLogin">
              <div class="display-5 text-center p-2">Login</div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" name="email" class="form-control" />
                  <label class="form-label" >Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" name="password" class="form-control" />
                  <label class="form-label" >Password</label>
                </div>

                <!-- 2 column grid layout for inline styling -->
                <div class="row mb-4">
                  <div class="col d-flex justify-content-center">
                    <!-- Checkbox -->
                    <div class="form-check">
                      <input class="form-check-input" type="checkbox" value="" id="form1Example3" checked />
                      <label class="form-check-label" for="form1Example3">
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div class="col text-center">
                    <!-- Simple link -->
                    <a href="#register">Register?</a>
                  </div>
                </div>

                <!-- Submit button -->
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Background image -->
    `
    setTimeout(()=>{
      document.getElementById('formLogin')?.addEventListener('submit',(e)=>{
          e.preventDefault()
          let data = {};
          //@ts-ignore: Object is possibly 'null'.
          let formData = document.getElementById('formLogin').elements;
          for (let index = 0; index < 2; index++) {
              data[formData[index].name] = formData[index].value;
          }
          fetch(window.location.origin+'/v1-api/users/login',
              {
                  body: JSON.stringify(data),
                  method:'POST',
                  headers:{
                      'Content-Type': 'application/json'
                  }
              }
          ).then(res => res.json())
           .then(json => {
             if(json.msg.length === 1){
                console.log(json.msg)
                  fn({status: true, user:json.msg[0]})
                  //sessionStorage.setItem("sessionAppFashion", JSON.stringify({status: true, email:json.email, like:json.like, dislike:json.dislike }))
                  //@ts-ignore: Object is possibly 'null'.
                  //document.getElementById('formLogin').reset()
                  window.location.hash= '#user'
                  setTimeout(()=>{
                    messageForm(["Bienvenido a nuestra plataforma"])
                  },100)               
              }else{
                  window.location.hash= '#register' 
                  setTimeout(()=>{
                    messageForm(["Ud no esta registrado", "Es posible que su contraseña no sea la correcta"], "alert-danger")
                  },100)  
              }
          })
          e.stopImmediatePropagation()
      })
  },10)
    divLogin.innerHTML = contentLogin

    return divLogin
}