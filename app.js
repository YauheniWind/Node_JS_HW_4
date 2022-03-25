require('dotenv').config()
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const constans = require('./constatns.js')

const imagePathName = fs.readdirSync(constans.inputName)
    .map(imageName => {
        return path.resolve(constans.inputName, imageName)
    })

imagePathName.forEach((inputImagePath) => {
    const imageContent = fs.readFileSync(inputImagePath)
    const parsed = path.parse(inputImagePath)
    if (parsed.ext === '.jpeg' || parsed.ext === '.jpg' || parsed.ext === '.png') {
        const target = path.resolve(constans.outputName, `${parsed.name}_${Math.random()}_${parsed.ext}`)
        const imageWidth = Number(constans.width) || 40
        const imageHeight = Number(constans.height) || 40

        sharp(imageContent)
            .resize(imageWidth, imageHeight)
            .toFile(target, (err, info) => {
                console.log(err, info)
            });
    } else {
        console.log('Is not correct extname', parsed.ext)
    }
})