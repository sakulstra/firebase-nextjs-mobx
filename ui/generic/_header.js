import React from 'react'
import Link from 'next/prefetch'
import { FriendlyHello, AvatarWidget, HashIcon } from './'

const Header = () => (
  <header className='header'>
    <Link href='/'><a>Home</a></Link>
    <Link href='/diary'><a>Diary</a></Link>
    <FriendlyHello />
    <AvatarWidget />
    <HashIcon />
  </header>
)

export default Header
