const net = require('node:net');
let port = 6379
let testport = 8124
const client = net.createConnection({ port: port });

let test = async () =>{
    let command = "*2\r\n$3\r\nGET\r\n$4\r\ntest\r\n"
    let info = await getInfo(command)

}

let getInfo = async(command) =>{
    client.write(command)
    let data = await client.on('data',() => 'test')
    console.log(data)
    //let promise = new Promise((resolve,reject) =>{
        //let info = ''
        //client.on('data', (data) => {
            //if(data.includes("$")){
                //console.log('len = ' + data)
            //}
            //else{
                //resolve(data)
            //}
        //})
    //})
}

test()
