import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

async function delay() {
  return new Promise((resolve) => setTimeout(resolve, 1000));
}

async function main() {
  for (const i of [...Array.from(Array(50).keys())]) {
    await client.stream.create({
      data: {
        name: String(i),
        description: String(i),
        price: i,
        user: { connect: { id: 1 } },
      },
    });
    console.log(`${i}/50`);
    await delay();
  }
}

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());

// 더미 데이터 빠르게 생성
