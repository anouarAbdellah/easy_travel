# Use official node image as the base image
FROM node:14.16 as build

# Set the working directory
WORKDIR /app

# Add the source code to app
COPY package.json .

# Install all the dependencies
RUN npm install


COPY . .

# Generate the build of the application
RUN npm run build



# Expose port
EXPOSE 4200 49153


CMD npm run start