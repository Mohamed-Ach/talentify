import type { RequestHandler } from '@sveltejs/kit'
import cloudinary from '$lib/server/cloudinary'


export const POST: RequestHandler = (async ({ request }) => {

    // Get the uploaded image from the request
    const formData = await request.formData()
    const file = formData.get('file') as File

    // Check if a file was uploaded
    if (!file) {
        return new Response(
            JSON.stringify({ error: 'No file uploaded' }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 400,
        })
    }

    try {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ asset_folder: "talentify" }, function (error, result) {
                if (error) {
                    reject(error)
                    return
                }
                resolve(result)
            }).end(buffer)
        })

        return new Response(
            JSON.stringify({
                message: 'Upload successful',
                url: uploadResult.secure_url
            }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 200,
        })
    } catch (error) {
        return new Response(
            JSON.stringify({ error: 'File could not be uploaded: ' + error }), {
            headers: {
                'Content-Type': 'application/json',
            },
            status: 500,
        })
    }
})