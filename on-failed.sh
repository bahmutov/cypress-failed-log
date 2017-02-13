#!/usr/bin/env bash

set -e

# echo "Failed with filename $FAILED_FILENAME"
npm run -s failed-test -- $FAILED_FILENAME
