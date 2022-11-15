let logoutHandler = () => {
    if(confirm("are you sure?")){
        //should probably check if it worked before deleting cookie
        fetch('http://localhost:8080/logout.api')
            .then((response) => {
                console.log(response)
                console.log('sent it i guess')
            })
        console.log("WHAT THE FUCK")
        document.cookie = "secret= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
        auth()
    }
}


//used to insert in the "nav" div either 'login/signup' hrefs when not logged in 
//or a 'logout' href when logged 
function auth(){
    //when logged in
    if(document.cookie != ""){
        let div = document.getElementById("nav")
        div.innerHTML = ""

        let logout = document.createElement("a")
        logout.id = "bar"
        logout.innerHTML = "logout"
        logout.href = "/"
        logout.addEventListener("click", logoutHandler)
        div.appendChild(logout)
    }
    //when not logged in
    else{
        let div = document.getElementById("nav")
        div.innerHTML = ""

        let signup = document.createElement("a")
        signup.id = "bar"
        signup.innerHTML = "signup"
        signup.href = window.location.origin + "/signup"
        div.appendChild(signup)

        let login = document.createElement("a")
        login.id="bar"
        login.innerHTML = "login"
        login.href = window.location.origin + "/login"
        div.appendChild(login)
    }
}

function submit(api){
    let bod = JSON.stringify({
        "username":document.getElementById('name').value,
        "password":document.getElementById('password').value
    })
    fetch('http://localhost:8080/'+api+'.api',{
        method:'POST',
        body:bod
    })
    .then(( response ) => {
        if(response.status == 200){
            //updates the div
            auth()
            //reroutes to '/'
            navigation.navigate("/",{history:"replace"})
        }
        else{
            alert("it seems the info you've given is wrong")
        }
    })
}
