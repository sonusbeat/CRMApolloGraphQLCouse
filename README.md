# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository, with NextJs, Apollo and GraphQL.

## Create new token

### Main Editor
```
mutation authenticateUser($input: AthenticateInput) {
  authenticateUser(input: $input) {
    token
  }
}
```

### Query Variables

```
{
  "input": {
    "email": "qbixmex@gmail.com",
    "password": "secretodivino"
  }
}
```

## Get User

### Main Editor
```
query getUser($token: String!) {
  getUser(token: $token) {
    id
  }
}
```

### Query Variables

```
{
  "token": "eyJhbGciOi ..."
}
```
## Products

### Create Product

#### Main Editor
```
mutation newProduct($input: ProductInput) {
  newProduct(input: $input) {
    id
    name
    stock
    price
    created_at
  }
}
```

#### Query Variables

```
{
  "input": {
    "name": "Product Name",
    "stock": 10,
    "price": 0.00
  }
}
```