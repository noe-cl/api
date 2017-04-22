class User {

    //setter
    setLogin(login) {
        this.login = login;
    }
    setPassword(password) {
        this.password = password;
    }
    setLodestoneId(lodestoneId) {
        this.lodestoneId = lodestoneId;
    }
    setRole(role) {
        this.role = role;
    }


    //getter
    getLogin() {
        return this.login;
    }
    getPassword() {
        return this.password;
    }
    getLodestoneId() {
        return this.lodestoneId;
    }
    getRole() {
        return this.role;
    }

}

module.exports = User;