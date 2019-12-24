# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:latest
# Set the working directory to /client
WORKDIR /list_world
# copy package.json into the container at /client
COPY package*.json /list_world/
# install dependencies
RUN npm install
# Copy the current directory contents into the container at /client
COPY . /list_world/
# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
