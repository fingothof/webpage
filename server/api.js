const auth = require('./auth')
const db = require('./redis')
const data = require('./data')

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
    "previews": async({res} = {}) => {
        res.write(JSON.stringify(data))
        res.end()
    }
}
