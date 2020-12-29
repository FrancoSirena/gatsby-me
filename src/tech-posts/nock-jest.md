---
slug: "/tech-notes/nock-jest"
date: "2020-12-15"
title: "Getting Jest + Nock under control"
summary: "A very detailed example on why you may find issues and how to tackle them."
---
This is just a short tale on how I fixed some of the memory leaking issues we can face with Jest and Nock, which is kind of an explosive combination when it gets to the memory heap.  

I will briefly talk about `Jest` and `Nock` and then I'll dive on what the problem was and how I got around with it.  
## Jest
As many of you know `Jest` is our favourite test runner when it involves a `Javascript` environment, it is super simple to set up and it has a lot of capabilities built into it which makes it super easy to extend and go crazy when running tests.

It is the test runner to use when it comes to FE projects, no doubt, it has a large community and their project and very well maintained. [Check their github](https://github.com/facebook/jest)

One thing that is true when it comes to `Jest` is that it is **too easy** to mock modules and do whatever hell we want to do with its implementation, the mocking capabilities we have with `Jest` are just awesome, which does make it simple to test external code or mock external API calls. [Mock Modules](https://jestjs.io/docs/en/jest-object#mock-modules)

Now, with that in mind, we could potentially write tests without needing to mock a server, we could just create a `module` that makes the API calls for us and we could easily mock it, so we could registry endpoints and return static values to make our assertions.

That works.

But, of course, that would be a naive approach for some scenarios. when we have multiple API calls in the same component, fetching from here and there, using different arguments in each call, I mean we could end up with a very complex mock handler there.

That is when packages like `Nock` come into play, they offer all those capabilities that a server would have when it gets to mapping APIs.
## Nock
Nock is another beautifully written package that gives all sort of capabilities when it comes to mocking APIs and faking workflows.[GitHub](https://github.com/nock/nock)

With `Nock` you can easily configure multiple API requests, with different types of body or headers or even mocking multiple servers at the same time in the same testing file, it is a super powerful mocking package.

What is super good about it is that you don't need to mock any of your code at all, you can let your code just run as is, just like it would in a normal browser, and you place this middleware which takes care of resolving all your API requests, you just tell how your API call is made and what it should respond with and **boom** everything just works.

Their package has a super simple to understand API and they offer quite a ton of debugging capabilities when it gets to understanding why your test is not doing what it was supposed to do.
## Jest + Nock  
Now that I briefly talked about each of those packages I am going to talk a bit on why this relationship can become problematic if you don't cherish it.

To make this even more real, I am going to give you a real use case.
Let's start with our component
```js

const API = {
  bands: "https://api.mocki.io/v1/1767b67d",
  songs: "https://api.mocki.io/v1/1db31e8e"
}

module.exports = () => {
  const div = document.createElement("div");
  const bands = document.createElement("ul");
  const songs = document.createElement("ul");
  div.innerHTML = "Listing bands and songs";

  document.body.appendChild(div);

  request(API.bands).then(
    ({ data = { results: [] } } = {}) => {
      for (const item of data.results) {
        const li = document.createElement("li");
        li.innerHTML = `Band: ${item.band} Genre ${item.genre}`;
        bands.append(li);
      }
      div.append(bands);
    }
  );

  delayCall(() => request(API.songs)).then(
    ({ data = { results: [] } } = {}) => {
      console.log('now I am done and the test is alive?', window.example && window.example.alive)
      if (!(window.example && window.example.alive)) return;
      for (const item of data.results) {
        const li = document.createElement("li");
        li.innerHTML = `Song: ${item.song} Band ${item.band}`;
        songs.append(li);
      }
      div.append(songs);
    }
  );
};
```

These are the `request` and `delayCall` methods
```js
const axios = require("axios");

async function delayCall(call) {
  return new Promise(r => setTimeout(() => r(call()), 300))
}

function request(url) {
  return axios({
    url,
    method: "GET",
  }).catch(e => {
    console.log(`something went wrong ${e}`)
  });
}
```

Now, with that in mind, let's write a very dummy test to check for the first the `bands`:

```js
/**
 * @jest-environment jsdom
 */
describe("component", () => {
  beforeAll(() => {
    window.example = {
      alive: true
    }
    axios.defaults.adapter = require('axios/lib/adapters/http');
    nock("https://api.mocki.io")
      .get("/v1/1767b67d")
      .reply(200, {
        results: [
          {
            band: "noisy",
            genre: "rock"
          }
        ]
      })
  });
  afterAll(async () => {
    window.example.alive = false

    await new Promise(r => setTimeout(r, 300))
  })
  test("it should list the bands and genres", async () => {
    component();
    expect(document.body.innerHTML).toMatch(/Listing bands and songs/i);
    await new Promise((r) => setTimeout(r, 100));
    expect(document.body.innerHTML).toMatch(/band: noisy genre rock/i);
  });
});
```

As we can see, we are awaiting *100ms*, just enough time for js to go on through the call stack and resolve the first API, after all that is all that we care, right?

Please, just take a moment get familiar with the example, where I am using the `window.example.alive` just to show how the API tries to render after we are done with the test.

### The result

Well, as we may expect our test will pass because it will match both things we are looking for.
But what we are missing here is that

1) we are not waiting for *all* requests to finish, leading to memory leaking
2) we are not cleaning ourselves after we are done, letting nock activate even after we are done with our test, more memory wasted.

This our log right now:
```
 PASS  src/tests/component-bad.test.js (67 MB heap size)
  ● Console

    console.log
      something went wrong Error: Nock: No match for request {
        "method": "GET",
        "url": "https://api.mocki.io/v1/1db31e8e",
        "headers": {
          "accept": "application/json, text/plain, */*",
          "user-agent": "axios/0.21.0"
        }
      }

      at axios.catch.e (src/component.js:12:13)

    console.log
      now I am done and the test is alive? false
```

As we can see the test succeeds but our Promise is throwing an *unmatched* warning there.

And we can see our promise finishing after the test is done, by checking the `test is alive? false` there.

### How to solve this?

Well, there a couple of things to do here:

- we *must* stop nock after our test is done, so Jest + Nock can live in harmony
- we can wait for all the APIs to finish and expect both results to be in there
- we can simply wait for all promises to end, without really expecting for non covered results

I am going with the second approach, which would it look like this
```js
describe("component", () => {
  let scope
  async function scopeDone() {
    if (!scope.isDone()) {
      await new Promise((r) => setTimeout(r, 100));
      return scopeDone()
    }
    return true
  }
  afterAll(() => {
    window.example.alive = false
    nock.cleanAll()
    nock.restore()
  })
  beforeAll(() => {
    window.example = {
      alive: true
    }
    axios.defaults.adapter = require('axios/lib/adapters/http');
    scope = nock("https://api.mocki.io")
      .get("/v1/1767b67d")
      .reply(200, {
        results: [
          {
            band: "noisy",
            genre: "rock"
          }
        ]
      })
      .get("/v1/1db31e8e")
      .reply(200, {
        results: [
          {
            band: "noisy",
            song: "the good one"
          }
        ]
      })
  });
  test("it should list the bands and genres", async () => {
    component();
    expect(document.body.innerHTML).toMatch(/Listing bands and songs/i);
    await new Promise((r) => setTimeout(r, 100));
    expect(document.body.innerHTML).toMatch(/band: noisy genre rock/i);
    await scopeDone()
    console.log('No problems')
  });
});
```

And the results are:

```
 PASS  src/tests/component-legit.test.js (56 MB heap size)
  ● Console

    console.log
      now I am done and the test is alive? true

      at delayCall.then (src/component.js:41:15)

    console.log
      true

      at scopeDone (src/tests/component-legit.test.js:15:13)

    console.log
      No problems

      at Object.test (src/tests/component-legit.test.js:54:13)
```

We can see that we don't have the unmatched anymore because we are mocking both APIs, *and* we don't have the update happening after the test finished because we are indeed waiting for everything to be done before finishing the test.

That way we avoid memory leaking between tests and making the `heap size` to bloat and eventually start causing trouble.

## Conclusion

There are a ton of ways to mock/resolve your APIs when testing, you may find one way or the other better for your scenario, the only thing to consider is that you must account for all your updates and requests when doing that, to be sure your render/method is done by the time you close your test.

`Jest` and `Nock` are awesome packages that make it super easy to test when using them together be sure to account for those situations and you'll have a much tranquil life.

Aaaaa, I almost forgot to mention, when working with `axios` remember that in your tests you **must** change the adapter by:
```js
  axios.defaults.adapter = require('axios/lib/adapters/http');
```

This can be done at the `beforeAll` level or, which is the preferred way, to have in your jest setup file, refer to `setupFilesAfterEnv` in jest Docs to learn more.

[Github](https://github.com/FrancoSirena/nock-jest-example/tree/main)

Cheers.