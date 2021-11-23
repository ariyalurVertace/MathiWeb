# Install dependencies
FROM node:14.17.0-alpine AS builder
#install toolchain required for native packages
RUN apk add --no-cache --virtual .toolchain autoconf automake build-base cmake  python gcc make git g++

# Install dependencies
FROM builder AS install
WORKDIR /app
COPY .eslintrc .prettierignore .prettierignore  ./
COPY package*.json yarn.lock ./
RUN yarn --frozen-lockfile --ignore-engines

RUN apk del .toolchain 

# Copy source
COPY public/ ./public
COPY src/ ./src

# Bundle
FROM install AS packager
COPY .env .
RUN yarn build

# Create final single layer image
FROM httpd:2.4-alpine as run
EXPOSE 80
COPY --from=packager /app/build/ /usr/local/apache2/htdocs/
COPY custom_html /usr/local/apache2/htdocs/custom_html
RUN cat /usr/local/apache2/htdocs/custom_html/apache2.conf >> /usr/local/apache2/conf/httpd.conf