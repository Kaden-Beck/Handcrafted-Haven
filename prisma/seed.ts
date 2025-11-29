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
    id: 'seller-moonlit-glass',
    name: 'Moonlit Glassworks',
    email: 'contact@moonlitglass.test',
    bio: 'Stained glass panels with starry gradients.',
    image: '/images/sellers/moonlit.jpg',
  },
  {
    id: 'seller-cedar-ink',
    name: 'Cedar & Ink Prints',
    email: 'press@cedarandink.test',
    bio: 'Limited-run botanical prints and stationery.',
    image: '/images/sellers/cedar-ink.jpg',
  },
  {
    id: 'seller-honeycomb-atelier',
    name: 'Honeycomb Atelier',
    email: 'hello@honeycombatelier.test',
    bio: 'Beeswax decor inspired by apiary geometry.',
    image: '/images/sellers/honeycomb.jpg',
  },
  {
    id: 'seller-marigold-metal',
    name: 'Marigold Metalworks',
    email: 'shop@marigoldmetal.test',
    bio: 'Warm brass furnishings shaped by hand.',
    image: '/images/sellers/marigold.jpg',
  },
  {
    id: 'seller-ember-clay',
    name: 'Ember Clay Guild',
    email: 'guild@emberclay.test',
    bio: 'Smoke-fired ceramics with ember-kissed finishes.',
    image: '/images/sellers/ember.jpg',
  },
  {
    id: 'seller-starlight-studio',
    name: 'Starlight Studio',
    email: 'team@starlightstudio.test',
    bio: 'Fiber art capturing constellations and night skies.',
    image: '/images/sellers/starlight.jpg',
  },
  {
    id: 'seller-terrace-textiles',
    name: 'Terrace Textiles',
    email: 'loom@terracetextiles.test',
    bio: 'Linen dining accents in sun-washed tones.',
    image: '/images/sellers/terrace.jpg',
  },
  {
    id: 'seller-pinecone-press',
    name: 'Pinecone Press',
    email: 'hello@pineconepress.test',
    bio: 'Nature-inspired stationery and art prints.',
    image: '/images/sellers/pinecone.jpg',
  },
  {
    id: 'seller-orchard-oak',
    name: 'Orchard & Oak',
    email: 'studio@orchardandoak.test',
    bio: 'Garden baskets and planters woven from local willow.',
    image: '/images/sellers/orchard.jpg',
  },
  {
    id: 'seller-obsidian-forge',
    name: 'Obsidian Forge',
    email: 'forge@obsidianforge.test',
    bio: 'Forged steel blades and sculptural ironwork.',
    image: '/images/sellers/obsidian.jpg',
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
  {
    name: 'Patina Copper Saucepan',
    description: '2-quart saucepan with riveted brass handle.',
    price: new Prisma.Decimal('140.00'),
    type: 4,
    image_src: '/images/products/copper-saucepan.jpg',
    sellerId: 'seller-copper-hollow',
  },
  {
    name: 'Hearth Copper Ladle',
    description: 'Deep ladle with hammered bowl and hanging loop.',
    price: new Prisma.Decimal('58.00'),
    type: 4,
    image_src: '/images/products/copper-ladle.jpg',
    sellerId: 'seller-copper-hollow',
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
    name: 'Mossbank Throw Pillow',
    description: 'Handwoven pillow cover with botanical dyes.',
    price: new Prisma.Decimal('68.00'),
    type: 5,
    image_src: '/images/products/throw-pillow.jpg',
    sellerId: 'seller-riverstone-loom',
  },
  {
    name: 'Moonlit Stained Glass Panel',
    description: 'Arched panel with soldered lead lines and iridescent glass.',
    price: new Prisma.Decimal('185.00'),
    type: 6,
    image_src: '/images/products/glass-panel.jpg',
    sellerId: 'seller-moonlit-glass',
  },
  {
    name: 'Aurora Hanging Lantern',
    description: 'Faceted lantern casting prismatic light.',
    price: new Prisma.Decimal('130.00'),
    type: 6,
    image_src: '/images/products/glass-lantern.jpg',
    sellerId: 'seller-moonlit-glass',
  },
  {
    name: 'Botanical Relief Print',
    description: 'Limited print on cotton rag with deckled edge.',
    price: new Prisma.Decimal('48.00'),
    type: 7,
    image_src: '/images/products/botanical-print.jpg',
    sellerId: 'seller-cedar-ink',
  },
  {
    name: 'Nightfall Letterpress Cards',
    description: 'Set of six letterpress cards with envelopes.',
    price: new Prisma.Decimal('28.00'),
    type: 7,
    image_src: '/images/products/letterpress-cards.jpg',
    sellerId: 'seller-cedar-ink',
  },
  {
    name: 'Beeswax Taper Set',
    description: 'Pair of naturally dyed tapers with cotton wicks.',
    price: new Prisma.Decimal('36.00'),
    type: 8,
    image_src: '/images/products/beeswax-tapers.jpg',
    sellerId: 'seller-honeycomb-atelier',
  },
  {
    name: 'Honeycomb Wall Hanging',
    description: 'Hexagonal wax tiles suspended on linen cord.',
    price: new Prisma.Decimal('64.00'),
    type: 8,
    image_src: '/images/products/honeycomb-hanging.jpg',
    sellerId: 'seller-honeycomb-atelier',
  },
  {
    name: 'Hammered Brass Serving Set',
    description: 'Serving spoon and fork with matte lacquer finish.',
    price: new Prisma.Decimal('92.00'),
    type: 4,
    image_src: '/images/products/brass-serving-set.jpg',
    sellerId: 'seller-marigold-metal',
  },
  {
    name: 'Gilded Plant Stand',
    description: 'Tiered brass stand for tabletop greenery.',
    price: new Prisma.Decimal('110.00'),
    type: 4,
    image_src: '/images/products/plant-stand.jpg',
    sellerId: 'seller-marigold-metal',
  },
  {
    name: 'Ember Glazed Dinner Plate',
    description: 'Stoneware plate fired in reduction kiln.',
    price: new Prisma.Decimal('42.00'),
    type: 2,
    image_src: '/images/products/dinner-plate.jpg',
    sellerId: 'seller-ember-clay',
  },
  {
    name: 'Smoke-Fired Tea Bowl',
    description: 'Small bowl with carbon trail markings.',
    price: new Prisma.Decimal('54.00'),
    type: 2,
    image_src: '/images/products/tea-bowl.jpg',
    sellerId: 'seller-ember-clay',
  },
  {
    name: 'Constellation Wall Tapestry',
    description: 'Hand-stitched constellations on indigo cotton.',
    price: new Prisma.Decimal('160.00'),
    type: 5,
    image_src: '/images/products/constellation-tapestry.jpg',
    sellerId: 'seller-starlight-studio',
  },
  {
    name: 'Midnight Star Mobile',
    description: 'Brass and thread mobile that mirrors the night sky.',
    price: new Prisma.Decimal('78.00'),
    type: 6,
    image_src: '/images/products/star-mobile.jpg',
    sellerId: 'seller-starlight-studio',
  },
  {
    name: 'Terrace Linen Napkins',
    description: 'Set of four washed-linen napkins with mitered corners.',
    price: new Prisma.Decimal('56.00'),
    type: 5,
    image_src: '/images/products/linen-napkins.jpg',
    sellerId: 'seller-terrace-textiles',
  },
  {
    name: 'Reeded Market Tote',
    description: 'Handwoven reed basket with leather handles.',
    price: new Prisma.Decimal('98.00'),
    type: 1,
    image_src: '/images/products/market-tote.jpg',
    sellerId: 'seller-terrace-textiles',
  },
  {
    name: 'Pine Needle Journal',
    description: 'Hardbound journal with pressed botanical cover.',
    price: new Prisma.Decimal('34.00'),
    type: 7,
    image_src: '/images/products/pine-journal.jpg',
    sellerId: 'seller-pinecone-press',
  },
  {
    name: 'Evergreen Art Print',
    description: 'Risograph art print inspired by mountain trails.',
    price: new Prisma.Decimal('40.00'),
    type: 7,
    image_src: '/images/products/evergreen-print.jpg',
    sellerId: 'seller-pinecone-press',
  },
  {
    name: 'Orchard Herb Planter',
    description: 'Coiled willow planter with drainage shelf.',
    price: new Prisma.Decimal('65.00'),
    type: 1,
    image_src: '/images/products/herb-planter.jpg',
    sellerId: 'seller-orchard-oak',
  },
  {
    name: 'Oak Rimmed Picnic Basket',
    description: 'Family-size basket with removable cotton liner.',
    price: new Prisma.Decimal('125.00'),
    type: 1,
    image_src: '/images/products/picnic-basket.jpg',
    sellerId: 'seller-orchard-oak',
  },
  {
    name: 'Obsidian Edge Chef Knife',
    description: 'High-carbon blade with obsidian-inspired patina.',
    price: new Prisma.Decimal('210.00'),
    type: 4,
    image_src: '/images/products/chef-knife.jpg',
    sellerId: 'seller-obsidian-forge',
  },
  {
    name: 'Forge-Fired Candle Holder',
    description: 'Twisted iron candle holder with wax catch.',
    price: new Prisma.Decimal('62.00'),
    type: 4,
    image_src: '/images/products/candle-holder.jpg',
    sellerId: 'seller-obsidian-forge',
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
    {
      rating: 5,
      review: 'Copper saucepan heats evenly on our range.',
      productId: products.find((p) => p.name === 'Patina Copper Saucepan')!.id,
    },
    {
      rating: 4,
      review: 'Throw pillow colors match the living room perfectly.',
      productId: products.find((p) => p.name === 'Mossbank Throw Pillow')!.id,
    },
    {
      rating: 5,
      review: 'Chef knife is razor sharp right out of the box.',
      productId: products.find((p) => p.name === 'Obsidian Edge Chef Knife')!.id,
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
