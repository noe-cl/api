const connection = require("../config/connection");
const User = require("../DTO/User");
const Role = require("../DTO/Role");

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

    getAll() {
        return new Promise((resolve, reject) => {
            connection.query("SELECT lodestoneId, login, roles.id_role, role FROM users INNER JOIN roles ON (users.id_role = roles.id_role);", (error, result, field) => {
                if (error) {
                    reject(error);
                } else {
                    result = result.map((value, index) => {
                        let user = new User();
                        user.setLodestoneId(value.lodestoneId);
                        user.setLogin(value.login);
                        user.setRole(new Role(value.id_role, value.role));
                        return user;
                    });
                    resolve(result);
                }
            });
        });
    }

    getById(lodestoneId) {
        return new Promise((resolve, reject) => {
            connection.query("SELECT lodestoneId, login, roles.id_role, role FROM users INNER JOIN roles ON (users.id_role = roles.id_role) WHERE lodestoneId = ?", [lodestoneId], (error, result, field) => {
                if (error) {
                    reject(error);
                } else {
                    let user = new User();
                    user.setLodestoneId(result[0].lodestoneId);
                    user.setLogin(result[0].login);
                    user.setRole(new Role(result[0].id_role, result[0].role));
                    resolve(user);
                }

            });
        });
    }
}

module.exports = new UserDAO();