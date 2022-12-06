const net = require('node:net')

let port = 6379

let client = net.createConnection({port : port})

let runCommand = async (command) =>{
    client.write(command)
    let promise = new Promise((resolve,reject) =>{
        client.on('data', (data) => {
            resolve(extractData(data.toString()))
        })
        client.on('error', (err) =>{
            console.log(err)
        })
    })
    return promise
}

let extractData = (data) =>{
    console.log(data)
    let splitData = data.split("\r\n")
    let output =[]
    for(let i=1;i<splitData.length;i++){
        if(i%2 == 0){
            if(splitData[i][0] != ":" && splitData[i] != ''){
                try{
                    output.push(JSON.parse(splitData[i]))
                }
                catch(err){
                    //console.log(err)
                    //console.log('split data = ' + splitData[i])
                }
            }
        }
    }
    return output
}

let getPair = async (key) =>{
    let qry = "*2\r\n$3\r\nGET\r\n$" + key.length + "\r\n" + key + "\r\n"
    let value = await runCommand(qry)
    console.log(value)
    return value.length != 0 ? {key:key,value:value} : null
}

let setValue = async (key,value) =>{
    let qry = "*3\r\n$3\r\nSET\r\n$" + key.length + "\r\n" + key + "\r\n"
    qry = qry + "$" + value.length + "\r\n" + value + "\r\n"
    let obj = await runCommand(qry)
    return obj
}

let setArticle = async (value) =>{
    let strValue = JSON.stringify(value)
    let buf = Buffer.from(strValue, 'utf8');
    let qry = "*3\r\n$5\r\nLPUSH\r\n$8\r\n" + 'articles' + "\r\n$" 
                + (buf.length ) + "\r\n" + buf + "\r\n"
    let obj = await runCommand(qry)
    return obj
}

let getArticles = async (from, to) =>{
    let qry = "*4\r\n$6\r\nLRANGE\r\n$8\r\n" + "articles\r\n$" + 
                from.toString().length + "\r\n" + from + "\r\n$" + 
                to.toString().length + "\r\n" + to + "\r\n"
    let value = await runCommand(qry)
    let strValue = JSON.stringify(value)
    return strValue
}

let setUniqueKey = async (key,value) =>{
    let exists = await getPair(key)
    if(exists) return "already exists"       
    setValue(key,value) 
    return "doing the thing"
}

//setArticle({test:"sup ' buddy"})

module.exports = { getArticles, setArticle, setUniqueKey, getPair, setValue }
