export enum UserRole {
  ADMIN = 'ADMIN',
  CONTRIBUTOR = 'CONTRIBUTOR',
  CUSTOMER = 'CUSTOMER'
}

export enum MediaType {
  IMAGE = 'IMAGE',
  VIDEO = 'VIDEO'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED'
}

export enum LicenseType {
  STANDARD = 'STANDARD',
  EXTENDED = 'EXTENDED',
  PREMIUM = 'PREMIUM'
}

export enum PayoutStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  role: UserRole
  createdAt: Date
  updatedAt: Date
  supabaseId?: string
}

export interface MediaAsset {
  id: string
  title: string
  description?: string
  type: MediaType
  tags: string[]
  category?: string
  cloudinaryId: string
  originalUrl: string
  thumbnailUrl: string
  previewUrl: string
  watermarkedUrl?: string
  width?: number
  height?: number
  duration?: number
  fileSize?: number
  format?: string
  price: number
  licenseType: LicenseType
  isActive: boolean
  isApproved: boolean
  createdAt: Date
  updatedAt: Date
  userId: string
  user: User
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  customerEmail: string
  customerName?: string
  totalAmount: number
  currency: string
  transactionId?: string
  paymentMethod?: string
  createdAt: Date
  updatedAt: Date
  completedAt?: Date
  userId?: string
  user?: User
  items: OrderItem[]
}

export interface OrderItem {
  id: string
  quantity: number
  unitPrice: number
  totalPrice: number
  orderId: string
  order: Order
  mediaAssetId: string
  mediaAsset: MediaAsset
}

export interface License {
  id: string
  name: string
  description?: string
  type: LicenseType
  price: number
  usageRights: string[]
  restrictions: string[]
  createdAt: Date
  updatedAt: Date
}

export interface Payout {
  id: string
  amount: number
  status: PayoutStatus
  paymentMethod?: string
  accountDetails?: any
  createdAt: Date
  updatedAt: Date
  processedAt?: Date
  userId: string
  user: User
}

export interface CartItem {
  mediaAsset: MediaAsset
  quantity: number
}

export interface CloudinaryUploadResult {
  public_id: string
  secure_url: string
  width: number
  height: number
  format: string
  bytes: number
  duration?: number
}

export interface AuthorizeNetResponse {
  transactionResponse: {
    responseCode: string
    authCode: string
    avsResultCode: string
    cvvResultCode: string
    cavvResultCode: string
    transId: string
    refTransID: string
    transHash: string
    testRequest: string
    accountNumber: string
    accountType: string
    errors?: Array<{
      errorCode: string
      errorText: string
    }>
  }
  refId: string
  messages: {
    resultCode: string
    message: Array<{
      code: string
      text: string
    }>
  }
}
