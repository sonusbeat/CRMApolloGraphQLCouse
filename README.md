# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository, with NextJs, Apollo and GraphQL.

## Clients

### Create Client

#### Main Editor
```
mutation newClient($input: ClientInput) {
  newClient(input: $input) {
    first_name
    last_name
    company
    phone
    email
  }
}
```

#### Query Variables
```
{
  "input": {
   	"first_name": "Juan",
    "last_name": "Robles Treviño",
    "company": "Servicios Profesionales S.A de C.V",
    "phone": "111 222 3333",
    "email": "juan@noewhere.com"
	}
}
```

#### HTTP Headers
```
{
  "authorization": "eyJhbGciOiJIUz ..." <-- token
}
```

### Get Clients

#### Main Editor
```
query getClients {
  getClients {
    id
    first_name
    last_name
    email
    phone
    company
    created_at
  }
}
```

#### Main Editor

```
query getSellerClients {
  getSellerClients {
    id
    first_name
    last_name
    email
    phone
    company
    created_at
    seller
  }
}
```

#### HTTP Headers

```
{
  "authorization": "eyJhbGciOiJIUzI1 ..." <-- token
}
```

### Get Client

#### Main Editor
```
query getClient($id: ID!) {
  getClient(id: $id) {
    id
    first_name
    last_name
    email
    phone
    company
    created_at
    seller
  }
}
```

#### Query Variables
```
{
  "id": "60bef5ed1ff0007f7675c4ba"
}
```

#### HTTP Headers

```
{
  "authorization": "eyJhbGciOiJIUzI1 ..." <-- token
}
```