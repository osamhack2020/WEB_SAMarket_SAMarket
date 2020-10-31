FROM golang:latest AS go
ADD ./backend /backend
WORKDIR /backend
RUN go get -u github.com/swaggo/swag/cmd/swag
RUN swag init
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build -ldflags "-w" -a -o ./sam

FROM node:alpine AS node
ADD ./frontend /frontend
WORKDIR /frontend
RUN yarn install
RUN yarn build

FROM alpine:latest
RUN apk --no-cache add ca-certificates
WORKDIR /app
COPY --from=go /backend/sam .
COPY --from=node /frontend/build ./web
COPY ./backend/docker.yaml .
RUN chmod 755 /app/sam
ENV SA_RUN docker
EXPOSE 7777
CMD ["/bin/sh", "-c", "/app/sam"]
