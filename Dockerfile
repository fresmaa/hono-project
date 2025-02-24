# Use an official Bun runtime as a parent image
FROM oven/bun:1.1.11

# Set the working directory
WORKDIR /app

# Copy the rest of the application code
COPY . .


# Install dependencies
RUN bun install --ci

# Expose the port that your application runs on
EXPOSE 80

# Set the PORT environment variable
ENV PORT=80
ENV TZ="Asia/Jakarta"

# Command to run the app, ensuring it runs on port 80
CMD ["sh", "-c", "bun ./build/index.js"]
