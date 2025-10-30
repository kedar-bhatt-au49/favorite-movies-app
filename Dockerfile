# Railway Deployment - Simple approach
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy root package.json
COPY package*.json ./

# Copy server package.json
COPY server/package*.json ./server/

# Install root dependencies
RUN npm install

# Install server dependencies
WORKDIR /app/server
RUN npm install

# Copy server source code
COPY server/ ./

# Generate Prisma client
RUN npx prisma generate

# Build TypeScript
RUN npm run build

# Expose port
EXPOSE $PORT

# Start command
CMD ["node", "dist/index.js"]
