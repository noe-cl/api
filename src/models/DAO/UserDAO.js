const connection = require("../config/connection");
const User = require("../DTO/User");

class UserDAO {
    constructor() { }
    save(user) {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO users (login,password,lodestoneId) VALUES(?,?,?)", [user.login, user.password, user.lodestoneId], (error, result, field) => {
                if (error) {
                    reject(error);
                } else {
                    let insertedUser = new User();
                    insertedUser.login = user.getLogin();
                    insertedUser.lodestoneId = user.getLodestoneId();
                    insertedUser.role = user.getRole();
                    resolve(insertedUser);
                }
            });
        });
    }

    getById(lodestoneId) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT lodestoneId, login, role FROM ")
        });
    }
}

module.exports = new UserDAO();