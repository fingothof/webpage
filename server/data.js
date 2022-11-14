const fs = require('fs')
const path = require('path')
const db = require('./redis')
let previews = [];

let articles = (() => {
    let articles= []
    let filenames = fs.readdirSync(path.join(__dirname,'articles'))
    for(let file of filenames){
        let artPath = path.join(__dirname,'articles',file)
        let jsonArt = JSON.parse(fs.readFileSync(artPath))
        let preview = jsonArt.text.substring(0,250) + "..."
        let id = file.split(".")[0]
        previews.push(preview)
        articles.push({id:id, article:jsonArt, preview:preview})
    }
    for(article of articles){
        db.setArticle(article)
    }
    return articles
})()


module.exports = {articles}
