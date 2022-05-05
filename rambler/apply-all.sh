#!/bin/sh

MAX_RETRIES=30

printf "Waiting for db connection"
until psql postgres://$RAMBLER_USER:$RAMBLER_PASSWORD@$RAMBLER_HOST:$RAMBLER_PORT/$RAMBLER_DATABASE || [ $MAX_RETRIES == 0 ]; do
  MAX_RETRIES=$(($MAX_RETRIES-1))
  sleep 1
done

if [ $MAX_RETRIES == 0 ]; then
  echo "Couldn't connect to db"
  exit 1
fi

rambler --debug apply -a
