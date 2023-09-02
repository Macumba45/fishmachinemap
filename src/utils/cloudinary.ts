const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export function uploadImage(base64Image: string) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
            base64Image,
            { width: 800, height: 800, crop: 'fit' },
            (err: any, res: any) => {
                if (err) reject(err)
                console.log('upload Imagen', err)
                resolve(res)
            }
        )
    })
}
