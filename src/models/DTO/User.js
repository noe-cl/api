class User {

    setLogin(login) {
        this.login = login;
    }
    setPassword(password) {
        this.password = password;
    }
    setLodestoneId(lodestoneId) {
        this.lodestoneId = lodestoneId;
    }
    setRole(roleName) {
        switch (roleName) {
            case "master":
                this.roleId = 1;
                break;
            case "founder":
                this.roleId = 2;
                break;
            case "officer":
                this.roleId = 3;
                break;
            case "member":
                this.roleId = 4;
                break;
            case "guest":
                this.roleId = 5;
                break;
        }
    }

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
        let roleName;
        switch (this.roleId) {
            case 1:
                roleName = "master";
                break;
            case 2:
                roleName = "founder";
                break;
            case 3:
                roleName = "officer";
                break;
            case 4:
                roleName = "member";
                break;
            case 5:
                roleName = "guest";
                break;
        }
        return roleName;
    }
}

module.exports = User;