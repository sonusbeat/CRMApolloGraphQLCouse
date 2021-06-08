# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository.

## Create new token
```
mutation authenticateUser($input: AthenticateInput) {
  authenticateUser(input: $input) {
    token
  }
}
```

```
{
  "input": {
    "email": "qbixmex@gmail.com",
    "password": "secretodivino"
  }
}
```