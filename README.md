# Frontend Mentor - Body Mass Index Calculator solution

This is a solution to the [Body Mass Index Calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/body-mass-index-calculator-brrBkfSz1T). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshots](#screenshots)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Select whether they want to use metric or imperial units
- Enter their height and weight
- See their BMI result, with their weight classification and healthy weight range
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshots

|          Mobile designed at 375px:           |           Desktop designed at 1440px:           |
| :------------------------------------------: | :---------------------------------------------: |
|   ![](./screenshots/screenshot-mobile.png)   |    ![](./screenshots/screenshot-desktop.png)    |
|             Mobile (completed):              |              Desktop (completed):               |
| ![](./screenshots/screenshot-mobile-nav.png) | ![](./screenshots/screenshot-desktop-hover.png) |

### Links

- Solution URL: [https://github.com/elisilk/bmi-calculator](https://github.com/elisilk/bmi-calculator)
- Live Site URL: [https://elisilk.github.io/bmi-calculator/](https://elisilk.github.io/bmi-calculator/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Fluid typography
- Accessibility

### What I learned

Hmm 🤔 ...

- Section labels
  - [HTML section elements are a lie (sort of)](https://youtu.be/ULdkpU51hTQ?si=ofIPwN34HWvKUABL)
- A more general grid-layout approach
  - [A new approach to container and wrapper classes](https://youtu.be/c13gpBrnGEw?si=-zSeo1cMeuZFwG_Q)
  - [Layout Breakouts with CSS Grid](https://ryanmulligan.dev/blog/layout-breakouts/)
- [Create a blog with a headless CMS // Full 3-hour course // Astro + Wix Studio](https://youtu.be/Thudicbgqtg?si=pSEoO_J0FUnNlpRw) - Learned a ton of stuff about how to set up my base styles and overall how to think about the full project.
- [Using CSS custom properties like this is a waste](https://youtu.be/_2LwjfYc1x8?si=WJ1cSrkiD_YDIcUw)
  - [Custom properties with defaults: 3+1 strategies](https://lea.verou.me/blog/2021/10/custom-properties-with-defaults/)

### Continued development

Specific areas that the solution should be improved (known issues):

- Should boundary cases of BMI score be rounded before classified? For example, should a BMI score of 18.49 be rounded up to 18.5 (Optimum range) or down to 18.4 (Underweight)?
- Round values to what? A whole value? Maybe to the .5?
- The value "0" validates as true in the input text (numeric field), and it shouldn't. The value should have to be greater than 0, at least for the cm input. It's actually a little more complicated with the other inputs as there may be cases when a 0 is okay in the ft, in, st, lbs (and may be not terrible in the kg field either).
- Don't evaluate the validity of an input field if the user hasn't gotten to it yet. For example, no need to evaluate the weight field right after a user enters their height for the first time.
- When in imperial units, have the ideal weight range also output in imperial units (st and lb).

More general ideas I want to consider:

Hmm 🤔 ...

- [Accessibility Developer Guide](https://www.accessibility-developer-guide.com/)
- [MDN Web Docs for CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) - Went here a lot to reference the different CSS properties and the shorthands, and all the great explanations about best practices.
- [MDN Guides](https://developer.mozilla.org/en-US/docs/Learn)
- [The Clamp Calculator](https://royalfig.github.io/fluid-typography-calculator/) - Used for all of fluid typography and fluid spacing calculations.
- [The Modern JavaScript Tutorial](https://javascript.info/)
- [Wes Bos - JavaScript Introduction](https://wesbos.com/javascript/01-the-basics/welcome) and other [courses](https://wesbos.com/courses)

## Author

- Website - [Eli Silk](https://github.com/elisilk)
- Frontend Mentor - [@elisilk](https://www.frontendmentor.io/profile/elisilk)
