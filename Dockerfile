# syntax=docker/dockerfile:1

FROM node:20-slim

# Set working directory
WORKDIR /app

# Install OS utilities + sudo, and give node user sudo access
RUN apt-get update && \
    apt-get install -y sudo tree curl git bash && \
    echo "node ALL=(ALL) NOPASSWD:ALL" >> /etc/sudoers && \
    rm -rf /var/lib/apt/lists/*

# Copy only package files to install dependencies early (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Expose Vite dev server port
EXPOSE 5173
EXPOSE 4173

# Default command
CMD ["npm", "run", "dev"]
