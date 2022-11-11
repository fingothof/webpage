let articles = []

//fetches all info
function previews(){
    fetch("http://localhost:8080/previews.api")
    .then((response) => response.json())
    .then((json) => {
        articles = json.articles
        //doubt its the right api
        history.pushState(null,'','/')
    })
}

//handles navigation
navigation.addEventListener('navigate', event => {
    console.log('in navigation')
    let url = new URL(event.destination.url);
    if(url.pathname == "/"){
        event.intercept({ handler:setPreviews })
    }
    if(url.pathname.includes("article")){
        event.intercept({ handler: () => {
            setArtice(url)
        }})
    }
    if(url.pathname.includes("login") || url.pathname.includes("signup")){
        if(document.cookie != ""){

        }
    }
})

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
