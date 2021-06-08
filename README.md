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
