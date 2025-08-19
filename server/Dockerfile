# Use Node.js 22 as the base
FROM node:22

# Install liblouis (includes lou_translate)
RUN apt-get update && apt-get install -y liblouis-bin liblouis-data

# Create working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port your app listens on (adjust if not 3000)
EXPOSE 3000

# Start your server
CMD ["node", "server.js"]
