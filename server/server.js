const http = require('http')
const fs = require('fs')
const path = require('path')
const api = require('./api')
const auth = require('./auth')

http.createServer((req,res) => {
    let page = req.url
    //API REQUESTS
    if(page.includes('.api')){
        let apiName = page.replace('/','').replace('.api','') 
        let input = null;
        req.on('data', (data) => {
            input = data? JSON.parse(data.toString()) : data;
        })
        req.on('end', () =>{
            api[apiName]({input:input,req:req,res:res})
        })
    }
    //PAGE REQUESTS
    else{
        getHtml(page,req,res)
    }
}).listen(8080, () => console.log('listening on port 8080'))

let getHtml = (page, req, res) =>{
    let htmlPath = path.join(__dirname,'/html/notfound.html')
    let file = fs.readFileSync(htmlPath)
    try{
        if(page.includes("secret") && auth.isLoggedIn(req)){
            htmlPath = path.join(__dirname,'/html',page)
            file = fs.readFileSync(htmlPath)
        }
        else if(page == '/'){
            htmlPath = path.resolve(__dirname,'html/index.html')
            file = fs.readFileSync(htmlPath)
        }
        else{
            htmlPath = path.join(__dirname,'/html',page)
            file = fs.readFileSync(htmlPath)
        }
    }
    catch(err){
    }
    
    res.write(file)
    res.end()
}
