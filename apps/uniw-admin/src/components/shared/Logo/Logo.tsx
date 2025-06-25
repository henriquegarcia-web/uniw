// ─── Imports

import styles from './Logo.module.scss'

import Image from 'next/image'
import Link from 'next/link'

// ─── Variáveis Auxiliares

const imageDimensions = {
  sm: {
    width: 75,
    height: 37,
  },
  md: {
    width: 88,
    height: 44,
  },
  lg: {
    width: 104,
    height: 52,
  },
}

// ─── Componente Logo

interface ILogo {
  href?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Logo({ size = 'md', href = '/' }: ILogo) {
  const { width, height } = imageDimensions[size]

  return (
    <Link href={href}>
      <Image
        src="/uniw_logo.png"
        alt="Logo da UNIW"
        width={width}
        height={height}
        priority
      />
    </Link>
  )
}
