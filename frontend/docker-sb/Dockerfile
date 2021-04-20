# Builder image for the frontend
FROM node:14-alpine as builder

## Switch to an unprivileged user (avoids problems with npm)
USER node

## Set the working directory and copy the source code
RUN mkdir --parent /tmp/frontend
COPY --chown=node:node . /tmp/frontend
WORKDIR /tmp/frontend

## Install the dependencies and build
RUN yarn install --frozen-lockfile
RUN yarn build

# Final image to export the service
FROM nginx:1.19

## Copy the different files
COPY --chown=nginx:nginx --from=builder /tmp/frontend/public /usr/share/nginx/html
COPY --chown=nginx:nginx nginx.conf /etc/nginx/conf.d/default.conf
COPY --chown=nginx:nginx docker-entrypoint.sh /

## Add permissions for the nginx user
RUN chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

RUN chmod +x docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]