import React from 'react'

const HashInput = ({ value, callback, disabled }) => (
  <div>
    <input type='text' value={value} onChange={e => callback(e.target.value)} disabled={disabled} />
  </div>
)

export default HashInput
