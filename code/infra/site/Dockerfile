ARG NGINX_IMAGE=nginx:stable-alpine
FROM ${NGINX_IMAGE}

ARG RELEASE_ID=local
LABEL org.opencontainers.image.title="Herong portfolio" \
      org.opencontainers.image.revision="${RELEASE_ID}"

COPY nginx.conf /etc/nginx/nginx.conf
COPY site.conf /etc/nginx/conf.d/default.conf
COPY public/ /usr/share/nginx/html/

USER 101:101
EXPOSE 8080
ENTRYPOINT ["nginx", "-g", "daemon off;"]
