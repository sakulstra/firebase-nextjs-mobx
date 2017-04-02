import React from 'react'
import Link from 'next/link'
import { FriendlyHello, AvatarWidget, HashIcon } from './'

const Header = () => (
  <header className='header'>
    <Link prefetch href='/'><a>Home</a></Link>
    <Link prefetch href='/diary'><a>Diary</a></Link>
    <FriendlyHello />
    <AvatarWidget />
    <HashIcon />
  </header>
)

export default Header
