const db = require('./pool');

let postManager = {}

postManager.addOne = (payload) => {
    return new Promise((resolve, reject) => {
        db.query('INSERT INTO posts (author, text) VALUES (?, ?)', payload, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

postManager.getAll = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts', (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

postManager.getAllByAuthorId = (id) => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM posts WHERE author=?', id, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

postManager.updateOne = (payload) => {
    return new Promise((resolve, reject) => {
        db.query('UPDATE posts SET text=? WHERE id=? AND author=?', payload, (err, result) => {
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

postManager.deleteOne = (payload) => {
    return new Promise((resolve, reject) => {
        console.log("im in delete method");
        console.log(`payload: ${payload}`);
        db.query('DELETE FROM posts WHERE id=? AND author=?', payload, (err, result) => {
            console.log(`im in callback`);
            if (err) {
                return reject(err);
            }

            return resolve(result);
        })
    });
}

module.exports = postManager;