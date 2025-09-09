# Address API Spec
## Creade Address API
Endpoint : POST api/contacts/:contactId/address

Header :
- Authorization : token

Request Body :

``` json 
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode POS",
}
```

Response Body Success:

``` json 
{
    "data": {
        "id" : 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode POS",
    }
}
```

Response Body Error:

``` json 
{
    "errors": "Country is required"
}
```


## Update Address API
Endpoint : PUT api/contacts/:contactId/address/:addressId

Header :
- Authorization : token

``` json 
{
    "street": "Jalan apa",
    "city": "Kota apa",
    "province": "Provinsi apa",
    "country": "Negara apa",
    "postal_code": "Kode POS",
}
```

Response Body Success:

``` json 
{
    "data": {
        "id" : 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode POS",
    }
}
```

Response Body Error:

``` json 
{
    "errors": "Country is required"
}
```

## Get Address API
Endpoint : Get api/contacts/:contactId/address/:addressId

Header :
- Authorization : token

Response Body Success:

``` json 
{
    "data": {
        "id" : 1,
        "street": "Jalan apa",
        "city": "Kota apa",
        "province": "Provinsi apa",
        "country": "Negara apa",
        "postal_code": "Kode POS",
    }
}
```

Response Body Error:

``` json 
{
    "errors": "Contact is not found"
}
```

## List Address API
Endpoint : GET api/contacts/:contactId/address

Header :
- Authorization : token

Response Body Success:

``` json 
{
    "data": [
        {
            "id" : 1,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode POS",
        },
        {
            "id" : 2,
            "street": "Jalan apa",
            "city": "Kota apa",
            "province": "Provinsi apa",
            "country": "Negara apa",
            "postal_code": "Kode POS",
        },
    ]
}
```

Response Body Error:

``` json 
{
    "errors": "Contact is not found"
}
```

## Remove Address API
Endpoint : POST api/contacts/:contactId/address/:addressId

Header :
- Authorization : token

Response Body Success:

``` json 
{
    "data": "Ok"
}
```

Response Body Error:

``` json 
{
    "errors": "Contact is not found"
}
```