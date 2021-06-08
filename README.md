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
### Get Products

#### Main Editor

```
query getProducts {
  getProducts {
    id
    name
    stock
    price
    created_at
  }
}
```

### Get Product

#### Main Editor
```
query getProduct($id: ID!) {
  getProduct(id: $id) {
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
  "id": "60bedaeb10d2b15befee4ad7"
}
```

### Update Product

#### Main Editor
```
mutation updateProduct($id: ID!, $input: ProductInput) {
   updateProduct(id: $id, input: $input) {
    id
    name
    price
    stock
    created_at
  }
}
```

#### Query Variables
```
{
  "id": "60bedaeb10d2b15befee4ad7",
  "input": {
    "name": "Smart Phone",
    "stock": 14,
    "price": 395.90
  }
}
```