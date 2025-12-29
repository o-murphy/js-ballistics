# BallisticCalculator

## ISC library for small arms ballistic calculations (JavaScript ES6+)

![NPM version](https://img.shields.io/npm/v/js-ballistics?style=flat-square&logo=npm)
![License](https://img.shields.io/npm/l/js-ballistics?style=flat-square)
[![Jest](https://github.com/o-murphy/js-ballistics/actions/workflows/tests.yml/badge.svg)](https://github.com/o-murphy/js-ballistics/actions/workflows/tests.yml)

[![SWUbanner]][SWUBadge]

[SWUbanner]:
    https://img.shields.io/badge/made_in-Ukraine-ffd700.svg?labelColor=0057b7&style=flat-square
[SWUBadge]: https://stand-with-ukraine.pp.ua

### Table of contents

- **[Installation](#installation)**
- **[About project](#about-project)**

## Installation

### Via NPM

```shell
npm i js-ballistics@latest
```

### Load dynamically

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Your HTML Page</title>
    </head>
    <body>
        <script type="module">
            // Link via unpkg.com CDN
            import * as JSBallisics from "https://unpkg.com/js-ballistics@latest";

            // Make all exports available globally
            Object.assign(window, JSBallisics);

            // Create a Measure object (example)
            const exampleMeasure = window.UNew.Meter(10);
            const exampleMeasureFoot = exampleMeasure.to(window.Unit.Foot);
            const exampleValueFoot = exampleMeasure.In(window.Unit.Foot);

            // Log the Measure object to the console
            console.log("Example Measure in meter:", `${exampleMeasure}`);
            console.log(
                "Example Conversion meter to foot:",
                `${exampleMeasureFoot}`
            );
            console.log(
                "Example Conversion meter to number in foot:",
                `${exampleValueFoot}`
            );
        </script>
    </body>
</html>
```

## About project

The library provides trajectory calculation for projectiles including for
various applications, including air rifles, bows, firearms, artillery and so on.

3DF model that is used in this calculator is rooted in old C sources of version
2 of the public version of JBM calculator, ported to C#, optimized, fixed and
extended with elements described in Litz's "Applied Ballistics" book and from
the friendly project of Alexandre Trofimov and then ported to Go.

Now it's also ported to python3 and expanded to support calculation trajectory
by multiple ballistics coefficients and using custom drag data (such as Doppler
radar data ©Lapua, etc.)

Next stage is porting it to JavaScript

**[The online version of Go documentation is located here](https://godoc.org/github.com/gehtsoft-usa/go_ballisticcalc)**

**[C# version of the package is located here](https://github.com/gehtsoft-usa/BallisticCalculator1)**

**[The online version of C# API documentation is located here](https://gehtsoft-usa.github.io/BallisticCalculator/web-content.html)**

**[The online version of Python module is located here](https://github.com/o-murphy/py_ballisticcalc)**

Go documentation can be obtained using godoc tool.

The current status of the project is ALPHA version.

#### RISK NOTICE

The library performs very limited simulation of a complex physical process and
so it performs a lot of approximations. Therefore, the calculation results MUST
NOT be considered as completely and reliably reflecting actual behavior or
characteristics of projectiles. While these results may be used for educational
purpose, they must NOT be considered as reliable for the areas where incorrect
calculation may cause making a wrong decision, financial harm, or can put a
human life at risk.

THE CODE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE MATERIALS OR THE USE OR OTHER DEALINGS IN THE MATERIALS.
