const auth = require('./auth')
const db = require('./redis')

module.exports = {
    "login": async ({input,res} = {}) => {
        let {password,username} = input
        let loginInfo = await db.getPair(username)
        console.log(loginInfo)
        if(!loginInfo){
            res.statusCode = 599
            res.end()
        }
        else{
            if(password == loginInfo.value){
                let secret = auth.generateSecret(username)
                res.setHeader('set-cookie', "secret=" + secret + ";")
                res.end()
            }
            else{
                //wut?
                res.statusCode = 599
                res.end()
            }
        }
    },
    "signup": async ({input, res} = {}) => {
        let {password,username} = input
        let values = await db.setUniqueKey(username, password)
        if(values){
            let secret = auth.generateSecret(username)
            res.setHeader('set-cookie', "secret=" + secret + ";")
            res.end()
        }
        else{
            res.statusCode = 599
            res.write("username already exists")
            res.end()
        }
    },
    "logout": async ({req, res} = {}) => {
        let cookie = req.headers['cookie']
        auth.removeSecret(cookie)
        res.end()
    },
    "articles": async({input, res} = {}) => {
        //max articles per page
        const max = 3
        let page = input.get('page')

        let from = ( page  - 1) * max
        let to = ( page - 1 ) * max + max - 1

        let data = await db.getArticles(from,to)
        res.write(data)
        res.end()
    }
}
