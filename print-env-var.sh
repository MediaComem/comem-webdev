#!/bin/bash

name=$1
if test -z "$name"; then
  >&2 echo "The first argument must be the name of an environment variable to print"
  exit 1
fi

value=${!name}
test -n "$value" && echo "The value of \$$name is $value" || echo "\$$name is not set"