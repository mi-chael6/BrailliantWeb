# Use Node LTS base image with Debian so we can install packages
FROM node:18

# Install liblouis
RUN apt-get update && apt-get install -y liblouis-bin

# Create app directory
WORKDIR /app

# Copy package.json & package-lock.json
COPY package*.json ./

# Install Node dependencies
RUN npm install

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 8000

# Start the server
CMD ["node", "server.js"]
