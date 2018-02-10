var gulp = require("gulp");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");
var concat = require("gulp-concat");

/*{
  "presets": [
    "es2015"
  ],
  "plugins": [
    "transform-es2015-template-literals",
    "transform-es2015-block-scoping",
    "transform-es2015-modules-umd",
    "transform-es2015-classes",
    [
      "transform-class-properties",
      {
        "spec": true
      }
    ]
  ]
}*/

// gulp.task("default", function () {
//     return gulp.src("src/**/*.js")
//     // .pipe(sourcemaps.init())
//         .pipe(babel())
//         .pipe(concat("all.js"))
//         // .pipe(sourcemaps.write("."))
//         .pipe(gulp.dest("dist"));
// });