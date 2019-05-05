**gatsby-plugin-transitions** enables animated page-transitions. It uses react-spring for smooth, customizable animations.

[![NPM](https://img.shields.io/npm/v/gatsby-plugin-transitions.svg)](https://www.npmjs.com/package/gatsby-plugin-transitions) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

🚀 [Have a look at the example!](https://andreasfaust.github.io/gatsby-plugin-transitions/)

**This Project is under development. Please join and contribute!**

🔥 **Beware:** Until version 1.0.0 the API can and does change (constantly). Any (breaking-)changes are expressed in minor-updates and will be noted in the docs immediatedly.

## Install

Install all dependencies via Yarn or NPM.

```bash
yarn add gatsby-plugin-transitions gatsby-plugin-layout react-spring react react-dom
```

## Usage

### 1. Register gatsby-plugin-layout

Register `gatsby-plugin-layout` in your `gatsby-config.js`:

```js
module.exports = {
  plugins: ["gatsby-plugin-layout"]
};
```

### 2. Disable default scroll-to-top

Copy this into your `gatsby-browser.js`:

```js
exports.shouldUpdateScroll = () => {
  return false;
};
```

### 3. Create default Layout-file

Create the folder `src/layouts` and the file `src/layouts/index.js`.
Here you need to wrap all `children` into the component `TransitionProvider`

```jsx
import React from "react";
import { TransitionProvider } from "gatsby-plugin-transitions";

const Layout = ({ location, children }) => {
  return (
    <TransitionProvider location={location}>{children}</TransitionProvider>
  );
};

export default Layout;
```

🎉 **Voila!** You have smooth animated page-transitions! **Now customize these!**

## TransitionProvider

List of props:

| **Name**     | **Type** | **Default**                       | **Description**                                  |
| :----------- | :------- | :-------------------------------- | :----------------------------------------------- |
| **location** | Object   | `null`                            | **required.** Gatsby’s location-object.          |
| **mode**     | String   | `'successive'`                    | Transition-mode: `'successive'` or `'immediate'` |
| **enter**    | object   | `{ opacity: 0, config: 'stiff' }` | From-values, when the view is entering           |
| **usual**    | object   | `{ opacity: 1, config: 'stiff' }` | Normal state of the view.                        |
| **leave**    | object   | `{ opacity: 0, config: 'stiff' }` | To-Values, when the view is leaving.             |

### Transition-Mode

- `successive`: Wait till previous view has disappeared.
- `immediate`: Next view is entering while previous view is disappearing.

### Default-Springs

You can enter default-springs for all animation-states:

- `enter`: From-values, when the view is entering.
- `usual`: Normal animation-state of the view.
- `leave`: To-Values, when the view is leaving.

**Caution:** In react-spring the values of the previous animation persist. For example: If you want to execute a `onRest`-function only on `enter`, you have to overwrite it in `leave`!

#### opacity and transform

These props accept a regular [**react-spring**-object](https://www.react-spring.io/docs/hooks/api).
Animated are currently only the keys `opacity` and `transform`.

#### config

The key `config` can be either a regular **react-spring**-config-object.

Or pass in the name of a **react-spring**-default (`default`, `gentle`, `wobbly`, `stiff`, `slow`, `molasses`) as string.

## useTransitionState

A hook, that exposes the plugin’s state-management.
It returns an `Array` with 2 elements:

1.  **state** of type `object`
2.  **dispatch** of type `function`

Currently it is just useful for reading values: For example to easily get the current location-object.

```jsx
import React from "react";
import { useTransitionState } from "gatsby-plugin-transitions";

const MyComponent = () => {
  const [{ currentLocation }] = useTransitionState();
  return <h1>{currentLocation.pathname}</h1>;
};

export default MyComponent;
```

## To-Do

- [ ] Individual Transitions bound to Links (like [gatsby-plugin-transition-link](https://github.com/TylerBarnes/gatsby-plugin-transition-link))
- [ ] Testing

## Contributing

Every contribution is very much appreciated.

**If you like react-sled, don't hesitate to star it on [GitHub](https://github.com/AndreasFaust/gatsby-plugin-transitions).**

## License

MIT © [AndreasFaust](https://github.com/AndreasFaust)
