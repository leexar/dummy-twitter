const db = require('./pool');

let userManager = {}

userManager.addOne = (payload) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO users (name, user_id, email, password) VALUES (?, ?, ?, ?)', payload, (err, result) => {
            if(err){
                return reject(err);
            }

            return resolve(result);
        })
    });
}

userManager.getOneById = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE user_id=?', id, (err, result) => {
            if (err) {
                return reject(err);
            }
            return resolve(result[0]);
        })
    });
}

userManager.getOneByEmail = (email) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users WHERE email=?', email, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result[0]);
        })
    });
}

userManager.updateOne = (payload) => {
    return new Promise((resolve, reject) => {
        db.query("UPDATE users SET email=?, name=? WHERE user_id=?", payload, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

module.exports = userManager;