# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository.

## Playground

### Sending input to console
```
mutation newUser($input: UserInput) {
  newUser(input:$input)
}
```

### Create New User
```
mutation newUser($input: UserInput) {
  newUser(input: $input) {
    id
    first_name
    last_name
    email
  }
}
```

### Query Variables
```
{
  "input": {
    "first_name": "Daniel",
    "last_name": "González",
    "email": "qbixmex@gmail.com",
    "password": "secretodivino"
  }
}
```