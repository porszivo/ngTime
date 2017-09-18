var bcrypt = require('bcrypt');

module.exports = {
    cryptPassword: cryptPassword,
    comparePassword: comparePassword
}
;

function cryptPassword(password) {
    var salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
}

function comparePassword(password, hash) {
    return bcrypt.compareSync(password, hash);
};