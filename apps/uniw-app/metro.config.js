// metro.config.js

const { getDefaultConfig } = require('expo/metro-config')
const path = require('path')

// Find the workspace root, this can be replaced with `find-yarn-workspace-root`
const workspaceRoot = path.resolve(__dirname, '../..')
const projectRoot = __dirname

const config = getDefaultConfig(projectRoot)

// 1. Watch all files within the monorepo
config.watchFolders = [workspaceRoot]
// 2. Let Metro know where to resolve packages, and in what order
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
]

config.resolver.disableHierarchicalLookup = true

config.resolver.unstable_enablePackageExports = false
config.resolver.unstable_enableSymlinks = false

const monorepoPackages = {
  '@uniw/shared-constants': path.resolve(workspaceRoot, 'packages/shared-constants'),
  '@uniw/shared-services': path.resolve(workspaceRoot, 'packages/shared-services'),
  '@uniw/shared-types': path.resolve(workspaceRoot, 'packages/shared-types'),
  '@uniw/shared-utils': path.resolve(workspaceRoot, 'packages/shared-utils'),
}

config.resolver.extraNodeModules = {
  ...config.resolver.extraNodeModules,
  ...monorepoPackages,
}

module.exports = config
