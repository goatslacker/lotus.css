# lotus.css

> A minimalist's typography focused and responsive framework for the web

Check out a demo here: http://goatslacker.github.io/lotus.css/

## Features

* Small!
* Focus on typography
* Responsive built-in
* Cross Browser
* Low specificity

## Using the CLI

```
npm install lotus.css
```

Run `lotus` in your project's directory. A minified lotus build will be sent to process.stdout.

You can configure what you want in your lotus build via `package.json`

Sample:

```json
{
  "lotus.css": {
    "modules": {
      "normalize": true,
      "typography": true,
      "grid": true,
      "buttons": true,
      "colors": true,
      "spacing": true,
      "tables": true,
      "extras": true
    },
    "colors": {
      "black": "#636669",
      "dark-gray": "#636669",
      "blue": "#6297DE",
      "green": "#9BCFA1"
    }
  }
}
```

For a reference of configurable variables [see here](https://github.com/goatslacker/lotus.css/blob/gh-pages/modules/variables.css).

## Another CSS Framework?

There are many amazing css frameworks out there and everything from really minimalist to an all inclusive large framework.

I liked the grids from [Toast](https://github.com/daneden/Toast), the size of [min](https://github.com/owenversteeg/min), the build tool from [pure](http://purecss.io/), and other bits from [Kube](https://github.com/imperavi/kube) and [Skeleton](https://github.com/dhg/Skeleton).

This is a tight collection of small independent css modules featuring style, responsive-ness, and low-specificity.

There is a web build tool available allowing you to customize your build from the variables to which components you'll actually be using.

## License

MIT
