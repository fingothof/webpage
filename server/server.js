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
    try{
        if(page.includes('/bundle.js')){
            filePath = path.resolve(__dirname,'html/scripts/')
            file = bundleJavascript(filePath)
        }
        else if(page.includes('/css/style.css')){
            filePath = path.resolve(__dirname,'html/css/style.css')
            file = fs.readFileSync(filePath)
        }
        else if(page.includes('/favicon.ico')){
            filePath = path.resolve(__dirname,'html/favicon.ico')
            file = fs.readFileSync(filePath)
        }
        else{
            filePath = path.resolve(__dirname,'html/index.html')
            file = fs.readFileSync(filePath)
        }
    }
    catch(err){
    }
    
    res.write(file)
    res.end()
}

let bundleJavascript = (folderPath) =>{
    let folder = fs.readdirSync(folderPath)
    let bundle = ''

    for(let file of folder){
        let filePath = path.join(folderPath,file)
        let currentFile = fs.readFileSync(filePath)
        bundle = bundle + currentFile
    }
    return bundle
}
