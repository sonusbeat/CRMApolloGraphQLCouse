# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository, with NextJs, Apollo and GraphQL.

## Advanced Searching

### Best Clients

#### Main Editor

```
query bestClients {
  bestClients {  
  	client {
      first_name
      last_name
      company
    }
    total
  }
}
```

### Best Sellers

#### Main Editor

```
query bestSellers {
  bestSellers {  
  	seller {
      first_name
      last_name
    }
    total
  }
}
```

### Searching Products

#### Main Editor

```
query searchProduct($text: String!) {
  searchProduct(text: $text) {
    name
    stock
    price
  }
}
```

#### Query Variables

```
{
  "text": "Inches"
}
```