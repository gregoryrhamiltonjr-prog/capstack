import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { loadEnvConfig } from "@next/env";

loadEnvConfig(process.cwd());
const db = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";

  if (!email) {
    throw new Error("Set ADMIN_EMAIL before running npm run admin:provision.");
  }
  if (password && password.length < 12) {
    throw new Error("ADMIN_PASSWORD must be at least 12 characters when provided.");
  }

  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined;
  await db.user.upsert({
    where: { email },
    create: {
      email,
      displayName: "Admin",
      name: "Admin",
      passwordHash,
      onboarded: true,
      isAdmin: true,
      subscriptionStatus: "active",
    },
    update: {
      isAdmin: true,
      onboarded: true,
      ...(passwordHash ? { passwordHash } : {}),
    },
  });

  console.log(`Admin access provisioned for ${email}.`);
}

main()
  .catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
