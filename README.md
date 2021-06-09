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
  "authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYmRiMTY2OWQzNDliMjdmZDlkNjZkMyIsImVtYWlsIjoiam9obmRvZUBnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImlhdCI6MTYyMzIxNjEwOSwiZXhwIjoxNjIzMjIzMzA5fQ.J5ZMUxf5GhmMU45Z8Or1VAMBiRXEowSKgxD4ubJZRSo"
}
```