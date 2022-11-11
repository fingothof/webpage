function auth(){
    if(document.cookie != ""){
        let div = document.getElementById("nav")
        let logout = document.createElement("a")
        logout.innerHTML = "logout"
        logout.href = "index.html"
        logout.addEventListener("click", () => {
            if(confirm("are you sure?")){
                //should probably check if it worked before deleting cookie
                console.log("wut?")
                fetch('http://localhost:8080/logout.api')
                    .then((response) => {
                        console.log(response)
                        console.log('sent it i guess')
                    })
                document.cookie = "secret= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
            }
        })
        div.appendChild(logout)
    }
    else{
        let div = document.getElementById("nav")
        let signup = document.createElement("a")
        signup.innerHTML = "signup"
        signup.href = window.location.origin + "/signup.html"
        div.appendChild(signup)
        let login = document.createElement("a")
        login.innerHTML = "login"
        login.href = window.location.origin + "/login.html"
        div.appendChild(login)
    }
}

auth()
