import { prisma } from "@/prisma/client";

export const ADMIN_QUERIES = {
  getAllAdminInfo: async () => {
    const users = await prisma.user.findMany({
      where: { role: { in: ["USER", "BUSINESS"] } },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      }
    });

    const businesses = await prisma.business.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        userId: true,
      }
    });

    const products = await prisma.product.findMany({
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        status: true,
      }
    });

    const orders = await prisma.order.findMany({
      select: {
        id: true,
        orderDate: true,
        amount: true,
        paymentStatus: true,
        buyerId: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            productId: true,
          }
        }
      }
    });

    // Convert Decimal → string on products and orders
    products.forEach((p) => {
      p.price = p.price.toString();
    });
    orders.forEach((o) => {
      o.amount = o.amount.toString();
      o.orderItems.forEach((oi) => {
        oi.price = oi.price.toString();
      });
    });

    return { users, businesses, products, orders };
  }
}

export const BUSINESS_QUERIES = {
  getById: async (userId) => {
    return prisma.business.findUnique({
      where: { userId },
      include: {
        // grab each product’s reviews + sales
        products: {
          include: {
            reviews: true,
            orderItems: {
              include: { order: true },
            },
          },
        },
        supportRequests: true,
      },
    });
  },
  getNameAndDescription: async (businessId) => {
    return prisma.business.findUnique({
      where: { id: businessId },
      select: {
        name: true,
        description: true,
      },
    });
  },
  updateBusiness: async (id, name, description) => {
    await prisma.business.update({
      where: { id },
      data: { businessName: name, businessDescription: description },
    });
  },
  getOrdersForBusiness: async (businessId) => {
    // 1) load every product + its orderItems + the parent order + buyer
    const biz = await prisma.business.findUnique({
      where: { id: businessId },
      include: {
        products: {
          include: {
            orderItems: {
              include: {
                order: { include: { buyer: true } },
              },
            },
          },
        },
      },
    });
    if (!biz) return [];

    // 2) flatten out one array of order‑records
    return biz.products.flatMap((p) =>
      p.orderItems.map((oi) => ({
        id: oi.id,
        orderDate: oi.order.orderDate,
        buyerName: oi.order.buyer.name,
        total: oi.order.amount.toString(),
        productName: p.name,
        quantity: oi.quantity,
      }))
    );
  },

  getAllBusinessInfo: async (id) => {
    // 1) Fetch via select
    const biz = await prisma.business.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        description: true,
        status: true,
        products: {
          select: {
            id: true,
            name: true,
            mainImage: true,
            price: true,
            category: true,
            status: true,
            // nested reviews on each product
            reviews: {
              select: {
                id: true,
                rating: true,
                comment: true,
                createdAt: true,
              },
            },
            // nested sales for each product
            orderItems: {
              select: {
                id: true,
                quantity: true,
                price: true,
                order: {
                  select: {
                    id: true,
                    orderDate: true,
                    amount: true,
                    paymentStatus: true,
                    buyer: {
                      select: {
                        id: true,
                        name: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
        supportRequests: {
          select: {
            id: true,
            subject: true,
            status: true,
            createdAt: true,
            updatedAt: true,
          },
        },
      },
    });
    if (!biz) return null;

    // 2) Convert Decimal → string on products and reviews
    const products = biz.products.map((p) => ({
      id: p.id,
      name: p.name,
      mainImage: p.mainImage,
      price: p.price.toString(),
      category: p.category,
      status: p.status,
      reviews: p.reviews.map((r) => ({
        id: r.id,
        rating: r.rating.toString(),
        comment: r.comment,
        createdAt: r.createdAt,
      })),
    }));

    // 3) Flatten all orderItems into a single `orders` array
    const orders = biz.products.flatMap((p) =>
      p.orderItems.map((oi) => ({
        orderItemId: oi.id,
        orderId: oi.order.id,
        orderDate: oi.order.orderDate,
        buyerId: oi.order.buyer.id,
        buyerName: oi.order.buyer.name,
        productId: p.id,
        productName: p.name,
        quantity: oi.quantity,
        price: oi.price.toString(),
        total: oi.order.amount.toString(),
        paymentStatus: oi.order.paymentStatus,
      }))
    );

    // 4) Support requests as-is
    const supportRequests = biz.supportRequests.map((sr) => ({
      id: sr.id,
      subject: sr.subject,
      status: sr.status,
      createdAt: sr.createdAt,
      updatedAt: sr.updatedAt,
    }));

    return {
      id: biz.id,
      name: biz.name,
      description: biz.description,
      status: biz.status,
      products,
      orders,
      supportRequests,
    };
  },
};

export const USER_QUERIES = {
  getByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  getById: (id) => prisma.user.findUnique({ where: { id } }),
  getByUsername: (username) => prisma.user.findUnique({ where: { username } }),
  getByEmailOrUsername: (email, username) => {
    return prisma.user.findFirst({
      where: {
        OR: [{ email }, { username }],
      },
    });
  },
  getAllUsers: () => prisma.user.findMany(),
  getUserOrders: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        orders: {
          include: {
            orderItems: {
              include: { product: true },
            },
          },
        },
      },
    });
  },
  getReviews: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        reviews: {
          include: {
            product: true,
          },
        },
      },
    });
  },

  getSupportRequests: (userId) => {
    return prisma.user.findUnique({
      where: { id: userId },
      include: {
        supportRequests: true,
      },
    });
  },
  getOrderForUser: (userId, orderId) => {
    return prisma.order.findFirst({
      where: { id: orderId, buyerId: userId },
      select: {
        id: true,
        orderDate: true,
        amount: true,
        paymentStatus: true,
        orderItems: {
          select: {
            id: true,
            quantity: true,
            price: true,
            product: {
              select: {
                id: true,
                name: true,
                mainImage: true,
                price: true,
              },
            },
          },
        },
      },
    })
  },

  getAllUserInfo: async (userId) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        orders: {
          select: {
            id: true,
            orderDate: true,
            amount: true,
            paymentStatus: true,
            orderItems: {
              select: {
                id: true,
                quantity: true,
                price: true,
                product: {
                  select: {
                    id: true,
                    name: true,
                    mainImage: true,
                    price: true,
                  },
                },
              },
            },
          },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            product: {
              select: {
                id: true,
                name: true,
                mainImage: true,
                price: true,
              },
            },
          },
        },
        supportRequests: {
          select: {
            id: true,
            subject: true,
            status: true,
            createdAt: true,
          },
        },
      },
    });
    // Remove decimals from order amounts, price, and review rating
    if (user && user.orders) {
      user.orders = user.orders.map((order) => {
        return {
          ...order,
          amount: order.amount.toString(),
          orderItems: order.orderItems.map((item) => ({
            ...item,
            price: item.price.toString(),
            product: {
              ...item.product,
              price: item.product.price.toString(),
            },
          })),
        };
      });
    }

    if (user && user.reviews) {
      user.reviews = user.reviews.map((review) => ({
        ...review,
        rating: review.rating.toString(),
        product: {
          ...review.product,
          price: review.product.price.toString(),
        },
      }));
    }

    return user;
  },
};

export const USER_MUTATIONS = {
  createUser: (data) => prisma.user.create({ data }),
  updateUser: (id, data) => prisma.user.update({ where: { id }, data }),
  deleteUser: (id) => prisma.user.delete({ where: { id } }),
};

export const PRODUCT_QUERIES = {
  getById: (id) => prisma.product.findUnique({ where: { id } }),
  getAllProducts: () => prisma.product.findMany(),
  getProductsByCategory: (categoryId) => {
    return prisma.product.findMany({
      where: { categoryId },
    });
  },
  getProductsBySeller: (sellerId) => {
    return prisma.product.findMany({
      where: { sellerId },
    });
  },
  getProductsByRating: (rating) => {
    return prisma.product.findMany({
      where: { rating },
    });
  },
  getProductsByPriceRange: (minPrice, maxPrice) => {
    return prisma.product.findMany({
      where: {
        price: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
  },
  getProductsBySearch: (searchTerm) => {
    return prisma.product.findMany({
      where: {
        OR: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
    });
  },
  getFeaturedProducts: async (limit = 10) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // fetch reviews so we can calc avg rating
    const products = await prisma.product.findMany({
      where: {
        orderItems: { some: { order: { orderDate: { gte: thirtyDaysAgo } } } },
      },
      orderBy: { orderItems: { _count: "desc" } },
      take: limit,
      include: {
        reviews: { select: { rating: true } },
        seller: { select: { name: true } },
      },
    });

    // compute avgRating and count
    return products.map((p) => {
      const count = p.reviews.length;
      const avg =
        count > 0 ? p.reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
      return {
        ...p,
        seller: p.seller.name,
        avgRating: avg,
        reviewsCount: count,
      };
    });
  },

  getProductDetailsWithReviews: async (id) => {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: { select: { name: true } },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            reviewer: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return null;
    }

    const count = product.reviews.length;
    const avg =
      count > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / count
        : 0;

    return {
      ...product,
      sellerName: product.seller.name,
      avgRating: avg,
      reviewsCount: count,
    };
  },
  getAllProductsWithReviews: async (selectedCategory, searchTerm) => {
    console.log("Fetching all products with reviews...");
    return await prisma.product.findMany({
      where: {
        ...(selectedCategory !== "all" ? { category: selectedCategory } : {}),
        AND: [
          { name: { contains: searchTerm, mode: "insensitive" } },
          { description: { contains: searchTerm, mode: "insensitive" } },
        ],
      },
      include: {
        reviews: { select: { rating: true } },
        seller: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });
  },
};
