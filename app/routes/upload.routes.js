const Router = require('express');
const router = new Router();
const UploadController = require('../controller/upload.controller');

router.post('/', UploadController.upload);

module.exports = router;
