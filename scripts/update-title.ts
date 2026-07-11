import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.chapter.updateMany({
    where: {
      code: "T1.M1.1"
    },
    data: {
      title: "What is Commercial Real Estate?"
    }
  });
  console.log("Updated chapter title!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
