const bd = require('../../db');

class UsersController {
    async getUsersByEmail(email) {
        return await bd.query('SELECT * FROM users where email = $1', [email])
    }
    async getUser(req, res) {
        const id = req.params.id;
        const user = await db.query(`SELECT * FROM users where id = $1`, [id])
        try {
            res.json({status: 'success', data: user.rows[0]})
        } catch (e) {
            res.json({status: 'failed', message: 'System error'})
        }
    }
    async editUser(req, res) {
        const { email, password, name, id } = req.body
        const users = await db.query(`UPDATE users set email = $1, password = $2, name = $3 where id = $8RETURNING *`,
            [email, password, name, id])
        try {
            res.json({status: 'success', data: users.rows[0]})
        } catch (e) {
            res.json({status: 'failed', message: 'System error'})
        }
    }
    async removeUser(req, res) {
        const { id } = req.params;
        await db.query(`DELETE FROM users where id = $1`, [id])
        try {
            res.json({status: 'success'})
        } catch (e) {
            res.json({status: 'failed', message: 'System error'})
        }
    }
}

module.exports = new UsersController()
