# Use an official Node.js runtime as a base image
FROM node:21

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Copy datadog serverless-init and datadog tracer
COPY --from=datadog/serverless-init:1 /datadog-init /app/datadog-init
COPY --from=datadog/dd-lib-js-init /operator-build/node_modules /dd_tracer/node/

# Install application dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 3000

ARG DD_GIT_REPOSITORY_URL
ARG DD_GIT_COMMIT_SHA
ENV DD_GIT_REPOSITORY_URL=${DD_GIT_REPOSITORY_URL} 
ENV DD_GIT_COMMIT_SHA=${DD_GIT_COMMIT_SHA}

# datadog unified service tagging
ENV DD_SERVICE="cloudrun-nodejs-simple"
ENV DD_ENV="cloudrun-nodejs"
ENV DD_VERSION="1.1.1"
# ENV DD_API_KEY=[Enter API Key]
ENV DD_TRACE_ENABLED=true
ENV DD_SITE='datadoghq.com'
ENV DD_TRACE_PROPAGATION_STYLE='datadog'
ENV DD_LOGS_ENABLED=true
ENV DD_LOGS_INJECTION=true
ENV DD_PROFILING_ENABLED=true
ENV DD_RUNTIME_METRICS_ENABLED=true
ENV DD_APPSEC_ENABLED=true
ENV DD_TRACE_DEBUG=true
ENV DD_TRACE_STARTUP_LOGS=true

# Define the command to run your application with dd trace
ENTRYPOINT ["/app/datadog-init"]
CMD [ "node", "app.js" ]
