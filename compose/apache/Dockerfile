FROM node:12.16.3-stretch as build-stage 

COPY ./src/vue /code
WORKDIR /code
RUN yarn install &&\
    yarn run webpack 

FROM httpd:alpine

COPY --from=build-stage /code/dist /usr/local/apache2/htdocs/
