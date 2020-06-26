# TED-Front

Tediber's website frontend built using Nuxt.js and Spectre.css

## Technologies

This project is built using the following technologies:

* [ES2015](https://css-tricks.com/lets-learn-es2015/) - Javascript
* [Nuxt.js](https://nuxtjs.org/) which combines the following:
  * [Vue.js](https://vuejs.org/) - JS Framework
  * [Vue Router](https://router.vuejs.org/) - Routing
  * [Vuex](https://vuex.vuejs.org/fr/) - State mangement
  * [Vue Meta](https://github.com/declandewet/vue-meta) - HEAD meta tag management
  * [nuxt-i18n](https://nuxt-community.github.io/nuxt-i18n/) - i18n management
* [Spectre.css](https://picturepan2.github.io/spectre/getting-started.html) CSS framework written in
  * [SASS](http://sass-lang.com/guide)

## Requirements

The following tools are required to develop Ted-front:

* [Git](https://git-scm.com/downloads) - Versioning system
* [Git-flow](https://danielkummer.github.io/git-flow-cheatsheet/) - Git extension
* [NodeJS](https://nodejs.org/en/download/) 11.X - JS server used to run other tools
* [Yarn](https://yarnpkg.com/docs/install/) 1.15.X - Package manager

## Build Setup

``` bash
# clone repo (via ssh)
$ git clone git@gitlab.com:tediber/TED-Front.git
$ cd TED-Front

# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# or to use the production API
$ yarn dev-prod

# build for production and launch server (unused in this project)
$ yarn build
$ yarn start

# generate static project
$ yarn run generate
```

## Coding standard
 * Indent using 2 spaces
 * Assets should be stored in subdirectory matching their component or page
 * Or in `common` if shared across the app (CSS backgrounds for example)
 * Use Vue.js functions and methods before using plain JS
 * Always use `scoped` in your components' style
 * See Vue.js [official guide](https://vuejs.org/v2/style-guide)

## Resources
* [Official documentation](https://vuejs.org/v2/guide/)
* [Getting Started](https://www.taniarascia.com/getting-started-with-vue/)
* [Nuxt documentation](https://nuxtjs.org/guide)