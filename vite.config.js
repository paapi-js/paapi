// vite.config.js
const path = require('path')
const { defineConfig } = require('vite')

module.exports = defineConfig({
    build: {
        lib: {
            entry: path.resolve(__dirname, 'lib/main.ts'),
            name: 'Paapi Client',
            fileName: (format) => `paapi-client.${format}.js`
        },
        rollupOptions: {
            // make sure to externalize deps that shouldn't be bundled
            // into your library
            external: ['socket.io-client'],
            output: {
                // Provide global variables to use in the UMD build
                // for externalized deps
                globals: {
                    'socket.io-client': 'io'
                }
            }
        }
    }
})
