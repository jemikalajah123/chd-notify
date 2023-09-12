# Use the predefined node base image for this application.
FROM node:16.0.0

WORKDIR '/app'

# This will copy from docker cache unless the package.json file has changed
COPY package.json .

# Install node dependencies
RUN yarn

RUN yarn global add typescript && yarn global add ts-node && yarn global add nodemon

# add app to root directory
COPY . .

# Start the app
CMD ["yarn", "start"]