// import { prisma } from "@/app/lib/db";
// import { uploadImage } from "../utils/cloudinary";

// export const config = {
//     api: {
//         bodyParser: false,
//     },
// };

// export default async function handle(req, res) {

//     try {

//         const imageData = await uploadImage(imageUploaded);
//         console.log("imagendata", imageData);

//         const result = await prisma.marker.create({
//             data: {
//                 file: imageData.secure_url,
//                 publicId: imageData.public_id,
//                 format: imageData.format,
//                 version: imageData.version.toString(),
//                 signature: imageData.signature,
//                 width: imageData.width,
//                 height: imageData.height,
//                 originalFilename: imageData.original_filename,
//                 tags: imageData.tags,
//                 context: imageData.context,

//             },
//         });

//         res.json('result', result);
//         return result

//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Something went wrong." });

//     }

// }
