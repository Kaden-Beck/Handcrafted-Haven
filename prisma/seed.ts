// prisma/seed.ts
import 'dotenv/config';
import { PrismaClient, Prisma } from './generated/prisma';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not set');
}

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Sellers — now includes obsidian-forge
const sellerSeed: Prisma.UserCreateInput[] = [
  {
    id: 'seller-willow-works',
    name: 'Willow Works',
    email: 'hello@willowworks.test',
    bio: 'Hand-carved wooden kitchenware inspired by forest walks.',
    image: '/images/sellers/willow.jpg',
  },
  {
    id: 'seller-harbor-studio',
    name: 'Harbor Studio',
    email: 'contact@harborstudio.test',
    bio: 'Coastal ceramics with soft glazes and organic silhouettes.',
    image: '/images/sellers/harbor.jpg',
  },
  {
    id: 'seller-summit-leather',
    name: 'Summit Leather Co.',
    email: 'team@summitleather.test',
    bio: 'Small-batch leather goods crafted for everyday carry.',
    image: '/images/sellers/summit.jpg',
  },
  {
    id: 'seller-copper-hollow',
    name: 'Copper Hollow',
    email: 'hello@copperhollow.test',
    bio: 'Hand-hammered copper cookware with heirloom patina.',
    image: '/images/sellers/copper.jpg',
  },
  {
    id: 'seller-riverstone-loom',
    name: 'Riverstone Loom',
    email: 'studio@riverstoneloom.test',
    bio: 'Earthy textiles woven with botanical dyes.',
    image: '/images/sellers/riverstone.jpg',
  },
  {
    id: 'seller-obsidian-forge',
    name: 'Obsidian Forge',
    email: 'forge@obsidianforge.test',
    bio: 'Forged steel blades and sculptural ironwork.',
    image: '/images/sellers/obsidian.jpg',
  },
];

// Products
const productSeed = [
  {
    name: 'Hand-Carved Walnut Spoon',
    description: 'Finished with food-safe oil and a silky handle taper.',
    price: new Prisma.Decimal('32.00'),
    type: 1,
    image_src: '/images/products/walnut-spoon.jpg',
    sellerId: 'seller-willow-works',
  },
  {
    name: 'Tidal Pool Bud Vase',
    description: 'Matte glaze with crystalline interior highlights.',
    price: new Prisma.Decimal('58.00'),
    type: 2,
    image_src: '/images/products/bud-vase.jpg',
    sellerId: 'seller-harbor-studio',
  },
  {
    name: 'Heritage Bifold Wallet',
    description: 'Full-grain leather with hand-stitched edges.',
    price: new Prisma.Decimal('95.00'),
    type: 3,
    image_src: '/images/products/bifold-wallet.jpg',
    sellerId: 'seller-summit-leather',
  },
  {
    name: 'Riverstone Table Runner',
    description: 'Stonewashed linen with woven mountain motif.',
    price: new Prisma.Decimal('72.00'),
    type: 5,
    image_src: '/images/products/table-runner.jpg',
    sellerId: 'seller-riverstone-loom',
  },
  {
    name: 'Obsidian Edge Chef Knife',
    description: 'High-carbon blade with obsidian-inspired patina.',
    price: new Prisma.Decimal('210.00'),
    type: 4,
    image_src: '/images/products/chef-knife.jpg',
    sellerId: 'seller-obsidian-forge',
  },
];

async function main() {
  console.log('Starting seed...');

  await prisma.review.deleteMany();
  await prisma.order.deleteMany();
  await prisma.message.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  console.log('Cleared old data');

  // Create sellers one by one
  for (const seller of sellerSeed) {
    await prisma.user.create({ data: seller });
  }
  console.log('Created sellers');

  // Create products one by one
  for (const product of productSeed) {
    await prisma.product.create({ data: product });
  }
  console.log('Created products');

  // Get fresh data
  const sellers = await prisma.user.findMany();
  const products = await prisma.product.findMany();

  // Reviews
  await prisma.review.createMany({
    data: [
      { rating: 5, review: 'Incredible craftsmanship!', productId: products[0].id },
      { rating: 4, review: 'Beautiful but a bit small', productId: products[1].id },
      { rating: 5, review: 'Best wallet I’ve ever owned', productId: products[2].id },
      { rating: 5, review: 'Perfect for my kitchen', productId: products[3].id },
      { rating: 5, review: 'Sharp and stunning', productId: products[4].id },
    ],
  });
  console.log('Created reviews');

  // Orders
  await prisma.order.createMany({
    data: [
      { buyerId: sellers[0].id, productId: products[0].id, quantity: 2, total: new Prisma.Decimal(64), createdAt: new Date(Date.now() - 2 * 3600000) },
      { buyerId: sellers[1].id, productId: products[1].id, quantity: 1, total: new Prisma.Decimal(58), createdAt: new Date(Date.now() - 24 * 3600000) },
      { buyerId: sellers[2].id, productId: products[2].id, quantity: 3, total: new Prisma.Decimal(285), createdAt: new Date(Date.now() - 48 * 3600000) },
    ],
  });
  console.log('Created orders');

  // Messages
  await prisma.message.createMany({
    data: [
      { senderId: sellers[0].id, content: 'Do you do custom engravings?' },
      { senderId: sellers[1].id, content: 'Is this vase dishwasher safe?' },
      { senderId: sellers[3].id, content: 'Can you make a larger size?' },
    ],
  });
  console.log('Created messages');

  console.log('Seeding complete!');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error('Seed failed:', e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });