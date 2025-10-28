# StockPlatform - Premium Stock Photos & Videos

A comprehensive stock photo and video platform built with Next.js, TypeScript, Tailwind CSS, Supabase, Prisma, and Cloudinary.

## Features

- **User Management**: Role-based system (Admin, Contributor, Customer)
- **Media Upload**: Cloudinary integration for image and video uploads
- **E-commerce**: Shopping cart and checkout with Authorize.net integration
- **Content Management**: Admin panel for content approval and user management
- **Responsive Design**: Modern UI with Tailwind CSS
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **Frontend**: Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL (via Supabase)
- **Authentication**: Supabase Auth
- **File Storage**: Cloudinary
- **Payments**: Authorize.net (Accept.js)
- **UI Components**: Custom components with Lucide React icons

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Supabase account
- Cloudinary account
- Authorize.net account (for payments)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stockprojectv2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Site Configuration
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/stockplatform"
   
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   
   # Cloudinary Configuration
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   
   # Authorize.net Configuration
   AUTHORIZENET_API_LOGIN_ID=your_authorizenet_api_login_id
   AUTHORIZENET_TRANSACTION_KEY=your_authorizenet_transaction_key
   AUTHORIZENET_SIGNATURE_KEY=your_authorizenet_signature_key
   AUTHORIZENET_ENVIRONMENT=sandbox
   
   # JWT Secret for signed URLs
   JWT_SECRET=your_jwt_secret_key_here
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   
   # Seed with sample data
   npm run db:seed
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
stockprojectv2/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── checkout/      # Payment processing
│   │   ├── cloudinary/    # Cloudinary integration
│   │   ├── downloads/      # Download management
│   │   └── media/         # Media asset management
│   ├── browse/            # Browse catalog page
│   ├── asset/[id]/        # Asset detail page
│   ├── cart/              # Shopping cart
│   ├── dashboard/         # User dashboard
│   ├── admin/             # Admin panel
│   └── upload/            # Upload page
├── components/            # Reusable components
│   ├── ui/                # Base UI components
│   ├── media/             # Media-related components
│   ├── upload/            # Upload components
│   └── layout/            # Layout components
├── lib/                   # Utility libraries
│   ├── prisma.ts          # Prisma client
│   ├── supabase.ts        # Supabase client
│   ├── cloudinary.ts      # Cloudinary utilities
│   └── utils.ts           # General utilities
├── prisma/                # Database schema and migrations
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Database seeding script
└── types/                 # TypeScript type definitions
    └── index.ts           # Main type definitions
```

## API Endpoints

### Authentication
- `POST /api/auth/user` - Create or get user

### Media Management
- `GET /api/media` - Get media assets with filtering
- `POST /api/media` - Create new media asset

### Cloudinary Integration
- `POST /api/cloudinary/sign` - Generate signed upload URLs

### Checkout & Payments
- `POST /api/checkout/create` - Create pending order
- `POST /api/checkout/confirm` - Confirm payment
- `PUT /api/checkout/confirm` - Webhook handler

### Downloads
- `POST /api/downloads/sign` - Generate download URLs

## Database Schema

### Core Models
- **User**: User accounts with role-based access
- **MediaAsset**: Photos and videos with metadata
- **Order**: Purchase orders
- **OrderItem**: Individual items in orders
- **License**: License types and pricing
- **Payout**: Contributor earnings

### Relationships
- Users can have multiple MediaAssets (contributors)
- Users can have multiple Orders (customers)
- Orders contain multiple OrderItems
- OrderItems reference MediaAssets
- Users can have multiple Payouts (contributors)

## Key Features Implementation

### 1. Cloudinary Integration
- Signed upload URLs for secure file uploads
- Automatic thumbnail and preview generation
- Watermarked previews for unauthenticated users
- Multiple format support (images and videos)

### 2. Role-Based Access Control
- **Admin**: Full platform management
- **Contributor**: Upload and manage content
- **Customer**: Browse and purchase content

### 3. E-commerce Flow
- Shopping cart with quantity and license selection
- Order creation and payment processing
- Download URL generation for purchased content
- Contributor earnings tracking

### 4. Content Management
- Admin approval workflow for uploads
- Content categorization and tagging
- Search and filtering capabilities
- Analytics and reporting

## Development Scripts

```bash
# Development
npm run dev              # Start development server
npm run build           # Build for production
npm run start           # Start production server

# Database
npm run db:generate     # Generate Prisma client
npm run db:push         # Push schema changes
npm run db:seed         # Seed database with sample data
npm run db:studio       # Open Prisma Studio

# Code Quality
npm run lint            # Run ESLint
```

## Deployment

### Environment Setup
1. Set up production database (PostgreSQL)
2. Configure Supabase production project
3. Set up Cloudinary production account
4. Configure Authorize.net production credentials
5. Set environment variables in production

### Build and Deploy
```bash
npm run build
npm run start
```

## Next Steps for Production

1. **Authentication Integration**
   - Implement Supabase Auth in components
   - Add protected routes and middleware
   - Set up OAuth providers

2. **Cloudinary Configuration**
   - Configure upload presets
   - Set up automatic transformations
   - Implement CDN optimization

3. **Payment Processing**
   - Integrate Authorize.net Accept.js
   - Set up webhook handling
   - Implement refund processing

4. **Email Notifications**
   - Order confirmations
   - Upload approvals
   - Payment receipts

5. **Analytics & Monitoring**
   - User behavior tracking
   - Performance monitoring
   - Error logging

6. **SEO Optimization**
   - Meta tags and structured data
   - Sitemap generation
   - Image optimization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.