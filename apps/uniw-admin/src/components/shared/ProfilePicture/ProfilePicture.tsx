// ─── Imports

import Image from 'next/image'
import styles from './ProfilePicture.module.scss'

// ─── Variáveis Auxiliares

const profilePicureDimensions = {
  sm: {
    aspect: 30,
  },
  md: {
    aspect: 40,
  },
  lg: {
    aspect: 50,
  },
}

// ─── Componente ProfilePicture

interface IProfilePicture {
  image?: string | null
  size?: 'sm' | 'md' | 'lg'
}

export default function ProfilePicture({ image, size = 'md' }: IProfilePicture) {
  const { aspect } = profilePicureDimensions[size]

  return (
    <div
      className={styles.profilePicture}
      style={{
        width: aspect,
        height: aspect,
      }}
    >
      <Image
        src={image ?? '/avatar_placeholder.jpg'}
        alt="Avatar"
        width={aspect}
        height={aspect}
        priority
      />
    </div>
  )
}
