# Use Node.js LTS as base image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy source code
COPY src ./src
COPY .env ./

# Expose the port
EXPOSE 8080

# Start the application
CMD ["node", "src/index.js"]

