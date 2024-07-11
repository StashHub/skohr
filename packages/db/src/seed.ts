import { faker } from '@faker-js/faker';
import { prisma } from './client';

async function main() {}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
