let articles = []

//fetches all info
function previews(){
    fetch("http://localhost:8080/previews.api")
    .then((response) => response.json())
    .then((json) => {
        articles = json.articles
        //adding history:'replace' seems to fix the issue where reloading
        //adds to the nagivation.entries
        navigation.navigate(window.location.href,{history:"replace"})
    })
}

//handles navigation
navigation.addEventListener('navigate', event => {
    let url = new URL(event.destination.url);

    if(url.pathname == "/"){
        event.intercept({ handler:setPreviews })
    }
    else if(url.pathname.includes("article")){
        event.intercept({ handler: () => {
            setArtice(url)
        }})
    }
    else if(url.pathname.includes("login") || url.pathname.includes("signup")){
        if(document.cookie != ""){
            event.intercept({ handler:setPreviews })
        }
        else{
            if(url.pathname.includes("login")){
                event.intercept({ handler: () => {
                    login()
                }})
            }
            if(url.pathname.includes("signup")){
                event.intercept({ handler: () => {
                    signup()
                }})
    
            }

        }
    }
})

function signup(){
    let div = document.getElementById('content')
    div.innerHTML= `username
        <textarea id='name'></textarea>
        <br/>
        password
        <textarea id='password'></textarea>  
        <br/>
        <button onClick="submit('signup')">  sign up </button>
        <br/>
        <a href="/"> home </a>`
}
function login(){
    let div = document.getElementById('content')
    div.innerHTML= `username
        <textarea id='name'></textarea>
        <br/>
        password
        <textarea id='password'></textarea>  
        <br/>
        <button onClick="submit('login')">  log in </button>
        <br/>
        <a href="/"> home </a>`
}

function setPreviews(){
    let div = document.getElementById("content")
    div.innerHTML = ""
    
    for(let article of articles){
        let preview = document.createElement("p")
        preview.innerHTML = article.preview
        let href = document.createElement("a")
        href.innerHTML= "read more"
        href.id = article.id
        href.href = "/article/" + article.id + ".json"
        div.appendChild(preview)
        div.appendChild(href)
        div.appendChild(document.createElement("br"))
        div.appendChild(document.createElement("br"))
    } 
}

function setArtice(url){
    let div = document.getElementById("content")
    //lol
    let id = url.pathname.replace("/article/","").replace(".json","")

    let currArticle
    for(let article of articles){
        if(article.id == id){
            currArticle = article.article.text
        }
    }
    if(!currArticle) div.innerHTML = "not found"

    div.innerHTML=currArticle
}
