import React from 'react'
import Link from 'next/link'

const Footer = () => (
  <footer className='footer'>
    <Link prefetch href='/impressum'><a>Impressum</a></Link>
  </footer>
)

export default Footer
