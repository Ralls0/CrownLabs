# Builder image for the frontend
FROM node:14-alpine as builder


## Switch to an unprivileged user (avoids problems with npm)
USER node

## Set the working directory and copy the source code
RUN mkdir --parent /tmp/frontend
WORKDIR /tmp/frontend

COPY --chown=node:node ./package.json /tmp/frontend/package.json
RUN yarn install --frozen-lockfile

ARG BUILD_TARGET

COPY --chown=node:node . /tmp/frontend/
RUN yarn build-$BUILD_TARGET

# Final image to export the service
FROM nginx:1.19
## Copy the different files
COPY --chown=nginx:nginx --from=builder /tmp/frontend/build /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf

## Add permissions for the nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

ENTRYPOINT ["nginx", "-g", "daemon off;"]