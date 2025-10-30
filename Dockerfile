# Railway Deployment - Simple approach
FROM node:18-alpine

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
