# My Personal Blog

[francosirena.DEV](https://francosirena.dev)

This is my personal blog in which I write tech posts or just tech notes from time to time, the main purpose here is to keep my findings public and to sere as a "reference" for times when I find myself troubling to remember about someting.

I am a Staff Software Engineer, mostly focused on Frontend development but not limited to it.


## Tech Spec

This project was built using:
- `gatsby` and `typescript` for the UI layer
- `jest` and `@testing-library` for the unit testing layer
- `cypress` for the `e2e` layer
- automation is taken care by `github-actions` and `codecov`

### Gatsby

To get the blog to its final state I used some `gatsby` plugins which helped me achieving my goal, each of them responsible for a specific part of it:
I am going to highlight some of the very important ones that are playing a major role:
- `gatsby-transformer-remark`: To read and parse the **.md** files
- `gatsby-remark-prismjs`: To style the code snippets and a nice way, supporting multiple languages
- `gatsby-remark-code-buttons`: To add the copy/paste on all my code snippets
- `gatsby-remark-autolink-headers`: To create links for all my heading elements, which is a must in a blog in my point of view

### Typescript

I am using a very simple config here, nothing fancy, and I am integrating it with `gatsby` with the puglin `gatsby-plugin-typescript`
For a detailed view on how `typescript` is configured here, check the `tsconfig.json` file.

### Jest and Testing Library

There are a few specific things when we get to testing `gatsby` with `jest` and `@testing-library`, to be fair the `@testing-library` doesn't add much challenge, but the `jest` piece kinda does.

So, let's check some of the specifics that are necessary to make it work. ( you can find them all here [Unit Testing - Gatsby](https://www.gatsbyjs.com/docs/how-to/testing/unit-testing)

```js
// jest-config.js
module.exports = {
  transform: {
    "^.+\\.tsx?$": `<rootDir>/jest-preprocess.js`,
  },
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss)$": `identity-obj-proxy`,
    ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `\\.cache`, `<rootDir>.*/public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
  testURL: `http://localhost`,
  setupFiles: [`<rootDir>/loadershim.js`, `<rootDir>/local-storage.js`],
  // The following are just for codecov
  collectCoverage: true,
  coverageReporters: ["html", "lcov"],
}
```

```js
// jest-preprocess.js
const babelOptions = {
  presets: ["babel-preset-gatsby", "@babel/preset-typescript"],
}
module.exports = require("babel-jest").createTransformer(babelOptions)
```

```js
// loadershim.js
global.___loader = {
  enqueue: jest.fn(),
}
```

The rest is specific to my use case, where I am mocking `localStorage` so I can have control over it.

### GitHub Actions

I wrote a very simple action that will run the tests, using yarn cache to make it faster, on every commit on a pull request which the target is `main`.

The `yml` file can be found at: **.github/workflows/main.yml**

## 💫 Deployment

This site is deployed at [Netlify](https://app.netlify.com/).

## Build
This site was created using the default starter kit of gatsby and then I was changing as necessary to get to the point where it is at.

Powered by [Gatsby](https://gatsbyjs.com)

To read more about the default starter kit: [Gatsby Starters](https://www.gatsbyjs.com/starters/)
