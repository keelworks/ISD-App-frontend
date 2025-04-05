# Multi-stage Dockerfile for React + Vite App

# Stage 1: Build
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Production
FROM nginx:stable-alpine

# Set the working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx static assets
RUN rm -rf ./*

# Copy built assets from Stage 1
COPY --from=build /app/dist .


# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the application port
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
