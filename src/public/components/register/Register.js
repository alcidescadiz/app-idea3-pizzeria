export function Register([fn]){
    let mainRegister = document.createElement('main')
    //mainRegister.classList.add("container")
    let contentRegister = `
    <!-- Background image -->
    <div id="intro" class="bg-image shadow-2-strong">
      <div class="mask d-flex align-items-center h-100" style="background-color: rgba(0, 0, 0, 0.8);">
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-xl-5 col-md-8 text-black">
              <form class="bg-white  rounded-5 shadow-5-strong p-5" id="formRegister">
                <div class="display-5 text-center p-2">Register</div>
                <!-- Name input -->
                <div class="form-outline mb-4">
                  <input type="text" name="name" class="form-control" />
                  <label class="form-label" >Name</label>
                </div>
                <!-- Email input -->
                <div class="form-outline mb-4">
                  <input type="email" name="email" class="form-control" />
                  <label class="form-label" >Email address</label>
                </div>

                <!-- Password input -->
                <div class="form-outline mb-4">
                  <input type="password" name="password" class="form-control" />
                  <label class="form-label" ">Password</label>
                </div>

                <!-- Submit button -->
                <div class="d-grid gap-2 col-6 mx-auto">
                    <button type="submit" class="btn btn-primary ">Register</button>
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
        document.getElementById("formRegister")?.addEventListener("submit", e=>{
            e.preventDefault()
            let data = {};
            //@ts-ignore: Object is possibly 'null'.
            let formData = document.getElementById("formRegister").elements
            for (let index = 0; index < 3; index++) {
                data[formData[index].name] = formData[index].value;
            }
            fetch(window.location.origin+'/v1-api/users',
                {
                    body: JSON.stringify(data),
                    method:'POST',
                    headers:{
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json())
                  .then(json =>{
                    if(json.msg===1){
                        //@ts-ignore: Object is possibly 'null'.
                        document.getElementById("formRegister").reset()
                        alert('Ya puede iniciar sesión!!')
                        window.location.hash= '#login'
                    }
                    if(json.error){
                        alert('Error!!')
                    }
                })
            e.stopImmediatePropagation()
        })
    },100)
    mainRegister.innerHTML = contentRegister

    return mainRegister
}