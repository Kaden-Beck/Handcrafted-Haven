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
];

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
    name: 'Live-Edge Serving Board',
    description: 'Black walnut charcuterie board with chamfered underside.',
    price: new Prisma.Decimal('86.00'),
    type: 1,
    image_src: '/images/products/serving-board.jpg',
    sellerId: 'seller-willow-works',
  },
  {
    name: 'Sea Mist Pour-Over Set',
    description: 'Wheel-thrown ceramic dripper with matching server.',
    price: new Prisma.Decimal('120.00'),
    type: 2,
    image_src: '/images/products/pour-over.jpg',
    sellerId: 'seller-harbor-studio',
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
    name: 'Trailhead Key Fob',
    description: 'Solid brass hardware and saddle-stitched loop.',
    price: new Prisma.Decimal('28.00'),
    type: 3,
    image_src: '/images/products/key-fob.jpg',
    sellerId: 'seller-summit-leather',
  },
];

async function main() {
  // Reset dependent tables so foreign keys remain valid.
  await prisma.review.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();

  await prisma.$transaction(
    sellerSeed.map((seller) =>
      prisma.user.create({
        data: seller,
      })
    )
  );

  const products = await prisma.$transaction(
    productSeed.map((product) =>
      prisma.product.create({
        data: product,
      })
    )
  );

  const reviewSeed = [
    {
      rating: 5,
      review: 'Beautiful craftsmanship and fast shipping.',
      productId: products.find((p) => p.name === 'Hand-Carved Walnut Spoon')!.id,
    },
    {
      rating: 4,
      review: 'Glaze is gorgeous, slightly smaller than expected.',
      productId: products.find((p) => p.name === 'Tidal Pool Bud Vase')!.id,
    },
    {
      rating: 5,
      review: 'Wallet broke in quickly and feels premium.',
      productId: products.find((p) => p.name === 'Heritage Bifold Wallet')!.id,
    },
  ];

  await prisma.$transaction(
    reviewSeed.map((review) =>
      prisma.review.create({
        data: review,
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (error) => {
    console.error('Seeding failed:', error);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
