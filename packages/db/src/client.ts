import { PrismaClient } from '@prisma/client';

/**
 * Create a new Prisma client instance with logging enabled
 * based on the current Node environment.
 */
const createPrismaClient = () =>
  new PrismaClient({
    /**
     * Define log levels for Prisma client. In development mode,
     * log queries, errors, and warnings. In production mode, only log errors.
     */
    log:
      process.env.NODE_ENV === 'development'
        ? ['query', 'error', 'warn']
        : ['error'],
  });

/**
 * Create a global object to store the Prisma client instance.
 * This allows us to access the client from anywhere in the application.
 */
const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

/**
 * Initialize the Prisma client instance and store it in the global object.
 * If the instance already exists, use the existing one.
 */
export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// In non-production environments, update the global Prisma client instance
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export * from '@prisma/client';
