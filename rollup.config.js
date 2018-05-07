import buble from 'rollup-plugin-buble'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import postcss from 'rollup-plugin-postcss'
import nested from 'postcss-nested'

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
      plugins: [nested()] 
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
