---
slug: "/tech-notes/react-notes"
date: "2020-10-16"
title: "React conference notes"
summary: "Quick notes that I took during the React Conf 2020, these are all personal notes"
---
## Talks

### ServiceWorkers by AirBnb engineer, Joshua Nelson
He showed how they are improving the UX by pre fetching certain URLs, specially to retrieve images meta ( size ) so they can ahead of time know exactly how the page will look like and place the placeholders exactly how they should be, eliminating the UI jump. They use techniques to measure how much their UI shifts from Initial Page Loading to Last Element Loaded, https://web.dev/cls/ .  That helps with the CLS and as they are using a service worker they get even a browser caching, for a very short period of time ( this is configurable ) which makes the user experience better because the feel is that the pages are loading faster.

### Kent C Dodds - Consume, Build and Teach 
He gave basically a motivational speech this time, talking about how he does to learn new stuff, which he represents as a cycle called: Consume > Build > Teach, by doing that way the changes of you fixing stuff and really understanding it are way higher, because as you learn ( Consume ) you then apply what you learned, by building POC, personal projects, whatever and after hardening it through some projects you start teaching others, because then you’ll need to dig even deeper to able to assist others in any situation, and by helping others you sometime may face situations that you’ve never thought about which will bring you even more insights and get you to a better place.

### Talk about performance by DAZN engineer, Rich McCol
He showed how easy it is to track performance of your APP, and how we should be doing it. The technique he showed involves using the window.performance API and use the performance tab on Chrome and how to interpret that. On the specific example he gave, their issue was a super long list of items that were rendered up front even though in the page it would fit something like 3~4 items, so all the others were just wasted processing because they were unnecessary at that point, so he talked about virtualisation and how that saves memory and processing.
Packages: Masonic - Masonry ( Virtualisation )

### Monica Wojciechowska about how SVG paths work
Amazing talk where she showed some pkgs that help us getting there by making it easier to read each path and understand what the SVG was actually built. She explained that the more we understand how SVG Paths work the better we get to animate them. It is super interesting to see everything and try to follow, it is hard, but at least the way the explained brought some light on some topics that I was not super familiar with. Great talk.
Packages: `svg-yoga` and `svg-pathdata`

### Workers and WASM by Majid Hajian
He talked about letting the main thread breathe. What he argues is that as JS is a single thread environment, we should be letting the main thread free to let it work with the most important pieces of our APP, such as UI repainting and tasks like that. The ideas he brings were to use WebWorkers so we can keep all the heavy processing tasks separate from the UI, so the main thread would be “used” just to actually interact with the DOM as Webworkers can’t do that. He talked about wasm as well, and how we can have some logic that is not entirely related to the UI separated in a wasm file and then load it to execute its functions, because then we could keep the processing  on the server side instead of cliente side, letting our UX/UI more fluid. He mentioned that yes there is an overhead by using those techniques but they do pay off.

### React + Typescript by Ben Ilegbodu
A talk about Typescript + React and how it solves our day to day issues like passing unknown props to component, overwriting base props with custom props because we are explicitly declaring them. Passing wrong type values to props or even wrong signature methods to method props, as PropTypes does not catch those. It is great to see how Typescript would solve a lot of issues that happen in several edges of our APPs.

https://github.com/typescript-cheatsheets/react

### Testing talk by Iris Schaffer
In here, she talked about testing and how we should test, she mentioned Integration, E2E and unit tests and explained why we should not test internal logic specific details but the overall input and output system, rather than checking if a specific method was called or anything alike, we should provide an input ( actions ) and check the result with the expected ( UI updated ). She showed how to use Cypress for Integration Tests, there is a super great cy.server API so we can mock API calls, and of course, we can use cypress for E2E tests as well using a real server and everything.


*These are all personal notes notes taken during React Summit 2020 that happened on Oct. 15th and 16th*
