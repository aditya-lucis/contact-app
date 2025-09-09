# Contact API Spec

## Create API Spec
Endpoint : POST api/contacts

Header :
- Authorization : token

Request Body :

``` json 
{
    "firstName": "Aditya",
    "lastName": "Lucis",
    "email": "adityalucis.caelum@tenebris.com",
    "phone": "08232323232",
} 
```

Response Body Success :

``` json 
{
    "id" : 1,
    "firstName": "Aditya",
    "lastName": "Lucis",
    "email": "adityalucis.caelum@tenebris.com",
    "phone": "08232323232",
} 
```
 
Response Body Error :

``` json
{
    "errors" : "Email is not valid format"
}
 ```

## Update API Spec
Endpoint : PUT api/contacts

Header :
- Authorization : token

Request Body :

``` json 
{
    "firstName": "Aditya",
    "lastName": "Lucis",
    "email": "adityalucis.caelum@tenebris.com",
    "phone": "08232323232",
} 
```

Response Body Success :

``` json 
{
    "id" : 1,
    "firstName": "Aditya",
    "lastName": "Lucis",
    "email": "adityalucis.caelum@tenebris.com",
    "phone": "08232323232",
} 
```
 
Response Body Error :

``` json
{
    "errors" : "Email is not valid format"
}
 ```

## Get API Spec
Endpoint : GET api/contacts/:id

Header :
- Authorization : token

Response Body Success :

``` json 
{
    "id" : 1,
    "firstName": "Aditya",
    "lastName": "Lucis",
    "email": "adityalucis.caelum@tenebris.com",
    "phone": "08232323232",
} 
```

Response Body Error :

``` json
{
    "errors" : "Contact is not found"
}
 ```


## Search API Spec
Endpoint : GET api/contacts/

Header :
- Authorization : token

Query params :
- name : Search by firstName or lastName, using like, optional
- email : Search by email, using like, optional
- phone : Search by phone, using like, optional
- page : number of page, default 1
- size : number of size, default 10

Reponse Body Success :

``` json
{
    "data" : [
        {
            "id" : 1,
            "firstName": "Aditya",
            "lastName": "Lucis",
            "email": "adityalucis.caelum@tenebris.com",
            "phone": "08232323232",
        },
        {
            "id" : 2,
            "firstName": "Aditya",
            "lastName": "Lucis",
            "email": "adityalucis.caelum@tenebris.com",
            "phone": "08232323232",
        },
    ],
    "paging" : {
        "page" : 1,
        "total_page": 3,
        "total_item": 30
    }
}
 ```

Reponse Body Error :

## Remove API Spec
Endpoint : DELETE api/contacts/:id

Header :
- Authorization : token

Reponse Body Success :

``` json
{
    "errors" : "Ok"
}
 ```

Response Body Error :

``` json
{
    "errors" : "Contact is not found"
}
 ```