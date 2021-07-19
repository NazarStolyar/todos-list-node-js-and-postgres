const bd = require('../../db');

class UsersController {
    async getUsers(req, res) {

    }
    async getUsersByEmail(email) {
        return await bd.query('SELECT * FROM users where email = $1', [email])
    }
    async getUser(req, res) {

    }
    async editUser(req, res) {

    }
    async removeUser(req, res) {

    }
}

module.exports = new UsersController()
