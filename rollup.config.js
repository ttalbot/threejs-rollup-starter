import nodeResolve from '@rollup/plugin-node-resolve'
import html from '@rollup/plugin-html'
import styles from 'rollup-plugin-styles'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: 'src/main.js',
  output: {
    dir: 'public',
    format: 'es',
    assetFileNames: "[name]-[hash][extname]",
    sourcemap: !production
  },
  plugins: [
    nodeResolve(),
    html({
      title: 'threejs-rollup-starter',
    }),
    styles(),
    production && terser() // minify, but only in production
  ]
}