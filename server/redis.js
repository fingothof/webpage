const net = require('node:net')

let port = 6379

let client = net.createConnection({port : port})

let runCommand = async (command) =>{
    client.write(command)
    let promise = new Promise((resolve,reject) =>{
        let info = ''
        client.on('data', (data) => {
            resolve(extractData(data.toString()))
        })
    })
    return promise
}

let extractData = (data) =>{
    return data.split("\r\n")[1]
}

let getPair = async (key) =>{
    let qry = "*2\r\n$3\r\nGET\r\n$" + key.length + "\r\n" + key + "\r\n"
    //console.log(qry)
    let value = await runCommand(qry)
    console.log(value)
    return value ? {key:key,value:value} : null
}

let setValue = async (key,value) =>{
}

let setUniqueKey = async (key,value) =>{
}

//just for dev purposes
let getAllInfo = async () => {
}

module.exports = { setUniqueKey, getPair, setValue, getAllInfo }
