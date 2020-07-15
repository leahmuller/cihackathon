# Serverless Starter for CI Hackathon

This directory contains serveless configuration and functions for the CI Hackathon backend.

### libs
Libraries for NodeJS serverless Lambda functions for working with S3, DynamoDB, Cognito, etc...

### mocks
Mock JSON files for testing Lambda functions.

### resources
Contains configuration files for AWS resources.


## Deploy a Single Function

There are going to be cases where you might want to deploy just a single API endpoint as opposed to all of them. The serverless deploy function command deploys an individual function without going through the entire deployment cycle. This is a much faster way of deploying the changes we make.

For example, to deploy the list function again, we can run the following.

`$ serverless deploy function -f FUNCTION_NAME`

### AWS Configuration

#### Region
us-east-2

#### Identity pool ID
1b9706cc-28ce-478e-ac59-66cb1bf9ee49

#### API Gateway ID
iyfp4i0lad
