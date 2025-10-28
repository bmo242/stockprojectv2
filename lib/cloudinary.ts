import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export { cloudinary }

export function generateCloudinarySignature(params: any) {
  const timestamp = Math.round(new Date().getTime() / 1000)
  const signature = cloudinary.utils.api_sign_request(
    { ...params, timestamp },
    process.env.CLOUDINARY_API_SECRET!
  )
  
  return {
    signature,
    timestamp,
  }
}

export function getCloudinaryUrl(publicId: string, options: any = {}) {
  return cloudinary.url(publicId, {
    secure: true,
    ...options,
  })
}
