const bcrypt = require('bcryptjs');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const UsersController = require('../controller/users.controller');

class AuthController {
    async register(req, res) {
        const {name, password, email} = req.body;
        const hashedPassword = await bcrypt.hash(password, 12)
        const newPerson = await db.query('INSERT INTO users (name, password, email) values ($1, $2, $3) RETURNING *', [name, hashedPassword, email])

        try {
            res.json({
                status: 'success',
                user: newPerson.rows[0]
            })
        } catch (e) {
            res.json({
                status: 'failed'
            })
        }

    }

    async login(req, res) {
        const {email, password} = req.body
        const isMatch = await bcrypt.compare(password, password)
        const data = await UsersController.getUsersByEmail(email)
        try {
            const user = data.rows[0]
            const token = jwt.sign({ userId: user.id }, 'todos-list', { expiresIn: '1h' })
            res.json({ token, user: {user_id: user.id, email: email} })
        } catch (e) {
            res.json({
                status: 'failed'
            })
        }
    }
}


module.exports = new AuthController()
