#!/bin/bash
set -euo pipefail
cd /workspace

if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi

npm run dev > /tmp/kod-yulia-dev.log 2>&1 &
disown

for i in $(seq 1 40); do
  if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
    exit 0
  fi
  sleep 0.4
done

exit 0
