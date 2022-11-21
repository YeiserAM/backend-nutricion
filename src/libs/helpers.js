const bycritp = require('bcryptjs');

const helpesrs = {};

helpesrs.encryptPassword = async (password) => {
    const salt = await bycritp.genSalt(10);
    const hash = await bycritp.hash(password, salt);
    return hash;
}

helpesrs.verifyToken = async (pass, savepass) => {
    try {
        const salt = await bycritp.compare(pass, savepass);
        return salt;
    } catch (error) {
        console.log(error)
        return error.message;
    }
}

module.exports = helpesrs;