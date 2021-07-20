const Router = require('express');
const router = new Router();
const TodosController = require('../controller/todos.controller');
const AuthMiddleware = require('../middleware/auth.middlewear')

router.post(`/create`, AuthMiddleware, TodosController.createTodos)
router.post(`/edit/:id`, AuthMiddleware, TodosController.updateTodos)

module.exports = router;
