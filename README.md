# Roman Numeral Converter

This project is a coding challenge for Adobe & GenStudio for Performance Marketing Engineering Test. It includes a backend service for converting integers to Roman numerals and a frontend React application for interacting with the API.

## Table of Contents
- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Specification](#api-specification)
- [Testing](#testing)
- [Error Handling](#error-handling)
- [DevOps Considerations](#devops-considerations)
- [Dockerization](#dockerization)
- [Justification for Chosen Technologies](#justification-for-chosen-technologies)
- [Future Enhancements](#future-enhancements)

## Overview
The Roman Numeral Converter project consists of:
1. A **REST API** built with Express.js that converts numbers (1-3999) into Roman numerals.
2. A **React frontend** that allows users to input a number and receive the corresponding Roman numeral.

## Technologies Used
- **Backend:** Node.js, Express.js, Winston (for logging)
- **Frontend:** React, TypeScript, Tailwind CSS
- **Testing:** Vitest, React Testing Library, Supertest (unit tests)
- **DevOps:** Docker (containerization), basic logging/monitoring

## Backend Setup
### Prerequisites
- Node.js (>= 20.x)
- npm 

### Installation
```sh
cd roman-numeral-api
npm install
```

### Running the Server
```sh
npm run dev
```
The server will start on `http://localhost:8080`.

### Running Tests
```sh
npm run test
```
You may alse generate a coverage report with:
```sh
npm run test:coverage
```

## Frontend Setup
### Prerequisites
- Node.js (>= 16.x)
- npm 

### Installation
```sh
cd roman-numeral-frontend
npm install
```

### Running the React App
```sh
npm run dev
```
The app will be available at `http://localhost:5173`.

### Running Tests
```sh
npm run test
```
You may alse generate a coverage report with:
```sh
npm run test:coverage
```

## API Specification
### Endpoint
```
GET /romannumeral?query={integer}
```
### Example Request
```
GET http://localhost:8080/romannumeral?query=10
```
### Example Response
```json
{
  "input": "10",
  "output": "X"
}
```
### Error Handling
If the input is invalid, the API returns an error message in plain text with a 400 status code.

## Error Handling
- Validates input to ensure numbers are within range (1-3999).
- Returns appropriate HTTP status codes for errors.
- Logs errors using Winston.

## DevOps Considerations
- Basic logging using Winston.
- Containerized with Docker for easy deployment.
- Future enhancements could include metrics and monitoring solutions.

## Dockerization
### Building the Docker Image
```sh
cd roman-numeral-api
docker build -t roman-numeral-api .
```
### Running the Container
```sh
docker run --name roman-numeral -d -p 8080:8080 --env-file .env roman-numeral-api
```

## Justification for Chosen Technologies
- **Express.js**: Lightweight, easy to set up.
- **React + TypeScript**: Strong typing improves maintainability and runtime safety.
- **Tailwind CSS**: Quick and professional styles for the UI with minimal set up.
- **Winston**: Simple, effective logging.

## Future Enhancements
- Add rate limiting to prevent abuse.
- Enhance monitoring with Prometheus/Grafana.
- Deploy to a cloud provider (AWS/GCP) with CI/CD.

---
This project follows best practices in software development, including clean code, proper error handling, and containerization for deployment.


