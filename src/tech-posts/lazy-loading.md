---
slug: "/tech-notes/lazy-loading"
date: "2020-06-01"
title: "Lazy loading, why? when?"
summary: "Some quick tips about when and why to lazy load."
---

The answer to "Should I use lazy loading now?", like so many technical questions, comes down to "It depends." It isn't great to hear that, but oftentimes, unfortunately, that is exactly the answer that makes the most sense.
That said, I am going to try to elaborate on why and when to use lazy loading, but, in the end, the decision will always demand a certain level of understanding about the technical environment and surrounding ecosystem.

## Why

Starting with the **why**, well, the **why** is quite simple: You don't want to bombard your end-user with a massive JS file containing every little aspect of your app, especially if they won't ever get to those aspects of the app. With that in mind, you have to decide what really matters to a regular user when they login to your app, what is the typical workflow that also coincides with a reasonable bundle size (If we wanted to be more precise, it's worth noting that this will depend on your targeted device(s)). The reasoning behind this is this: You want to make your first load as fast as possible for your user.

## When

With those things in mind — the user-flow, which page goes to where, and what they see on each of them — you start scraping the "top-level" components of your app, and as easy as it can be you can totally create a separate bundle this way, containing each of these "top-level" components. Cool, you have a starting point, now what?
Well, now you can start to analyze the dependency tree of each component, meaning, look at everything that your component relies on, externals and internals, check if you have shared dependencies with most of your app or if you are adding new ones on that tree node. If you find yourself in a situation where your component, and just that, is using a bunch of new dependencies, well, it may make sense to isolate that bundle too. If not, let's say for the sake of example that it uses a package that is utilised everywhere, it utilises components that are utilised everywhere, well then, a separated bundle for just that piece is not justified because, once that component is split off from its dependencies, it will probably end up being something like a few bytes.
Remember that you can use techniques like prefetch to download bundles in the background, which can expedite things a lot on views that have too much going on. That technique allows you to download bundles without degrading the overall performance, and though it will indeed consume bandwidth, the overall effect is worth it when you **know** your user is going to need it very soon. 
With all that in mind, when I am trying to decide if I should lazy-load or not, I start by analyzing the bundle size, checking if something I did significantly increased it, checking if a new page is causing much harm to a "top-level" component, and, if so I start to analyze what I can lazy load/what is unnecessary for the first load. Remember, lazy loading every little piece is not a good idea, because that creates a waterfall effect that can even degrade performance rather than improve it, e.g., one bundle downloads the other and the other one makes an API call and then downloads another yada yada.. You get the idea.
* Always check your network tab to see when your bundles are starting the download
* Check the timing of your requests, see if you can make them happen earlier ( if they are extremely necessary )
* Check if your bundles actually make sense, e.g., making one extra request to download 40 bytes doesn't yield many benefits.
* Make sure your tree shaking is working, taking special care to check your vendors' bundle, to guarantee you are not getting them all at once even though you're only going to use like 30% for the first load.
* Put in place some metrics to monitor your loading time; that will certainly help to detect when you introduce slowness.
I hope these tips and tricks are helpful, but I caution against premature lazy-loading and recommend some level of understanding and analysis of the app in question before applying lazy-loading everywhere. When in doubt, look at your bundle, it will tell you what you need to know.

Cheers :)