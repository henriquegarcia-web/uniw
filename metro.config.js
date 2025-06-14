// metro.config.js

const { getDefaultConfig } = require('expo/metro-config')

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname)

config.resolver.unstable_enablePackageExports = false
config.resolver.unstable_enableSymlinks = false

module.exports = config
