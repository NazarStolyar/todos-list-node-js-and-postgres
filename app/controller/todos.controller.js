const db = require('../../db')
class TodosController {
    async createTodos(req, res) {
        const { title, description, date, user_id, status, type, is_completed } = req.body
        const newTodos = await db.query(`INSERT INTO todos (title, description, date, user_id, status, type, is_completed) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *`, [title, description, date, user_id, status, type, is_completed])
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
    async getTodoById(req, res) {
        const id = req.params.id;
        const todo = await db.query(`SELECT * FROM todos where id = $1`, [id])
        try {
            res.json({
                status: 'success',
                data: todo.rows[0]
            })
        } catch (e) {
            res.json({
                status: 'failed',
                message: 'System error'
            })
        }
    }
    async getTodosByUserId(req, res) {
        const { id } = req.params;
        const todos = await db.query(`SELECT * FROM todos where user_id = $1`, [id])
        try {
            res.json({
                status: 'success',
                data: todos.rows
            })
        } catch (e) {
            res.json({
                status: 'failed',
                message: 'System error'
            })
        }
    }
    async updateTodos(req, res) {}
    async deleteTodos(req, res) {}
    async searchTodos(req, res, next) {
        const value = 'one'
        const todos = await db.query(`SELECT * FROM todos where to_tsvector(title) @@ to_tsquery($1)`, [value])
        console.log(todos.rows)
    }
}

module.exports = new TodosController()
