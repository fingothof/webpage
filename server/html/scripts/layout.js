let articles = []

const MAX = 8

//function entry(){
    //console.log('in entry')
    //console.log(window.location.href)
    //navigation.navigate(window.location.href ,{history:"replace"})
//}

//fetches all info
function getArticles(page=1){
    fetch(`http://localhost:8080/articles.api?page=${page}`)
    .then((response) => response.json())
    .then((json) => {
        articles = json
        //console.log(articles[1])
        //adding history:'replace' seems to fix the issue where reloading
        //adds to the nagivation.entries
        navigation.navigate(window.location.origin + `?page=${page}`,{history:"replace"})
        //setArticles()
    })
}

function homeLink(){
    let div = document.getElementById("homelink")
    console.log("in test link")
    div.addEventListener("click", () => {
        navigation.navigate('/')
    })
}

homeLink()

function footer(){
    let div = document.getElementById('content')
    let element = document.createElement("p")
    element.id = "footer"
    for(let i=0;i<=MAX;i++){
        let ref = document.createElement("a")
        if(i == 0 ){
            ref.innerHTML = '< ' 
        }
        else if(i == MAX){
            ref.innerHTML = ' >' 
        }
        else{
            ref.innerHTML = "   " + i + "   "  
        }
        ref.addEventListener("click", (event) =>{
            getArticles(i)
        })
        element.appendChild(ref)
    }
    div.appendChild(element)
}

//handles navigation
navigation.addEventListener('navigate', event => {
    let url = new URL(event.destination.url);
    console.log(url)

    if(url.pathname == "/"){
        event.intercept({ handler:setArticles })
    }
    else if(url.pathname.includes("article")){
        event.intercept({ handler: () => {
            setArticle(url)
        }})
    }
    else if(url.pathname.includes("login") || url.pathname.includes("signup")){
        if(document.cookie != ""){
            event.intercept({ handler:setArticles })
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

function setArticles(){
    let div = document.getElementById("content")
    div.innerHTML = ""
    
    for(let article of articles){
        let articleDiv = document.createElement("div")
        articleDiv.id = 'article'

        let title = document.createElement("p")
        let titleText = article.article.title 
        title.innerHTML= titleText
        title.id = "title"
        
        let articleInfo = document.createElement("p")
        let articleHeaderText = article.article.date + " - " + article.article.author
        articleInfo.innerHTML= articleHeaderText
        articleInfo.id = "info"

        let preview = document.createElement("p")
        preview.innerHTML = article.preview

        let href = document.createElement("a")
        href.innerHTML= "read more <br/>"
        href.id = article.id
        href.href = "/article/" + article.id 

        let underline = document.createElement("p")
        underline.innerHTML = "_____________________________________"

        articleDiv.appendChild(title)
        articleDiv.appendChild(articleInfo)
        articleDiv.appendChild(preview)
        articleDiv.appendChild(href)
        articleDiv.appendChild(underline)
        div.appendChild(articleDiv)
    } 
    footer()
}

function setArticle(url){
    let div = document.getElementById("content")
    div.innerHTML=""

    let articleDiv = document.createElement("div")
    articleDiv.id = 'article'

    let id = url.pathname.replace("/article/","")
    let currArticle

    for(let article of articles){
        if(article.id == id){
            currArticle = article.article.text
        }
    }
    if(!currArticle) div.innerHTML = "not found"
    else{
        articleDiv.innerHTML=currArticle.replace("\n","<br/><br/>")
        div.appendChild(articleDiv)
    }

}
