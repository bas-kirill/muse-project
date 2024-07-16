#!/bin/sh

# Abort on any error (including if wait-for-it fails).
set -e

/app/wait-for-it.sh postgres:5432 --timeout=60

# Run the main container command.
exec "$@"
