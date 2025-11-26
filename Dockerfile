# -------- 1. BASE STAGE --------
FROM node:20-alpine AS base
WORKDIR /app

# instaliraj pnpm
RUN npm install -g pnpm

# -------- 2. DEPENDENCIES STAGE --------
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# -------- 3. BUILDER STAGE --------
FROM base AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN pnpm build

# -------- 4. RUNNER STAGE --------
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Instaliraj pnpm i na runneru
RUN npm install -g pnpm

COPY --from=builder /app ./

EXPOSE 3000
CMD ["pnpm", "start"]
