// ─── Imports

import { Avatar } from '@mantine/core'

// ─── Componente ProfilePicture

interface IProfilePicture {
  userImage?: string | null
  userName?: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function ProfilePicture({
  userImage,
  userName,
  size = 'md',
}: IProfilePicture) {
  return (
    <Avatar
      variant="filled"
      src={userImage}
      name={userName}
      size={size}
      color="initials"
    />
  )
}
