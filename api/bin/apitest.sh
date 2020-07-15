#!/bin/bash

npx aws-api-gateway-cli-test \
--username='admin@example.com' \
--password='Passw0rd!' \
--user-pool-id='us-east-2_CqPRRaFmB' \
--app-client-id='5kmoegbeh8porgj9jo21cnvkmu' \
--cognito-region='us-east-2' \
--identity-pool-id='us-east-2:1b9706cc-28ce-478e-ac59-66cb1bf9ee49' \
--invoke-url='https://iyfp4i0lad.execute-api.us-east-2.amazonaws.com/dev' \
--api-gateway-region='us-east-2' \
--path-template='/algorithms' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'
