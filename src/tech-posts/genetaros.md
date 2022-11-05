---
slug: "/tech-notes/generators"
date: "2022-11-05"
title: "JS Generators and how they can be useful"
summary: "Dismistifies some of what generators are and use cases where they can be helpful."
---

As many of you ( or not ) know [js generator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator) are a bit of a controversial paradigm inside the javascript universe.

The usage of them got popular inside the React community because of [redx-sagas](https://redux-saga.js.org/), where it kind of **forced** you to learn them, which led to mixed feelings inside the community and led to some unnecessary complexity when dealing with simple straight forward requests.

BUT, there is always one, they can still be quite handy in specific situations where you don't want to stress your server (or even client) with an infinite amount of requests at the same time but still, you do want to do it concurrently, to optimize time and resource usage.

This article is just one small example of how you can achieve such things in a very simple way, which can be expanded in any form or shape you need.

## The problem

Imagine you need to write a script that handles documents read pages from a document, but you need to process each batch after it arrives.

The loop should cease after there is no more `next` in the API response, but you don't know for how long you should fetch.

Since the server can only take some number of requests at a time, you even need to throttle the calls before calling it again, imagine a `cooldown` before the next, the time would come in the header.

For that, you could potentially use generators to implement a simple and efficient solution without introducing a shared global state to handle recursion or too-long call stack issues.

## The solution

Let's explore both options, first let's write a solution with recursion that makes the request, process it, and then calls itself back again.

### Recursion
```js
async function makesRecursionRequest(result, key) {
    // fetches data per key
    const [headers,response] = await fetchData(key);
    // waits cooldown ( just a timeout )
    await delay(headers['x-cooldown']);
    // pushes new processed data to end of the result array
    result.push(processData(key, response.data))
    if (response.next) {
        // continuse recurssion
        return await makesRecurssionRequest(result, response.next)
    }
    return result;
}

async function startRecursion() {
    let result = [];
    await makesRecurssionRequest(result);
    return result
}
```

Since we are using recursion, we either have to pass the `result` or have it in a shared memory space, one could argue we could even declare the `makesRecurssionRequest` inside the `startRecursion` so we could skip passing it as an arg.

### Generators
```js
async function callsAndWait(key) {
    const [headers,response] = await fetchData(key);
    await delay(headers['x-cooldown']);
    return response;
}

function* makesGenerator() {
    let next;
    while (true) {
        // makes request and processes it before `yielding` it back to the main call
        yield callsAndWait(next).then((response) => {
            const res = processData(next, response.data)
            next = response.next;
            return res;
        })

        // stops loop when there is nothing else to fetch
        if (!next) {
            break;
        }
    }
}

async function startGenerator() {
    let result = [];
    // waits for each request to be processed to then be stored
    for await (const page of makesGenerator()) {
        result.push(page)
    }
    return result;
}
```

We had to add one extra method which is the `callsAndWait` so the logic is simpler, but that only calls and holds back before returning the result, not super complex.

We could avoid having a shared memory to keep the final result, we can keep that exclusive to the main call and simply operate over each request. We could even remove the `processData` from the generator if we wanted and keep it in the main call.

## Conclusion

With the `for await` we can see how *cool* generators can be for dealing with things like this, when we don't know for how long we need to do things and we don't want to introduce recursion to our code, just because of the stacking issues that one may not know where they are anymore and what to return.

I love the `yield` that just frees the internal process and returns something to the outer context, allowing the consumer to operate over each yielded output at a time.

For things like this and batch processing, where you could for instance, in a known pool of requests/processes, split the work into TOTAL / SIZE to not overload the server, I find generators extremely useful and "simple" to process. Batching it is my favorite thing, so you don't need to do a waterfall or neither an all-at-once approach which can be overwhelming to process sometimes.

### Bonus

Batch processing just because they are cool :) 

```js
function* batchProcessing(entirePool) {
    for (let i = 0; i < Math.ceil(entirePoll/size);i++) {
        yield Promise.allSettled(
            entirePoll.slice(i * size, size).map(processEachItem)
        )
    }
}
```

From the outer scope you just `for await` and combine the result, avoiding overwhelming server or waterfalling requests.