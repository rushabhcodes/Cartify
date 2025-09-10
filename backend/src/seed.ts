import { prisma } from './config';
import { sampleItems } from './data/sampleData';

async function main() {
  console.log('🌱 Seeding database with sample items...');

  // Clear existing cart items first (to avoid foreign key constraint)
  await prisma.cart.deleteMany();
  console.log('🗑️  Cleared existing cart items');

  // Clear existing items
  await prisma.item.deleteMany();
  console.log('🗑️  Cleared existing items');

  // Create sample items
  for (const item of sampleItems) {
    await prisma.item.create({
      data: item
    });
    console.log(`✅ Created item: ${item.name}`);
  }

  console.log('🎉 Database seeded successfully!');
  console.log(`📦 Created ${sampleItems.length} sample items`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
