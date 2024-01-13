# Project Name: Learning Flashcard

## Project Information

- **Genre:** Web Application
- **Link:** [Learning Flashcard Web App](https://main.d3oz3i0szmpke3.amplifyapp.com/)
- **Language:** Javascript

## Project Details

- **Purpose:** Educational purpose
- **Target Audience:** Computer Science Students
- **Hosting:** AWS

## Tech Stack

- **Storage:** AWS S3
- **Hosting:** AWS Amplify
- **Database:** AWS DynamoDB
- **Authentication:** AWS Cognito
- **API Gateway:**
  - AWS API Gateway
  - AWS Lambda

## Project Description

The Learning Flashcard project was built for educational purposes, aiming to explore the microservice architecture with services such as the user service, database service (containing flashcard content, questions, creator information), and storage service.

The frontend application communicates with serverless services through APIs, which are managed via the AWS API Gateway for centralized endpoints. This architecture allows developers to take advantage of server provisioning, maintenance, scaling, and cost-effectiveness, making it suitable for small-scale applications.

Authentication in the application is handled by the third-party service AWS Cognito. Cognito manages the authentication process, user data, and API tokens.

The primary database used in the application is the NoSQL database AWS DynamoDB. Additionally, AWS S3 is employed as the main storage for images and logos within the project.

