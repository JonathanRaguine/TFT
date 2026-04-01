# Start with a Node.js base image
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first
# Same caching trick — only reinstall if dependencies changed
COPY package.json package-lock.json .

# Install Node dependencies
RUN npm install

# Copy the rest of the frontend code
COPY . .

# React dev server runs on port 3000
EXPOSE 3000

# Start the React dev server
CMD ["npm", "start"]