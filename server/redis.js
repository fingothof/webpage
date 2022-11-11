let redis = require('redis')
const client = redis.createClient();

client.on('error', (err) => console.log('Redis Client Error', err));

let getPair = async (key) =>{
    await client.connect();
    const value = await client.get(key);
    await client.disconnect();
    return value ? {key:key,value:value} : null
}

let setValue = async (key,value) =>{
    await client.connect();
    await client.set(key, value);
    const info = await client.get(key);
    await client.disconnect();
    return info
}

let setUniqueKey = async (key,value) =>{
    await client.connect();
    let existingKey = await client.get(key)
    let info = null
    if(!existingKey){
        await client.set(key, value);
        info = await client.get(key);
    }
    await client.disconnect();
    return info
}

//just for dev purposes
let getAllInfo = async () => {
    await client.connect();
    let values = []
    let all = await client.keys("*")
    for(let key of all){
        let value = await client.get(key)
        let obj = {}
        obj[key] = value
        values.push(obj)
    }
    console.log("redis db values /*")
    console.log(values)
    console.log("*/")
    await client.disconnect();
}

module.exports = { setUniqueKey, getPair, setValue, getAllInfo }
