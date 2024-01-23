# Fun Token User Authentication Microservice

This repository contains a simple Node.js microservice for user authentication and Mocha API tests for it's endpoints. The microservice provides two main endpoints: `/signup` for user registration and `/login` for user login. It is containerized using Docker for easy deployment.
I am no devops engineer, but it was a bit odd to me that there are two separate Docker files mentioned in the pdf document. 
So my assumption is that the docker image for the microservice is being deployed on it's own and so are the tests deployed on their own. So this is my approach to the solution with two Docker images, it's a bit simplified in this example, but here is it.


## Prerequisites

Before running the microservice, make sure you have the following installed on your system:

- Docker
- Node.js (if you want to run the microservice locally)

## Getting Started

Follow the steps below to set up and run the Fun Token User Authentication Microservice.

1. Create a Docker network for the microservice:

   ```bash
        docker network create fun-token-net
2. Build the Docker image for the microservice:

    ```bash
        docker build -t fun-token-task .
3. Run the microservice container with the following command:

    ```bash
        docker run --name fun-token-service --env-file ./.env --network fun-token-net -p 4007:4007 -it fun-token-task
4. Build the Docker image for running tests:

    ```bash
        docker build -f ./tests_run/Dockerfile -t fun-token-task-tests .
5. Run the tests for the microservice using the following command:

    ```bash
        docker run --name fun-token-tests --env-file ./.env --network fun-token-net -it fun-token-task-tests
## API Endpoints

The Fun Token User Authentication Microservice provides the following API endpoints:

### User Signup

- **Endpoint:** `/signup`
- **Method:** POST
- **Description:** Register a new user.
- **Request Body:**
    ```json
    {
    "username": "your_username",
    "password": "your_password"
    }
- **Responses:**
    - **201 Created:** User registered successfully.
    - **422 Unprocessable entity:** Invalid data provided.
    - **500 Internal Server Error:** Server error.

### User Login

- **Endpoint:** `/login`
- **Method:** POST
- **Description:** Log in an existing user.
- **Request Body:**
    ```json
    {
        "username": "your_username",
        "password": "your_password"
    }
- **Responses:**
    - **200 Created:** User logged in successfully. Returns an authentication token.
    - **401 Unauthorized:** Invalid credentials.
    - **500 Internal Server Error:** Server error.

## Conclusion

You have successfully set up and run the Fun Token User Authentication Microservice. You can now use the provided API endpoints for user registration and login. If you encounter any issues or have questions, please do not hesitate to contact the author Ivan Babic
