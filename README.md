# Cached Redux

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Concepts
This stores fetch requests in a keyed object, where each key is a query string. This effectively enables a short-term cache in Redux, which can refresh data (with a toggled loading state) without removing previously fetched data. 

When toggling between pages in the UI, the data for each page is retained. 

```typescript
const stateExample = {
  resultsByQuery: {
    'page=1&limit=10': {
      /**
       * Each query string/path has its own loading state
       */
      loading: false,
      data: {
        results: [
          {
            id: 1,
            name: 'Luke'
          },
          {
            id: 2,
            name: 'Leia'
          }
        ]  
      }
    }
  }
}
```

## Install and run
```
$ git clone git@github.com:lastoftype/cached-redux.git
$ cd cached-redux
$ npm i
$ npm run start
```