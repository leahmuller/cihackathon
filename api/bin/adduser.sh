#!/bin/sh

aws cognito-idp sign-up \
  --region us-east-2 \
  --client-id 6tpi3q7upaeampeptchilmjv8e \
  --username admin@example.com \
  --password Passw0rd! \
  --user-attributes "Name=name,Value=Admin"
