FROM node:20

WORKDIR /app

# Copy app directory
COPY app/ /app/

# Install dependencies
RUN npm ci

# Expose Expo dev server ports
EXPOSE 8081 19000 19001

# Start Expo dev server
CMD ["npm", "start"]
