---
slug: "/tech-notes/redux-apis"
date: "2020-11-01"
title: "Redux state APIs"
summary: "Cool trick that you can start using on your Redux projects."
---

This past week I had an interesting challenge, take some regular methods, called APIs, that relied on state values to make request. Those methods used to just go straight to the store observable and do a `getState()` to access the latest state of redux (but, would they?).

Since I was in a saga of removing all direct access to state through store observable, I had to find a way to deal with such methods. It's kind strange to realise that those kind of files would make sense, since:
- If you'r full down on redux, then, the place to do requests would be the middlewares, in our case, sagas;
- If you have your requests isolated in there, there is no reason to have yet another abstraction called API;
- If you'r relying on state for those calls, you should be using middlewares.

But, as React evolved and Redux too, there are pieces of the state, specially in such massive apps like ours, that should not be stored in the global state and could, or even must, be stored in the local state in a short lived memory. So, in order to keep the APIs centralised in a single place, we came up with those API files.

So, I had to come up with a solution to remove the direct access AND that could be used both, in sagas and in components, tricky.

And then it hit me, S E L E C T O R S :)

With them I could simply access the API in Components with mapStateToProps and do a yield select in sagas. 

So, I created the so called `APIgenerator` methods, that would accept the state as input and, using createSelector to have some memoization, read all pieces of the state that the API relied on and return in the final method an object containing methods to be called inside of the consumer, something like this:

## Code Example

### Generator:
```javascript
import { createSelector } from 'reselect';

export default createSelector(
    state => state.module.pieceOne,
    state => state.module.pieceTwo,
    state => state.moduleA.pieceOne,
    function api(pieceOne, pieceTwo, ApieceOne) {
      return ({
         fetchData: function() {
           return axios.get({
             url,
             payload: { pieceOne, pieceTwo }
           });
         },
        fetchHistoricalData: function(startDate) {
          return axios.get({
            url,
            payload: { pieceOne, ApieceOne, startDate }
          });
        }
    }
);
```

### Saga
```javascript
import { select, put } from 'redux-sagas/effects';
import { requestType, success } from './actions';
import apiGenerator from './apiGenerator';

function* fetchGlobalData({
payload: { startDate } }) {
  const api = yield select(apiGenerator);
  
  const response = yield api.fetchHistoricalData(startDate);
  
  yield put success(response);
}

return yield all([
  takeLatest(requestType, fetchGlobalData);
])
```

### Component
```jsx
import React from 'react';
import { connect } from 'react-redux';
import apiGenerator from './apiGenerator';

function ComponentAPI({
  api
}) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.fetchData().then(setData);
  }, []);
  
  return (loading ? 'Loading data...' : <DataComponent data={data} />);
}

export default connect(state => ({ api: apiGenerator(state) }))(ComponentAPI);
```

https://gist.github.com/FrancoSirena/94f956b9c4a2e1c380d2919b3c01c622

:)

OBS: If your methods depend on different chunks of the state you could expose as many selector as you want to, having the final method return another function to be called in the Component, such as, `(stateChunk) => () => fecth`.

I tend to keep most of my state under a context or even in the component itself, but, there are ton of situations that we may need to store it in redux and even though react APIs are getting better and better, redux is one hell of a powerful pkg.

So, don't doom redux, use it carefully and most of all, know how to use it and how to take advantage of it