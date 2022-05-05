# syntax=docker/dockerfile:1

# for building rambler
FROM golang:1.18-alpine as rambler_builder
RUN apk add --no-cache gcc musl-dev git
RUN go install github.com/elwinar/rambler@latest

# actual container set up
FROM alpine:3.15
RUN apk update

# mysql
RUN apk add --no-cache postgresql-client

# rambler
COPY --from=rambler_builder /go/bin/rambler /usr/local/bin
COPY . .

# after set up is done, set RAMBLER envs and apply all migrations
CMD env | grep RAMBLER && ./apply-all.sh