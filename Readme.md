# PixelVision Task

## Tech Stack

-   Nodejs
-   Express
-   Mongoose
-   JWT

## Run in local

`npm install`

### Update DB Credentials

`app/config/dbConnection.js`

### run

`nodemon server.js`


run at
`http://localhost:3001`

## API's

### Registration API

    /users

Method: `POST`

#### Request Body

    {
        "name": String,
        "email": String,
        "password": String
    }

### Response

    {
        "status": boolean,
        "message": String
    }

### Login API

    /users/login

Method: `POST`

#### Request Body

    {
        "email": String,
        "password": String
    }

### Response

    {
        "status": boolean,
        "message": String,
        "data": {
                "id": number,
                "name": String,
                "email": String,
                "token": String
            }
    }

### Get Day API

    /calender/day?date={date}

Method: `GET`

- `date` formate should be `YYYY-MM-DD` or `MM-DD-YYYY` or `MM/DD/YYYY`

#### Header

    Authorization: Bearer {token}

### Response

    {
        "status": boolean,
        "message": String,
        "data": {
             "day": String
            }
    }
