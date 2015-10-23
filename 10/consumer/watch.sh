#!/usr/bin/env bash

while true; do
  exec "$@" &
  change=$(inotifywait -e close_write,moved_to,create .)
  echo "$!";
  kill -9 "$!"
done
