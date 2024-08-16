# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Serve the application
FROM node:18-alpine

# Install a lightweight static file server
RUN npm install -g serve

# Copy the build output from the builder stage
COPY --from=builder /app/build /app/build

# Expose the application port
EXPOSE 3000

# Command to serve the application
CMD ["serve", "-s", "/app/build", "-l", "3000"]

