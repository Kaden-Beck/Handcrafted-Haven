import { Decimal } from '@prisma/client/runtime';

// Define reusable types based on Prisma schema

/**
 * Normal User type for cases where all fields are included
 */
export type User = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  bio?: string | null;
  passwordHash?: string | null;
  accounts?: Account[];
  sessions?: Session[];
  authenticators?: Authenticator[];
  products?: Product[];
  createdAt: Date;
  updatedAt: Date;
} | null;

/**
 * Simplified User type for cases where only basic fields are needed
 */
export type SimplifiedUser = {
  id: string;
  name?: string | null;
  email: string;
  emailVerified?: Date | null;
  image?: string | null;
  bio?: string | null;
  passwordHash?: string | null;
  createdAt: Date;
  updatedAt: Date;
} | null;

/**
 * Simplified Review type for cases where the product relation is not included
 */
export type SimplifiedReview = {
  id: number;
  rating: number;
  review?: string | null;
  productId: number;
};

/**
 * Product type derived from Prisma schema
 */
export type Product = {
  id: number;
  name: string;
  description?: string | null;
  price: Decimal;
  type: number;
  image_src: string;
  seller: SimplifiedUser;
  sellerId: string;
  reviews: SimplifiedReview[];
};

/**
 * Review type derived from Prisma schema
 */
export type Review = {
  id: number;
  rating: number;
  review?: string | null;
  product?: Product | null;
  productId: number;
};

/**
 * Account type derived from Prisma schema
 */
export type Account = {
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Session type derived from Prisma schema
 */
export type Session = {
  sessionToken: string;
  userId: string;
  expires: Date;
  user?: User;
  createdAt: Date;
  updatedAt: Date;
};

/**
 * VerificationToken type derived from Prisma schema
 */
export type VerificationToken = {
  identifier: string;
  token: string;
  expires: Date;
};

/**
 * Authenticator type derived from Prisma schema
 */
export type Authenticator = {
  credentialID: string;
  userId: string;
  providerAccountId: string;
  credentialPublicKey: string;
  counter: number;
  credentialDeviceType: string;
  credentialBackedUp: boolean;
  transports?: string | null;
};

/**
 * Utility type for creating new entities (without ID and timestamps)
 */
export type CreateEntity<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/**
 * Utility type for updating entities (partial fields)
 */
export type UpdateEntity<T> = Partial<T>;
