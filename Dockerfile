# Dockerfile
FROM node:14

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

# Bind to port 80
EXPOSE 80

# Run the app
CMD [ "node", "app.js" ]
