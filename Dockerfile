# Dockerfile References: https://docs.docker.com/engine/reference/builder/
# https://takacsmark.com/docker-logs/
# https://github.com/nodejs/docker-node

###
# Ready for dev not prod (image to big)
#
# docker build -t react-redux-hook .
# docker run -d -p 5000:5000 react-redux-hook:latest
###

# Start from the latest node base image
FROM node:13-alpine as react-build

# Add Maintainer Info
LABEL maintainer="Nicolas Renel <nicolas.renel@ohmytech.fr>"

# Set the Current Working Directory inside the container
WORKDIR /app

RUN yarn global add serve

EXPOSE 5000

COPY package.json yarn.lock ./

RUN yarn

COPY . ./

RUN yarn build

CMD [ "serve", "-s", "build" ]

