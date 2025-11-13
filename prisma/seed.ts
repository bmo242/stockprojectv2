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
      licenseType: 'STANDARD' as LicenseType,
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
      licenseType: 'EXTENDED' as LicenseType,
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
      licenseType: 'PREMIUM' as LicenseType,
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
      licenseType: 'STANDARD' as LicenseType,
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
      licenseType: 'STANDARD' as LicenseType,
      userId: contributor1.id,
    },
  ]

  // Additional demo images (Unsplash) ~25 items
  const demoLibrary = [
    { title: 'Mist over the Forest', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee' },
    { title: 'Golden Gate at Dusk', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' },
    { title: 'Desert Road', url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470' },
    { title: 'Snowy Peak', url: 'https://images.unsplash.com/photo-1501785888041-659ace7f3f7b' },
    { title: 'Seaside Cliffs', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { title: 'City Reflections', url: 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e' },
    { title: 'Tropical Leaves', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
    { title: 'Abstract Glass', url: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d' },
    { title: 'Minimal Workspace', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085' },
    { title: 'Sunset Over Lake', url: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429' },
    { title: 'Coffee and Code', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085' },
    { title: 'Blue Hour Skyline', url: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b' },
    { title: 'Boardwalk', url: 'https://images.unsplash.com/photo-1500534318417-3a4d3d7bd1d6' },
    { title: 'Waves Crashing', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e' },
    { title: 'Monstera', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
    { title: 'Pastel Building', url: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d' },
    { title: 'Neon Alley', url: 'https://images.unsplash.com/photo-1520977498770-5f3f84b0e8f3' },
    { title: 'Foggy Pines', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
    { title: 'Mountain Trail', url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e' },
    { title: 'Street Crossing', url: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d' },
    { title: 'Cyclist in Motion', url: 'https://images.unsplash.com/photo-1508609349937-5ec4ae374ebf' },
    { title: 'Rustic Cabin', url: 'https://images.unsplash.com/photo-1475856034131-0f9d746d1f4b' },
    { title: 'Lavender Fields', url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e' },
    { title: 'Tea Time', url: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9' },
    { title: 'Foggy Bridge', url: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29' },
  ]

  for (let i = 0; i < demoLibrary.length; i++) {
    const d = demoLibrary[i]
    const author = i % 2 === 0 ? contributor1 : contributor2
    const base = `${d.url}?q=80&auto=format&fit=crop`
    const thumb = `${d.url}?w=600&q=80&auto=format&fit=crop`
    mediaAssets.push({
      title: d.title,
      description: null as any,
      type: 'IMAGE' as MediaType,
      tags: [],
      category: 'Discover',
      cloudinaryId: `unsplash-${i}-${Date.now()}`,
      originalUrl: base,
      thumbnailUrl: thumb,
      previewUrl: base,
      watermarkedUrl: null as any,
      width: 1200,
      height: 800,
      fileSize: 0 as any,
      format: 'jpg',
      price: 20.0,
      licenseType: 'STANDARD' as LicenseType,
      userId: author.id,
    })
  }

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
      type: 'STANDARD' as LicenseType,
      price: 25.00,
      usageRights: ['Personal use', 'Small business use', 'Web use', 'Social media'],
      restrictions: ['No resale', 'No large commercial use', 'No print advertising'],
    },
    {
      name: 'Extended License',
      description: 'Ideal for larger commercial projects and marketing campaigns.',
      type: 'EXTENDED' as LicenseType,
      price: 50.00,
      usageRights: ['All Standard features', 'Large commercial use', 'Print advertising', 'Unlimited prints'],
      restrictions: ['No resale', 'No white-label use'],
    },
    {
      name: 'Premium License',
      description: 'Complete commercial rights for maximum flexibility.',
      type: 'PREMIUM' as LicenseType,
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
      status: 'COMPLETED' as OrderStatus,
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
      status: 'COMPLETED' as PayoutStatus,
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
