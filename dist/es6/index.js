/*
 * vinyl-tf-babel
 */
"use strict";

export { transform };
import { Transformer } from "vinyl-transformer";
import { transform as babel } from "babel-core";
import applySourceMap from "vinyl-sourcemaps-apply";

class BabelTransformer extends Transformer {

  transform(file) {
    if (file.isStream()) {
      throw new Error("Streaming not supported");
    }
    let options = Object.assign({}, this.options, {
      filename: file.path,
      filenameRelative: file.relative,
      sourceMap: Boolean(file.sourceMap)
    });
    try {
      let { code, map, metadata } = babel(String(file.contents), options);
      if (file.sourceMap && map) {
        map.file = replaceExt(map.file, ".js");
        applySourceMap(file, map);
      }
      file.contents = new Buffer(code);
      file.path = replaceExt(file.path, ".js");
      file.babel = metadata;
      return file;
    } catch (err) {
      this.emit("error", err);
    }
  }
}

export { BabelTransformer };

function replaceExt(path, ext) {
  return String(path).replace(/[.]([^.]*)$/, ext);
}

function transform(options) {
  return new BabelTransformer(options);
}