import { PrismaClient, Prisma, type MediaType, type LicenseType, type OrderStatus, type PayoutStatus } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create users
  const admin = await prisma.user.upsert({
    where: { email: 'admin@stockplatform.com' },
    update: {},
    create: {
      email: 'admin@stockplatform.com',
      name: 'Admin User',
      role: 'ADMIN',
      supabaseId: 'admin-supabase-id',
    },
  })

  const contributor1 = await prisma.user.upsert({
    where: { email: 'john@photographer.com' },
    update: {},
    create: {
      email: 'john@photographer.com',
      name: 'John Photographer',
      role: 'CONTRIBUTOR',
      supabaseId: 'contributor1-supabase-id',
    },
  })

  const contributor2 = await prisma.user.upsert({
    where: { email: 'sarah@designer.com' },
    update: {},
    create: {
      email: 'sarah@designer.com',
      name: 'Sarah Designer',
      role: 'CONTRIBUTOR',
      supabaseId: 'contributor2-supabase-id',
    },
  })

  const customer1 = await prisma.user.upsert({
    where: { email: 'customer@example.com' },
    update: {},
    create: {
      email: 'customer@example.com',
      name: 'Jane Customer',
      role: 'CUSTOMER',
      supabaseId: 'customer1-supabase-id',
    },
  })

  // Create media assets
  const mediaAssets = [
    {
      title: 'Beautiful Mountain Landscape',
      description: 'Stunning mountain view with clear blue sky and dramatic clouds. Perfect for nature-themed projects.',
      type: 'IMAGE' as MediaType,
      tags: ['nature', 'mountain', 'landscape', 'sky', 'outdoor'],
      category: 'Nature',
      cloudinaryId: 'sample-mountain-landscape',
      originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample-mountain-landscape.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample-mountain-landscape.jpg',
      previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample-mountain-landscape.jpg',
      watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample-mountain-landscape.jpg',
      width: 1920,
      height: 1080,
      fileSize: 2048000,
      format: 'jpg',
      price: 25.00,
      licenseType: 'STANDARD' as Prisma.LicenseType,
      userId: contributor1.id,
    },
    {
      title: 'Modern Office Space',
      description: 'Clean and modern office interior design with natural lighting.',
      type: 'IMAGE' as MediaType,
      tags: ['business', 'office', 'interior', 'modern', 'work'],
      category: 'Business',
      cloudinaryId: 'sample-office-space',
      originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample-office-space.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample-office-space.jpg',
      previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample-office-space.jpg',
      watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample-office-space.jpg',
      width: 1920,
      height: 1080,
      fileSize: 1800000,
      format: 'jpg',
      price: 35.00,
      licenseType: 'EXTENDED' as Prisma.LicenseType,
      userId: contributor2.id,
    },
    {
      title: 'Product Demo Video',
      description: 'Professional product demonstration video showcasing modern technology.',
      type: 'VIDEO' as MediaType,
      tags: ['product', 'demo', 'marketing', 'technology', 'business'],
      category: 'Technology',
      cloudinaryId: 'sample-product-demo',
      originalUrl: 'https://res.cloudinary.com/demo/video/upload/sample-product-demo.mp4',
      thumbnailUrl: 'https://res.cloudinary.com/demo/video/upload/w_400/sample-product-demo.jpg',
      previewUrl: 'https://res.cloudinary.com/demo/video/upload/w_800/sample-product-demo.mp4',
      watermarkedUrl: 'https://res.cloudinary.com/demo/video/upload/w_800/l_watermark/sample-product-demo.mp4',
      width: 1920,
      height: 1080,
      duration: 30,
      fileSize: 15728640,
      format: 'mp4',
      price: 75.00,
      licenseType: 'PREMIUM' as Prisma.LicenseType,
      userId: contributor1.id,
    },
    {
      title: 'City Skyline at Night',
      description: 'Breathtaking city skyline view during golden hour with beautiful lighting.',
      type: 'IMAGE' as MediaType,
      tags: ['city', 'night', 'skyline', 'urban', 'architecture'],
      category: 'Urban',
      cloudinaryId: 'sample-city-skyline',
      originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample-city-skyline.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample-city-skyline.jpg',
      previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample-city-skyline.jpg',
      watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample-city-skyline.jpg',
      width: 1920,
      height: 1080,
      fileSize: 2200000,
      format: 'jpg',
      price: 30.00,
      licenseType: 'STANDARD' as Prisma.LicenseType,
      userId: contributor2.id,
    },
    {
      title: 'Abstract Art Background',
      description: 'Colorful abstract art background perfect for creative projects.',
      type: 'IMAGE' as MediaType,
      tags: ['abstract', 'art', 'background', 'colorful', 'creative'],
      category: 'Art',
      cloudinaryId: 'sample-abstract-art',
      originalUrl: 'https://res.cloudinary.com/demo/image/upload/sample-abstract-art.jpg',
      thumbnailUrl: 'https://res.cloudinary.com/demo/image/upload/w_400/sample-abstract-art.jpg',
      previewUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/sample-abstract-art.jpg',
      watermarkedUrl: 'https://res.cloudinary.com/demo/image/upload/w_800/l_watermark/sample-abstract-art.jpg',
      width: 1920,
      height: 1080,
      fileSize: 1500000,
      format: 'jpg',
      price: 20.00,
      licenseType: 'STANDARD' as Prisma.LicenseType,
      userId: contributor1.id,
    },
  ]

  for (const assetData of mediaAssets) {
    await prisma.mediaAsset.upsert({
      where: { cloudinaryId: assetData.cloudinaryId },
      update: {},
      create: assetData,
    })
  }

  // Create licenses
  const licenses = [
    {
      name: 'Standard License',
      description: 'Perfect for personal projects, blogs, and small business use.',
      type: 'STANDARD' as Prisma.LicenseType,
      price: 25.00,
      usageRights: ['Personal use', 'Small business use', 'Web use', 'Social media'],
      restrictions: ['No resale', 'No large commercial use', 'No print advertising'],
    },
    {
      name: 'Extended License',
      description: 'Ideal for larger commercial projects and marketing campaigns.',
      type: 'EXTENDED' as Prisma.LicenseType,
      price: 50.00,
      usageRights: ['All Standard features', 'Large commercial use', 'Print advertising', 'Unlimited prints'],
      restrictions: ['No resale', 'No white-label use'],
    },
    {
      name: 'Premium License',
      description: 'Complete commercial rights for maximum flexibility.',
      type: 'PREMIUM' as Prisma.LicenseType,
      price: 75.00,
      usageRights: ['All Extended features', 'Resale rights', 'White-label use', 'Priority support'],
      restrictions: [],
    },
  ]

  for (const licenseData of licenses) {
    await prisma.license.create({
      data: licenseData,
    })
  }

  // Create sample order
  const order = await prisma.order.create({
    data: {
      orderNumber: 'ORD-20240101-001',
      customerEmail: customer1.email,
      customerName: customer1.name,
      totalAmount: 60.00,
      status: 'COMPLETED' as Prisma.OrderStatus,
      transactionId: 'txn-sample-001',
      paymentMethod: 'Credit Card',
      completedAt: new Date(),
      userId: customer1.id,
      items: {
        create: [
          {
            mediaAssetId: (await prisma.mediaAsset.findFirst({ where: { title: 'Beautiful Mountain Landscape' } }))!.id,
            quantity: 1,
            unitPrice: 25.00,
            totalPrice: 25.00,
          },
          {
            mediaAssetId: (await prisma.mediaAsset.findFirst({ where: { title: 'City Skyline at Night' } }))!.id,
            quantity: 1,
            unitPrice: 30.00,
            totalPrice: 30.00,
          },
        ],
      },
    },
  })

  // Create sample payout
  await prisma.payout.create({
    data: {
      amount: 33.00, // 60% of $55 (25 + 30)
      status: 'COMPLETED' as Prisma.PayoutStatus,
      paymentMethod: 'Bank Transfer',
      processedAt: new Date(),
      userId: contributor1.id,
    },
  })

  console.log('✅ Database seeded successfully!')
  console.log(`👤 Created ${await prisma.user.count()} users`)
  console.log(`🖼️ Created ${await prisma.mediaAsset.count()} media assets`)
  console.log(`📄 Created ${await prisma.license.count()} licenses`)
  console.log(`🛒 Created ${await prisma.order.count()} orders`)
  console.log(`💰 Created ${await prisma.payout.count()} payouts`)
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
