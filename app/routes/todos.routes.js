const Router = require('express');
const router = new Router();
const TodosController = require('../controller/todos.controller');
const AuthMiddleware = require('../middleware/auth.middlewear')

router.post(`/create`, AuthMiddleware, TodosController.createTodos)
router.put(`/edit/:id`, AuthMiddleware, TodosController.updateTodos)
router.delete(`/delete/:id`, AuthMiddleware, TodosController.deleteTodos)
router.get(`/:id`, AuthMiddleware, TodosController.getTodoById)
router.get(`/user_id/:id`, AuthMiddleware, TodosController.getTodosByUserId)
router.get(`/`, AuthMiddleware, TodosController.searchTodos)

module.exports = router;


