const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

function getRandomItems(arr, n) {
  const items = [...arr];
  const result = [];
  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * items.length);
    result.push(items.splice(idx, 1)[0]);
  }
  return result;
}

async function main() {
  const userData = [
    { name: 'Alice Admin',    email: 'alice.admin@example.com',   password: 'adminpass1',    role: 'ADMIN'    },
    { name: 'Bob Admin',      email: 'bob.admin@example.com',     password: 'adminpass2',    role: 'ADMIN'    },
    { name: 'Carol User',     email: 'carol.user@example.com',    password: 'userpass1',     role: 'USER'     },
    { name: 'Dave User',      email: 'dave.user@example.com',     password: 'userpass2',     role: 'USER'     },
    { name: 'Eve User',       email: 'eve.user@example.com',      password: 'userpass3',     role: 'USER'     },
    { name: 'Frank Biz',      email: 'frank.biz@example.com',     password: 'bizpass1',      role: 'BUSINESS', business: { create: { name: 'DevPlugins Co',    status: 'APPROVED' } } },
    { name: 'Grace Biz',      email: 'grace.biz@example.com',     password: 'bizpass2',      role: 'BUSINESS', business: { create: { name: 'ThemeMakers LLC', status: 'APPROVED' } } },
    { name: 'Heidi Biz',      email: 'heidi.biz@example.com',     password: 'bizpass3',      role: 'BUSINESS', business: { create: { name: 'ExtensionPros',    status: 'PENDING'  } } },
    { name: 'Ivan User',      email: 'ivan.user@example.com',     password: 'userpass4',     role: 'USER'     },
    { name: 'Judy User',      email: 'judy.user@example.com',     password: 'userpass5',     role: 'USER'     }
  ];

  const users = await Promise.all(
    userData.map((data, i) => {
      return prisma.user.create({
        data: {
          ...data,
          emailVerified: new Date(),
          customerId: `cust_${i + 1}`,
          paymentId: `pay_${i + 1}`,
        },
        include: { business: true } 
      });
    })
  );

  const allUsers      = users;
  const normalUsers   = users.filter(u => u.role === 'USER');
  const businessUsers = users.filter(u => u.role === 'BUSINESS');
  const businesses    = businessUsers.map(u => u.business);

  const categories = ['plugins', 'themes', 'extensions', 'libraries'];
  const productPromises = [];
  businesses.forEach((biz) => {
    for (let i = 1; i <= 5; i++) {
      const name = `${biz.name} Tool #${i}`;
      productPromises.push(
        prisma.product.create({
          data: {
            name,
            description: `Description for ${name}`,
            price: (Math.random() * 90 + 10).toFixed(2),
            category: getRandomItems(categories, 1)[0],
            url: `https://placehold.it/200x200?text=${encodeURIComponent(name)}`,
            seller: { connect: { id: biz.id } }
          }
        })
      );
    }
  });
  const products = await Promise.all(productPromises);

  for (const user of normalUsers) {
    for (let j = 1; j <= 2; j++) {
      const selected = getRandomItems(products, 3);
      const items = [];
      let total = 0;
      selected.forEach(prod => {
        const qty = Math.floor(Math.random() * 5) + 1;
        const price = parseFloat(prod.price);
        total += price * qty;
        items.push({
          quantity: qty,
          price: prod.price,
          product: { connect: { id: prod.id } }
        });
      });
      await prisma.order.create({
        data: {
          amount: total.toFixed(2),
          paymentId: `orderpay_${user.id}_${j}`,
          buyer: { connect: { id: user.id } },
          orderItems: { create: items }
        }
      });
    }
  }

  for (const product of products) {
    const count = Math.floor(Math.random() * 3) + 1;
    for (let k = 0; k < count; k++) {
      const reviewer = allUsers[Math.floor(Math.random() * allUsers.length)];
      await prisma.review.create({
        data: {
          rating: Math.floor(Math.random() * 5) + 1,
          comment: `Review ${k + 1} for ${product.name}`,
          product: { connect: { id: product.id } },
          reviewer: { connect: { id: reviewer.id } }
        }
      });
    }
  }

  for (const user of allUsers) {
    const biz = getRandomItems(businesses, 1)[0];
    await prisma.supportRequest.create({
      data: {
        subject: `Support needed by ${user.name}`,
        message: `Hello, I need help with a product listed by ${biz.name}.`,
        user:     { connect: { id: user.id } },
        business: { connect: { id: biz.id } }
      }
    });
  }

  console.log('🎉 Database has been seeded successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
