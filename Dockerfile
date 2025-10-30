# Railway Deployment - Simple approach
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json
COPY package*.json ./

# Copy server package.json and prisma schema first
COPY server/package*.json ./server/
COPY server/prisma/ ./server/prisma/

# Install root dependencies
RUN npm install

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Generate Prisma client (before copying other files)
RUN npx prisma generate

# Copy rest of server source code
COPY server/src/ ./src/

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE $PORT

# Start command
CMD ["node", "dist/index.js"]
