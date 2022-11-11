let secrets = []

let words = [
    "overlying",
    "reply",
    "accustom",
    "guise",
    "exciting",
    "gangway",
    "nacho",
    "monetary",
    "cleft",
    "prototype",
    "mashed",
    "drown",
    "exerciser",
    "exposable",
    "partition",
    "trustable",
    "chemo",
    "sagging",
    "enclosure",
    "confirm"
]

let generateSecret = (username) => {
    let secret = ""
    do{
        for(let i=0;i<3;i++){
            let index = Math.floor(Math.random() * words.length-1)
            secret = secret + words[index]
        }
    }while(secrets.includes(secret))
    secrets.push({secret:secret,username:username})
    return secret
}

let getSecrets = () => {
    return secrets
}

let removeSecret = (secret) =>{
    let index = secrets.indexOf(secret)
    secrets.splice(index,1)
}

let isLoggedIn = (req) => {
    let cookie = req.headers['cookie']

    if(!cookie) return false

    let info = cookie.split(";")
    let secretInfo = info[0]
    let secret = secretInfo.split("=")
    if(secret[0] == 'secret'){
        return secrets.includes(secret[1])
    }
    else{
        return false
    }
}

module.exports = {removeSecret, getSecrets,generateSecret, isLoggedIn}
