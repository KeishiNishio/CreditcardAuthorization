# Payment Processing Application

---

## Overview

This repository hosts a web application for payment processing, combining a React frontend with a Flask backend. Users can input their ID, card expiration date, and payment amount in a form and send an authorization request. Upon approval, a confirmation button is displayed, finalizing and charging the payment amount. The system also includes features to check available credit and billed amounts, aimed at better understanding the credit card payment process, which, despite its frequent use in daily life, remains complex and obscure to many. This implementation focuses on the authorization process, validating transaction legitimacy and credit card approval. By understanding these steps, one gains insights into security and transaction efficiency. Additionally, Docker is utilized for system construction, offering a hands-on learning experience with container technology.

### **About Authorization**

In simple terms, the authorization process checks if a credit card can be used, following these steps:

1. **At Purchase**: The user buys products or services at a merchant and considers credit card payment.
2. **Authorization Request**: The merchant sends the customer's credit card information and purchase amount to the credit card company for authorization.
3. **Approval Process**: The credit card company checks the card's validity, expiration, and credit limit to decide on the transaction's legitimacy.
4. **Authorization Response**: If approved, an authorization code is sent to the merchant. If denied, reasons are provided.
    1. This implementation focuses on checking:
        1. **Credit card validity (correct ID number)**
        2. **Non-expiration**
        3. **Credit limit overruns**
5. **Settlement**: Upon approval, the merchant finalizes the amount, notifies the credit card company, and the final billing to the user occurs (updated in the next month's bill).

## Technology Stack

- Frontend: React (JavaScript)
- Backend: Flask (Python)
- Other Technologies: Docker (& Docker Compose), Nginx (for reverse proxy)

![System Architecture Diagram](https://github.com/KeishiNishio/CreditcardAuthorization/blob/master/system_image.png)

System Architecture Diagram

## Features

- Sending payment information
- Approval and confirmation of payments
- Checking available and billed amounts

## Directory Structure

The system consists of three main servers: backend, frontend, and nginx, each with its respective directory.

1. Backend
   - Dockerfile: Builds the Docker image for the backend application.
   - app.py: Python script using Flask for the backend application.
   - requirements.txt: List of Python package dependencies.
2. Frontend
   - build/: Contains static files generated from **`npm run build`**.
   - node_modules/: Directory for installed project dependencies.
   - public/index.html: Entry point HTML file for the application.
   - src/: Contains React (JavaScript) source code, including `App.js`, `index.js`, `index.css`.
   - Dockerfile: Configuration file to build the Docker image for the frontend.
   - package-lock.json and package.json: Define project dependencies and scripts.
3. Nginx
   - default.conf: Nginx configuration file for reverse proxy settings.
4. Docker Compose File
   - Orchestration file.
5. Other Files:
   - composition.txt: File structure diagram.

## Setup Instructions

1. Clone the repository:

```bash
git clone <https://github.com/your-username/your-repository-name.git>
```

2. Create a Docker network:

```bash
docker network create nginx-network
```

3. Move to the frontend directory:

```bash
cd frontend
```

4. Install frontend dependencies in the frontend directory:

```bash
npm install
```

5. Set Node.js TLS (Transport Layer Security) cryptographic library related configurations:

```bash
export NODE_OPTIONS=--openssl-legacy-provider
```

6. Build the application (inside frontend directory):

```bash
npm run build
```

7. Move to the upper directory:

```bash
cd ..
```

8. Launch services using Docker Compose in the project's root directory:

```bash
docker-compose build --no-cache
docker-compose up -d
```

9. Access the application by navigating to `http://localhost` in a browser.

## Useful Commands

Delete all Docker cache system-wide:

```bash
docker system prune --all --force
```

Check containers in the configured network:

```bash
docker network inspect nginx-network
```

Check container status:

```bash
docker ps -a
```

Stop all existing containers:

```bash
docker stop $(docker ps -aq) || true
```

Remove all existing containers:

```bash
docker rm -f $(docker ps -aq) || true
```

## Development Environment

This project is developed in the following environment:

- **Operating System**: macOS
- **Docker**:
  - Version: 24.0.5
- **Docker Compose**:
  - Version: 2.23.3

References

System Construction:
[Building a Simple Development Environment Using Docker, React, Python, and FastAPI with Reverse Proxy](https://cloudsmith.co.jp/blog/virtualhost/docker/2022/12/2241971.html)

Credit Card Payment:
[Saison Card - Credit Card Payment Process](https://www.saisoncard.co.jp/credictionary/knowledge/article045.html)
[YouTube - Credit Card Payment Explained](https://www.youtube.com/watch?v=rVrM8S7Rfdk)
