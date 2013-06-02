#!/bin/sh

curl -X POST -H "Content-Type: application/json" \
  -d '{"data":"xyz","password":"xyz"}' \
  http://localhost:9090/paris/api/poi