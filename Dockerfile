FROM node:latest as build-stage
# Sets the working directory inside your Docker container.
WORKDIR /app
# Copies your package.json and package-lock.json (if available) to the container.
COPY package*.json /app/
# Runs npm install to install dependencies.
# This will install the dependencies as specified in your package.json.
RUN npm install

# Install Angular CLI globally within the container
# This is useful for development containers to use Angular CLI commands directly
RUN npm install -g @angular/cli

# Create a placeholder node_modules, to be overridden by a named volume
RUN mkdir -p /app/node_modules

# The source code will be mounted, so no need to COPY it here