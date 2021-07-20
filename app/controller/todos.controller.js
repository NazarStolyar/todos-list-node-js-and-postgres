const bd = require('../../db')
class TodosController {
    async createTodos(req, res) {
        const { title, description, date, user_id, status, type, is_completed } = req.body
        const newTodos = await bd.query(`INSERT INTO todos (title, description, date, user_id, status, type, is_completed) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [title, description, date, user_id, status, type, is_completed])
        try {
            res.json({
                status: 'success',
                data: newTodos.rows[0]
            })
        } catch (e) {
            res.json({
                status: 'failed',
                message: 'System error'
            })
        }
    }
    async getTodo(req, res) {}
    async getTodosByUserId(req, res) {}
    async updateTodos(req, res) {}
    async deleteTodos(req, res) {}
}

module.exports = new TodosController()
