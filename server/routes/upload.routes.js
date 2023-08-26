const router = require("express").Router()
const uploader = require('../config/cloudinary.config')

router.post('/images', uploader.array('imageData', 100), (req, res) => {

    if (!req.files || req.files.length === 0) {
        res.status(500).json({ errorMessage: 'Error occured when uploading files' })
        return
    }
    const cloudinaryUrls = req.files.map(file => file.path);
    res.json({ cloudinary_url: cloudinaryUrls })
})

module.exports = router