const path = require('path')
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra')
const ctrl = {}

const { Image } = require('../models/index')

ctrl.index = (req, res) => {

}

ctrl.create = (req, res) => {

    const saveImage = async() => {
        const imgUrl = randomNumber()
        const images = await Image.find({ filename: imgUrl })
        if (images.length > 0){
            saveImage()
        } else {
        const imageTempPath = req.file.path
        const ext = path.extname(req.file.originalname).toLowerCase()
        const targetPath = path.resolve(`src/public/upload/${imgUrl}${ext}`)
    
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif' ) {
            await fs.rename(imageTempPath, targetPath)
            const newImg = new Image({
                title: req.body.title,
                filename: imgUrl + ext,
                description: req.body.description,
            })
            const imageSaved = await newImg.save()
            // res.redirect('/images')
            console.log(newImg)
        } else {
            await fs.unlink(imageTempPath)
            res.status(500).json({error: 'Solo Imagenes son permitidas'})
        }
        res.send('Funciona!')
        }

    }
    saveImage()
}

ctrl.like = (req, res) => {
    
}

ctrl.comment = (req, res) => {
    
}

ctrl.remove = (req, res) => {
    
}

module.exports = ctrl