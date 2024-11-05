# Use an official Node.js image
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install pnpm globally
RUN npm install -g pnpm

# Copy the package.json and pnpm-lock.yaml files to install dependencies
COPY package.json pnpm-lock.yaml ./

# Install dependencies with pnpm
RUN pnpm install

# Copy the rest of the application code
COPY . .

# Expose the port that SvelteKit runs on
EXPOSE 5173

# Run the development server
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0"]
