class UploadController {
    async upload (req, res) {
        let filedata = req.file;
        if(!filedata) res.json({status: 'failed'});
            else res.json({status: 'success', link: `${process.env.WEB_APP_URL}/uploads/${filedata.originalname}`});
    }
}
module.exports = new UploadController();
