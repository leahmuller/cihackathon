#!/bin/bash

aws cognito-idp admin-confirm-sign-up \
  --region us-east-2 \
  --user-pool-id us-east-2_CqPRRaFmB \ # Amazon generated Pool Id
  --username admin@example.com