#docker build . -t app-image --build-arg BUILD=true
# Stage 1 - Conditionally download and install dependencies 
FROM node:12 as react-build
WORKDIR /app
COPY . ./
ARG BUILD=false
RUN if [ "$BUILD" = "true" ] ; then npm install ; else echo "Skipping npm install" ; fi
RUN if [ "$BUILD" = "true" ] ; then npm run build ; else echo "Skipping npm run build" ; fi

# Stage 2 - the production environment
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=react-build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]