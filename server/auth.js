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

let removeSecret = (cookie) =>{
    let secret = extractSecret(cookie)
    let index = secrets.findIndex((val) => val.secret == secret)
    secrets.splice(index,1)
}

let isLoggedIn = (req) => {
    let cookie = req.headers['cookie']
    let secret = extractSecret(cookie)
    return secrets.find((val) => val.secret == secret) ? true: false;
}

let extractSecret = (cookie) => {
    if(!cookie) return ""

    let info = cookie.split(";")
    let secretInfo = info[0]
    let secret = secretInfo.split("=")

    if(secret[0] != 'secret') return ""

    return secret[1]
}

module.exports = {removeSecret, getSecrets,generateSecret, isLoggedIn}
