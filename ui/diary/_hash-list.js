import React from 'react'
import { HashItem } from './'

const HashList = ({ hashes }) => (
  <div>
    {hashes.map(
            hash => <HashItem key={hash.created} hash={hash} />,
        )}
  </div>
)

export default HashList
