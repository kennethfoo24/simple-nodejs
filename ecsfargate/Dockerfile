# Use an official Node.js runtime as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY ../package*.json ./

# Install application dependencies
RUN npm install dd-trace --save

# Copy the application files to the container
COPY ../ .

# Expose the port that the app will run on
EXPOSE 3000

ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

# datadog unified service tagging
ENV DD_SERVICE="ecsfargate-nodejs-simple"
ENV DD_ENV="ecsfargate-nodejs"
ENV DD_VERSION="1.2.3"
# ENV DD_API_KEY=[Enter API Key]
ENV DD_TRACE_ENABLED=true
ENV DD_SITE='datadoghq.com'
ENV DD_LOGS_ENABLED=true
ENV DD_LOGS_INJECTION=true

# Define the command to run your application with dd trace
CMD [ "node", "--require", "dd-trace/init", "app.js" ]
