# Railway Deployment - Use Debian-based image for better compatibility
FROM node:18-slim

# Install necessary packages for Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app/server

# Copy server files
COPY server/package*.json ./
COPY server/tsconfig.json ./
COPY server/prisma/ ./prisma/

# Install dependencies
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy source code
COPY server/src/ ./src/

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE $PORT

# Start command
CMD ["npm", "start"]
