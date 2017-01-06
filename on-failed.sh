#!/usr/bin/env bash

set -e

echo "Failed with filename $FAILED_FILENAME"
npm run failed-test -- $FAILED_FILENAME
