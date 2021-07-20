const bcrypt = require('bcryptjs');
const db = require('../../db');
const jwt = require('jsonwebtoken');
const UsersController = require('../controller/users.controller');

class AuthController {
    async register(req, res) {
        const {name, password, email} = req.body;
        const data = await UsersController.getUsersByEmail(email)

        if (data.rows.length !== 0) {
            return res.status(400).json({ message: 'User is already created with this email'})
        }

        const hashedPassword = await bcrypt.hash(password, 12)
        const newPerson = await db.query('INSERT INTO users (name, password, email) values ($1, $2, $3) RETURNING *', [name, hashedPassword, email])

        try {
            res.json({
                status: 'success',
                user: newPerson.rows[0]
            })
        } catch (e) {
            res.json({
                status: 'failed',
                message: 'System error'
            })
        }

    }

    async login(req, res) {
        const {email, password} = req.body
        const data = await UsersController.getUsersByEmail(email)

        if (data.rows.length === 0) {
            return res.status(400).json({ message: 'Users not found' })
        }

        const isMatch = await bcrypt.compare(password, data.rows[0].password)

        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect password. Try again' })
        }

        try {
            const user = data.rows[0]
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' })
            res.json({ token, user: {user_id: user.id, email: email} })
        } catch (e) {
            res.json({
                status: 'failed'
            })
        }
    }
}


module.exports = new AuthController()
