const {upload,uploads}= require("../../middleware/upload");
const router = require("express").Router();
const auth = require("../../middleware/auth");
const {
    OkResponse,
    BadRequestResponse,
    InternalServerErrorResponse,
} = require("express-http-response");

router.post('/upload',auth.isToken,upload.single("file"),(req, res, next) => {
    next(new OkResponse(req.file.filename));
});


module.exports = router;
