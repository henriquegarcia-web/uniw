import path from 'path'
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@firebase/app', '@firebase/auth'],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'src', 'styles')],
    additionalData: `
      @use "mixins" as *;
    `,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.large-asset/,
      type: 'asset/source',
      parser: {
        dataUrlCondition: {
          maxSize: 10000,
        },
      },
    })
    return config
  },
  transpilePackages: [
    '@uniw/shared-constants',
    '@uniw/shared-types',
    '@uniw/shared-services',
    '@uniw/shared-utils',
    '@uniw/shared-schemas',
  ],
}

export default nextConfig
