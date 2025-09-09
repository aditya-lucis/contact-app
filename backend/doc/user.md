# User API Spec

# Register User API Spec
Endpoint: POST /api/user

Request Body :

``` json 
{
    "username": "alc",
    "paswword": "sA1910170!",
    "name": "Aditya Lucis Caelum"
} 
```

Response Body Success :

``` json 
{
    "data": {
        "username": "alc",
        "name": "Aditya Lucis Caelum"
    },
} 
```

Response Body Error :

``` json 
{
    "Errors": "username already registred"
} 
```

# Login User API Spec

Endpoint: POST /api/user/login

Request Body :

``` json 
{
    "username": "alc",
    "paswword": "sA1910170!",
} 
```

Response Body Success :

``` json 
{
    "data": {
        "token": "unique-token",
    },
} 
```

Response Body Error :

``` json 
{
    "Errors": "username or password are wrong"
} 
```

# Update User API Spec

Endpoint: PATCH /api/users/current

Headers :
- Authorization : token 

Request Body :

``` json 
{
    "paswword": "newPassword", // optional
    "name": "Marquis Aditya Lucis Caelum" // optional
} 
```

Response Body Success :

``` json 
{
    "data": {
        "username": "alc",
        "name": "Marquis Aditya Lucis Caelum"
    },
} 
```

Response Body Error :

``` json 
{
    "Errors": "Name length max 100"
} 
```

# Get User API Spec

Endpoint: GET /api/users/current

Headers :
- Authorization : token 

Response Body Success :

``` json 
{
    "data": {
        "username": "alc",
        "name": "Marquis Aditya Lucis Caelum"
    },
} 
```

Response Body Error :

``` json 
{
    "Errors": "Unauthorized"
} 
```

# Logout User API Spec

Endpoint: DELETE /api/users/logout

Headers :
- Authorization : token 

Response Body Success :

``` json 
{
    "data": "Ok"
} 
```

Response Body Error :

``` json 
{
    "Errors": "Unauthorized"
} 
```