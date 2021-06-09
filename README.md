# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository, with NextJs, Apollo and GraphQL.

## Orders

### New Order

#### Main Editor
```
mutation newOrder($input: OrderInput) {
  newOrder(input: $input) {
    id
    order {
      id
      quantity
    }
    total
    client
    seller
    created_at
    status
  }
}
```

#### Query Variables
```
{
  "input": {
		"order": [
      {
        "id": "60bedaeb10d2b15befee4ad7",
        "quantity": 1
      },
      {
        "id": "80bydaeb90w2b15befey4bd5",
        "quantity": 2
      },
    ],
    "total": 125.95,
    "client": "60bf024acf9d0a8d28887c5a"
  }
}
```

#### HTTP Headers
```
{
  "authorization": "eyJhbGciOiJIUzI1NiI ..."
}
```

### Get Orders

#### Main Editor
```
query getOrders {
  getOrders {
    id
    order {
      id
      quantity
    }
    total
    client
    seller
    created_at
    status
  }
}
```

#### HTTP Headers
```
{
  "authorization": "eyJhbGciOiJIUzI1NiI ..."
}
```

### Get Seller Orders

#### Main Editor

```
query getSellerOrders {
  getSellerOrders {
    id
    order {
      id
      quantity
    }
    total
    client
    seller
    created_at
    status
  }
}
```

#### HTTP Headers

```
{
  "authorization": "eyJhbGciOiJIUzI1NiI ..."
}
```
### Get Seller Order

#### Main Editor
```
query getOrder($id: ID!) {
  getOrder(id: $id) {
    id
     order {
        id
        quantity
      }
      total
      client
      seller
      created_at
      status
  }
}
```

#### Query Variables

```
{
  "id": "60c04f07ecbe403fba8551c4"
}
```

#### HTTP Headers

```
{
  "authorization": "eyJhbGciOiJIUzI1NiI ..."
}
```

### Update Order

#### Main Editor

```
mutation updateOrder( $id: ID!, $input: OrderInput ) {
	updateOrder( id: $id, input: $input ) {
    id
    order {
      id
      quantity
    }
    total
    client
    seller
    created_at
    status
  }
}
```

#### Query Variables

```
{
  "id": "60c04f07ecbe403fba8551c4",
  "input": {
    "client": "60bef944070d9f8375c39905",
    "status": "PENDING"
  }
}
```

#### HTTP Headers

```
{
  "authorization": "eyJhbGciOiJIUzI1NiI ..."
}
```