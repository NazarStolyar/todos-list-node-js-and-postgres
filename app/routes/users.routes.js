const Router = require('express');
const router = new Router();
const UsersController = require('../controller/users.controller');
const AuthMiddleware = require('../middleware/auth.middlewear')

router.get(`/:id`, AuthMiddleware, UsersController.getUser)
router.put(`/`,AuthMiddleware, UsersController.editUser)
router.delete(`/:id`,AuthMiddleware, UsersController.removeUser)

module.exports = router;


