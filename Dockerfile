# Multi-stage build for optimized production image
FROM node:20-alpine AS base

# Pin pnpm via Corepack to match lockfile v6
RUN corepack enable && corepack prepare pnpm@8.15.8 --activate

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json pnpm-lock.yaml ./

# Install dependencies
FROM base AS dependencies
RUN pnpm install --frozen-lockfile

# Generate Prisma Client
COPY prisma ./prisma
RUN npx prisma generate

# Build application
FROM base AS build
COPY --from=dependencies /app/node_modules ./node_modules
COPY . .
RUN npx prisma generate
RUN pnpm run build

# Production image
FROM node:20-alpine AS production

# Pin pnpm via Corepack to match lockfile v6
RUN corepack enable && corepack prepare pnpm@8.15.8 --activate

WORKDIR /app

# Copy package files and install production dependencies only
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --prod --frozen-lockfile

# Copy Prisma schema and generate client
COPY prisma ./prisma
RUN npx prisma generate

# Copy built application from build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/generated ./generated

# Expose application port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s \
  CMD node -e "const p=process.env.APP_PORT||3000;require('http').get('http://localhost:'+p+'/api/v1',(r)=>{if(r.statusCode!==404)process.exit(1)})"

# Start application
CMD ["node", "dist/main"]
