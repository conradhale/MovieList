// Copyright (c) 2023 Conrad Hale

import { UserConfig, defineConfig } from 'vite'
import { spawn } from 'child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'

import appsettings from './appsettings.json'
import appsettingsDev from './appsettings.Development.json'

import purgecss from '@fullhuman/postcss-purgecss'
import postcssFlexbugsFixes from 'postcss-flexbugs-fixes'
import postcssPresetEnv from 'postcss-preset-env'

const certificateName = process.env.npm_package_name

const baseFolder = process.env.APPDATA
    ? `${process.env.APPDATA}/ASP.NET/https`
    : `${process.env.HOME}/.aspnet/https`

const certFilePath = path.join(baseFolder, `${certificateName}.pem`)
const keyFilePath = path.join(baseFolder, `${certificateName}.key`)

export default defineConfig(async () => {
    // Ensure the certificate and key exist
    if (!existsSync(certFilePath) || !existsSync(keyFilePath))
        // Wait for the certificate to be generated
        await new Promise<void>((resolve) =>
            spawn(
                'dotnet',
                [
                    'dev-certs',
                    'https',
                    '--export-path',
                    certFilePath,
                    '--format',
                    'Pem',
                    '--no-password'
                ],
                { stdio: 'inherit' }
            ).on('exit', (code) => {
                resolve()
                if (code) process.exit(code)
            })
        )

    // Define Vite configuration
    const config: UserConfig = {
        appType: 'custom',
        root: 'src',
        publicDir: '../public',
        build: {
            manifest: appsettings.Vite.Manifest,
            emptyOutDir: true,
            outDir: '../wwwroot',
            assetsDir: 'assets',
            sourcemap: 'inline',
            rollupOptions: {
                input: 'src/main.ts',
                output: {
                    entryFileNames: 'js/[name].[hash].js',
                    chunkFileNames: 'js/[name]-chunk.js'
                }
            }
        },
        css: {
            postcss: {
                plugins: [
                    postcssFlexbugsFixes,
                    postcssPresetEnv({
                        autoprefixer: { flexbox: 'no-2009' },
                        stage: 3,
                        features: { 'custom-properties': false }
                    }),
                    purgecss({
                        content: ['./Views/**/*.cshtml', './src/*.ts'],
                        variables: true,
                        keyframes: true,
                        safelist: {
                            standard: ['html', 'body'],
                            deep: [/^col/, /^modal/]
                        },
                        defaultExtractor: (content) =>
                            content.match(/[\w-/:]+(?<!:)/g) || []
                    })
                ]
            }
        },
        server: {
            port: appsettingsDev.Vite.Server.Port,
            strictPort: true,
            https: { cert: certFilePath, key: keyFilePath },
            hmr: { clientPort: appsettingsDev.Vite.Server.Port }
        },
        optimizeDeps: {
            include: []
        }
    }

    return config
})
