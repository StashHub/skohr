import { Prisma, PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

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
const globalForPrisma = global as typeof global & {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

/**
 * Initialize the Prisma client instance and store it in the global object.
 * If the instance already exists, use the existing one.
 */
const db = globalForPrisma.prisma ?? createPrismaClient();

// In non-production environments, update the global Prisma client instance
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;

export * from '@prisma/client';

// -- Extensions --

export const prisma = db
  .$extends({
    client: { $log: (s: string) => console.log(s) },
  })
  .$extends({
    model: {
      $allModels: {
        // `exists` method available on all models
        async exists<T>(
          this: T,
          where: Prisma.Args<T, 'findFirst'>['where']
        ): Promise<boolean> {
          // Get the current model at runtime
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findFirst({ where });
          return result !== null;
        },
        // `getById` method available on all models
        async getById<T>(
          this: T,
          id: string
        ): Promise<Prisma.Result<T, { id: string }, 'findUniqueOrThrow'>> {
          const context = Prisma.getExtensionContext(this);
          return await (context as any).findUniqueOrThrow({ where: { id } });
        },
      },
    },
  })
  .$extends(withAccelerate());
