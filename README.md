# vinyl-tf-babel

**A Vinyl Transformer for Babel**

[![Version][npm-img]][npm-url]
[![Downloads][dlm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/vinyl-tf-babel.svg
[npm-url]: https://npmjs.org/package/vinyl-tf-babel
[dlm-img]: https://img.shields.io/npm/dm/vinyl-tf-babel.svg

## Usage

> _`babel-core` needs to be installed separately_

### Vinyl FS

```js
import {src, dest} from "vinyl-fs";
import {BabelTransformer} from "vinyl-tf-babel";

src("src/**/*.js")
  .pipe(new BabelTransformer())
  .pipe(dest("dist"));
```

### Gulp

```js
import gulp from "gulp";
import {transform as babel} from "vinyl-tf-babel";

gulp.task("babel", () => {
  return gulp.src("src/**/*.js")
    .pipe(babel())
    .pipe(gulp.dest("dist"));
});
```

## API
### BabelTransformer

```js
new BabelTransformer([options]);
```

#### Parameters

- **options**  
  See [Babel Options](http://babeljs.io/docs/usage/options/)

### _Functions_

```js
transform([options]);
```

See `BabelTransformer`
