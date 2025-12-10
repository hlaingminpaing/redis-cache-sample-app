# Simple Dockerfile for Node.js Redis Cache Demo App

FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy app source
COPY . .

# Expose port
EXPOSE 3000

# Start the server
CMD ["node", "app.js"]
