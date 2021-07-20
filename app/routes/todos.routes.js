const Router = require('express');
const router = new Router();
const TodosController = require('../controller/todos.controller');
const AuthMiddleware = require('../middleware/auth.middlewear')

router.post(`/create`, AuthMiddleware, TodosController.createTodos)

module.exports = router;
