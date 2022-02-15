---
slug: /tech-notes/setup-multi-project-trigger-gitlab-ci
date: '2022-02-14'
lastmod: 2019-08-22T15:20:28.000Z
title: How to setup a multi project trigger with GitLab CI
summary: How to setup a GitLab pipeline to trigger different projects pipelines
---

This is something unusual, but yes I am actually writing a lot of the CI/CD in the company I am working for right now, so a lot of k8s and specially a lot of GitLab CI.

Well, from someone who was used to maintain a lot of `groovy` code, I am quite amused by it, it is fun and I find joy when things actually work.

Here I am going to share how you can trigger pipelines from different projects. Imagine like you have a components library and everytime someone opens a MR over there you want to run the SPA tests, or even, all the consumers tests, to be sure you are not adding any breaking changes. Here you will find how you can actually do that.

## Let's meet the pipelines

Well, starting with the basic, that honestly is not quite helpful, how to simply add a job that will trigger a separate pipeline. Let's say you have a very coupled arcthitecture and then one of your repos builds an image and then a separate repo uses that image to run tests or to deploy things.

Here I am going to show a simple example.

Let's say this is the project A pipeline:
```yaml
# Graphics Package
install:
    stage: install
    script:
        - yarn install --cache-folder .yarn_cache
    cache:
        key:
            files:
                - yarn.lock
            paths:
                - .yarn_cache
    artifacts:
        paths:
            - node_modules

test:
    stage: test
    script:
        - yarn test --coverage
    artifacts:
        reports:
            - tests.xml

build:
    stage: build
    script:
        - yarn build --cache-folder .yarn_cache

publish:
    stage: publish
    script:
        - yarn publish
```


Here we have a very basic pipeline that calls 3 different jobs and the last one of them publishes the last build to your package repository manager.

Now let's meet our finance App, which uses the graphics one heavily, so we could take it as a downstream candidate.

Let's take a look of its pipeline:
```yaml
# Finance App

install:
    stage: install
    script:
        - yarn install --cache-folder .yarn_cache
    cache:
        key:
            files:
                - yarn.lock
            paths:
                - .yarn_cache
    artifacts:
        paths:
            - node_modules

test:
    stage: test
    script:
        - yarn test --coverage
    artifacts:
        reports:
            junit:
                - tests.xml

build:
    stage: build
    script:
        - yarn build --cache-folder .yarn_cache

deploy:
    stage: deploy
    script:
        - stages the app
```

## Make them chat

Cool, now that we know how both pipelins look like, we can plan on how to make the upstream pipeline, `graphics`, can trigger the downstream one `finance`, and be sure one runs using the proper version from ther other.

Let's start by adding a few jobs to the `graphics` pipeline.
```yaml
get latest version:
    stage: test apps
    script:
        - VERSION=${node -p 'require("./package.json").version}
        - echo GRAPHICS_VERSION=$VERSION >> version.env
    artifacts:
        reports:
            dotenv: version.env

test finance app:
    stage: test apps
    needs: get latest version
    variables:
        GRAPHICS_VERSION: ${GRAPHICS_VERSION}
    trigger:
        project: my-domain/finance
        branch: main
```

I added 2 jobs here, one to get the `version` from our `package.json` file and another one to actually trigger the downstream pipeline. By exposing the `dotenv` and passing on the `trigger` pipeline, we will have access to that variable there.

Let's see what we can to change the `finance` app to support that.

```yaml
    .no pipeline runs:
        rules:
            - if: $CI_PIPLINE_SOURCE == 'pipeline'
              when: never
            - when: always
    
    install:
        # all the rest remains the same
        script:
            - yarn instal --cache-folder .yarn_cache
            - [! -z $GRAPHICS_VERSION ] && yarn add @company/graphics@GRAPHICS_VERSION

    build:
        # all the rest remains the same
        rules:
            - !reference [.no pipeline runs, rules]
    
    deploy:
        # all the rest remains the same
        rules:
            - !reference [.no pipeline runs, rules]
```

Here I added on real change that matters, which is the `yarn add` part, where I grab the variable from the context and install it, making it so that all the following jobs actually use the published version for the `upstream` pipeline.

I added extra changes to skip the `build` and `deploy` jobs, but that is just extra, you could totally stage a version of your app using the latest published version if you wanted to.

## Caveats

The changes described above were essentially simple, but things could get more complicated as the downstream pipeline gets more and more jobs. You will always need to take into account how those jobs would behave if they were triggered by another pipeline, specially because most of the times it would be using the `default branch` so you would need to be extra careful with that.

One thing that I personally like to do is to isolate important blocks of my pipeline in separate files, so then in the `include` block I can coordinate how I want my pipeline to look like under each scenario.

Let's see it in action:

```yaml
# graphics

test finance app:
    # everything else stays the same
    variables:
        ORIGIN: graphics
```

```yaml
#finance
include:
    - local: .gitlab-production.yaml
      rules:
        if: $CI_PIPELINE_SOURCE == "push" && $CI_DEFAULT_BRANCH == $CI_COMMIT_REF_NAME
    - local: .gitlab-graphics.yaml
      rules:
        if: $ORIGIN == "graphics"
```

That way I can make sure I would never run any important job during a pipeline run and specially I could isolate what would run in a pipeline run and could go crazy in that `.gitlab-graphics.yaml` file, so I could create specific things in there to check the latest published version.

## Conclusion

Well, this is just one cool trick that you can do with `gitlab`, I do enjoy using it quite a lot, find it very flexible and powerful. From here you can do anything really, you could trigger independent pipelines that are managed by different teams if it needs be.

I do, though, advise you to always use your judgement to when this makes sense and when, if it is feasible, to actually have a tagged version of the downstream service that could be installed during the upstream one and tested in there ( hint, helm dependencies ), decoupling the pipelines and letting things way more loosely coupled, which by all means, works better in the long term.
