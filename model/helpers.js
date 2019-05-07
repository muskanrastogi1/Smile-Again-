const bcrypt = require("bcrypt")
const uidGenerator = require("uid-generator");
const uidgen = new uidGenerator();

module.exports.hashAndReturn = (password) => {
    let hash = bcrypt.hashSync(password, Number(process.env.SALT));
    return hash
}

module.exports.emailValidate = (email) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

module.exports.passwordAuth = (dbPassword, inputPassword) => {
    if(bcrypt.compareSync(inputPassword, dbPassword)) {
        console.log("Success, passord matched")
        return true
       } else {
        console.log("Failed, the password didn't matched")
        return false 
    }
}

module.exports.token = uidgen.generateSync();
