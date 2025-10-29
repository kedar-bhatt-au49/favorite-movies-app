# For Railway deployment
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY server/package*.json ./server/
COPY client/package*.json ./client/

# Install dependencies
RUN npm install
RUN cd server && npm install
RUN cd client && npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Set working directory to server for runtime
WORKDIR /app/server

# Expose port
EXPOSE $PORT

# Start the application
CMD ["npm", "start"]
