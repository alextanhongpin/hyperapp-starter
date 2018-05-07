import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import nested from 'postcss-nested'
import postcssnext from 'postcss-cssnext'
import postcssImport from 'postcss-import'
import postcssUrl from 'postcss-url'
import postcssReporter from 'postcss-browser-reporter'
import cssnano from 'cssnano'

// Added to compile JSX
import babel from 'rollup-plugin-babel'

const prod = !process.env.ROLLUP_WATCH
const dev = !!process.env.ROLLUP_WATCH

export default {
  input: 'src/index.js',
  output: {
    file: 'static/index.js',
    sourcemap: dev ? 'inline' : false,
    format: 'iife',
    intro:
      !dev &&
      `
      history.replaceState(null, null, sessionStorage.redirect)
      delete sessionStorage.redirect
      if ('serviceWorker' in navigator) navigator.serviceWorker.register('/sw.js')
    `,
  },
  plugins: [
    postcss({
      extract: true,
      modules: true,
      minimize: true,
      plugins: [
        postcssImport({
          path: ['./src/styles']
        }),
        nested(),
        postcssnext({
          features: {
            rem: {
              html: false
            }
          }
        }),
        postcssUrl(),
        postcssReporter(),
        // Disable autoprefixer, because it is already included in cssnext
        cssnano({ autoprefixer: false })
      ]
    }),
    // This is required to compile JSX
    babel({
      babelrc: false,
      presets: ["es2015-rollup"],
      plugins: [
        ["transform-react-jsx", { pragma: "h" }]
      ]
    }),
    resolve({ 
      jsnext: true 
    }),
    commonjs(),
    buble({ jsx: 'h' }),
    prod && uglify(),
    dev && livereload('static'),
    dev &&
      serve({
        contentBase: ['static'],
        historyApiFallback: true,
        port: 8080,
      })
  ]
}
