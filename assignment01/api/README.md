# A testing assignment nodejs development

## Prerequisite Setup

- Get PostgreSql Install
- run the script to create devadmin user at "\db-postgresql\1-create-user.txt"
- run the script to create database with devadmin ad owner at "\db-postgresql\2-create-database.txt"

## Start

start the api:

### `node server.js`

Runs the app in the development mode.\
Open [http://localhost:8090].

Ctrl+C to stop the system and rerun again if you make edits.

## API Functions

### Auth

- post: "/api/auth/signup"
- post: "/api/auth/signin"

### User

- get "/api/test/all"
- get "/api/test/user"
- get "/api/test/mod"
- get "/api/test/admin"

### Employee

- get "/api/test/employee",
- get "/api/test/allemployee"
- get "/api/test/employeegrp1"
- get "/api/test/employeegrp2"
- post "/api/test/employeefilter"
- post "/api/test/employeesalarybydept"
- post "/api/test/employeecountbymonth"
