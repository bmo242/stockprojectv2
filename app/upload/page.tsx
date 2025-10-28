'use client'

import { useState } from 'react'
import { Layout } from '@/components/layout/layout'
import { UploadForm } from '@/components/upload/upload-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Upload, Image, Video, FileText, DollarSign } from 'lucide-react'

export default function UploadPage() {
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])

  const handleUpload = async (files: File[]) => {
    try {
      // In real app, upload files to Cloudinary
      console.log('Uploading files:', files)
      
      // Simulate upload process
      for (const file of files) {
        // Generate Cloudinary signature
        const response = await fetch('/api/cloudinary/sign', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            folder: 'stock-platform/uploads',
            resource_type: file.type.startsWith('video/') ? 'video' : 'image',
          }),
        })
        
        const { signature, timestamp, cloudName, apiKey } = await response.json()
        
        // Upload to Cloudinary
        const formData = new FormData()
        formData.append('file', file)
        formData.append('signature', signature)
        formData.append('timestamp', timestamp)
        formData.append('api_key', apiKey)
        formData.append('folder', 'stock-platform/uploads')
        
        const uploadResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
          {
            method: 'POST',
            body: formData,
          }
        )
        
        const uploadResult = await uploadResponse.json()
        
        // Save to database
        await fetch('/api/media', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: file.name.split('.')[0],
            type: file.type.startsWith('video/') ? 'VIDEO' : 'IMAGE',
            tags: ['uploaded'],
            cloudinaryId: uploadResult.public_id,
            originalUrl: uploadResult.secure_url,
            thumbnailUrl: uploadResult.secure_url.replace('/upload/', '/upload/w_400/'),
            previewUrl: uploadResult.secure_url.replace('/upload/', '/upload/w_800/'),
            width: uploadResult.width,
            height: uploadResult.height,
            duration: uploadResult.duration,
            fileSize: uploadResult.bytes,
            format: uploadResult.format,
            price: 25.00, // Default price
            userId: 'current-user-id', // In real app, get from auth
          }),
        })
      }
      
      setUploadedFiles(prev => [...prev, ...files])
      alert('Files uploaded successfully!')
    } catch (error) {
      console.error('Upload error:', error)
      alert('Upload failed. Please try again.')
    }
  }

  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Upload Content</h1>
          <p className="text-gray-600">
            Share your creative work with the world and start earning from your content
          </p>
        </div>

        {/* Upload Guidelines */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Image className="h-5 w-5 mr-2 text-blue-600" />
                  Image Requirements
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Minimum resolution: 1920x1080</li>
                  <li>• Supported formats: JPG, PNG, TIFF</li>
                  <li>• Maximum file size: 50MB</li>
                  <li>• High quality, professional content only</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                  <Video className="h-5 w-5 mr-2 text-blue-600" />
                  Video Requirements
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Minimum resolution: 1920x1080</li>
                  <li>• Supported formats: MP4, MOV, AVI</li>
                  <li>• Maximum file size: 500MB</li>
                  <li>• Duration: 5 seconds to 5 minutes</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upload Form */}
        <UploadForm onUpload={handleUpload} />

        {/* Pricing Information */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <DollarSign className="h-5 w-5 mr-2 text-green-600" />
              Pricing & Earnings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Standard License</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">$25</p>
                <p className="text-sm text-gray-600">You earn 60% ($15)</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Extended License</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">$50</p>
                <p className="text-sm text-gray-600">You earn 60% ($30)</p>
              </div>
              <div className="text-center">
                <h4 className="font-medium text-gray-900 mb-2">Premium License</h4>
                <p className="text-2xl font-bold text-blue-600 mb-2">$75</p>
                <p className="text-sm text-gray-600">You earn 60% ($45)</p>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Note:</strong> All uploads are reviewed by our team before going live. 
                This process typically takes 1-3 business days. You'll be notified via email 
                once your content is approved.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Uploads */}
        {uploadedFiles.length > 0 && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                        {file.type.startsWith('video/') ? (
                          <Video className="h-5 w-5 text-gray-600" />
                        ) : (
                          <Image className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{file.name}</p>
                        <p className="text-sm text-gray-500">
                          {(file.size / 1024 / 1024).toFixed(2)} MB • Pending Review
                        </p>
                      </div>
                    </div>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  )
}
