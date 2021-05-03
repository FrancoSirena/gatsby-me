---
slug: "/tech-notes/shareable-eslint-config"
date: "2021-05-03"
title: "How to create a shareable eslint config"
summary: "Simple example of how you can share your eslint rules with multiple repos."
---

Ever since I started embracing the concept of having multiple frontends in a
single app, I've been battling with some basic things, such as sharing the
eslint config with multiple packages without having to add a `.eslintrc` in
every one of those packages.

I found a very simple explanation of how to achieve that in the [ESLint docs](https://eslint.org/docs/developer-guide/shareable-configs), that gives a very simple explanation on how to achieve that and even gives some examples as
well, quite nifty.

The short answer is simples, you need to create a `config` or `plugin` that will
extend and set all the base rules you want to have.

But then, as none of our `eslint` configs are made simple and plain, we start to
get into some weird states, such as:

- I do have some rules which I would like to share with all my `js` projects, but not all of them;
- I want to be able to have rules that do apply for both `js` and `ts` projects, but I want to overwrite some at the consumer level;

With those things in mind I started to implement a solution that would meet all
my criteria. Here I am going to elaborate on how I achieved that.

## Eslint Config

First and foremost we need to create a module just to keep our new
`eslint-config`, and that is as simple as creating a new npm package with a `npm init`.

That `package.json` will look something like this:

```json
{
  "name": "eslint-plugin-fs-react-sample",
  "version": "0.0.1-rc.0",
  "author": "Your awesome name",
  "description": "Extended version of React Eslint Rules - Sample",
  "main": "index.js",
  "repository": {
    "url": "git@github.com/eslint-plugin-fs-react-sample.git",
    "type": "git"
  },
  "peerDependencies": {
    "eslint": ">=7.0.0"
  },
  "devDependencies": {
    "eslint": "^7.0.0"
  }
}
```

From here you can start adding as `devDependencies` the `plugins` and `configs` you want to extend and have as default for you custom set of rules.

## Adding base configs and plugins

Let's say you want to add `prettier` or `airbnb` config to your base set of rules, you can simple add those by.

```js
  yarn add --peer eslint-config-prettier eslint-config-airbnb eslint-plugin-react-hooks eslint-plugin-prettier
```

That will allow you to extend from that `config` and turn on or off the base rules of `prettier` in a shared manner.

On top of the base `configs` you may want to add `plugins` as well, which is supper useful and common, and to be fair it is exactly what we are doing.

We are adding those as `peer` because we don't those for our current project, if we do want those for our current project, let's say if you are planning on adding custom rules, which I will explain in a bit, you may need to add those as `dev` instead of `peer`.

## Adding custom configs

To add custom configs you may just write them as you would usually do and `require` them at your `index.js` file.

Let's add a `non-offensive-terms.js` file at our root folder, the rule could be something like this:

```js
module.exports = {
  meta: {
    docs: {
      description:
        "Use terms like `not allowed` or `allowed` to represent safe and unsafe values.",
      category: "Errors",
      recommended: false,
    },
    messages: {
      avoidName: "Avoid using variables containing '{{ name }}' word",
    },
    schema: [],
  },
  create: context => ({
    Identifier(node) {
      if (node.name.match(/white[-_]?l/i)) {
        context.report({
          node,
          messageId: "avoidName",
          data: {
            name: node.name,
          },
        })
      } else if (node.name.match(/black[-_]?l/i)) {
        context.report({
          node,
          messageId: "avoidName",
          data: {
            name: node.name,
          },
        })
      }
    },
  }),
}
```

This rule checks for usage of terms like _whitelist_ or _blacklist_ and suggests you to choose more appropriate names which are not cultural offensive.

## Bringing it all together

Now that we have our base `plugins`, `configs` and `custom` rule, we can then bring it all to life by creating our `index.js` file.

```js
module.exports = {
  rules: {
    'non-offensive-terms': require('./non-offensive-terms'),
  },
  configs: {
    js: {
      plugins: ['prettier'],
      extends: ['prettier'],
      rules: {
        'non-offensive-terms': 'error',
      },
    },
    react: {
      extends: [
        'airbnb',
        'plugin:fs-react-sample/js',
        'plugin:react-hooks/recommended',
      ],
      plugins: ['fs-react-sample', 'react-hooks'],
      overrides: {
        'import/prefer-default-export': 0,
      }
    }
  }
```

## Putting in action

From here you can first try it out by simply linking the package.
At your config repo

```js
  yarn link
```

At your consumer repo

```js
  yarn link eslint-plugin-fs-react
```

Now you can just change your `.eslint.rc` file and use it

```json
{
  "parser": "babel-eslint",
  "extends": ["plugin:fs-react-sample"],
  "env": {
    "browser": true
  }
}
```

Now when you run your `yarn eslint **/*.(js|ts|jsx)` it will use your extended set of rules :)

## That is it

With all of that you can simply add new `configs` to your `index.js` file and have as many variants as you need, that can be quite handy for, let's say, having a base `js` set of rules and a superset of those rules for `react` or `vue` repos, so yeah this is can become quite a thing.

Hope you found it valuable and could take something from it.

You can check my repo with the config code at [Github](https://github.com/FrancoSirena/eslint-plugin-fs-react-sample)
