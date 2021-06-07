# React, Apollo, GraphQL Course

This is a Udemy course tutorial repository.

## Playground

### First Editor
```
query getCourses($input: CourseInput!) {
  getCourses( input: $input ) {
    title
  }
}
```

### Query Variables

```
{
  "input": {
    "technology": "Javascript"
  }
}
```