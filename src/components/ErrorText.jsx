import React from 'react'

function ErrorText({title, message}) {
  return (
    <div className='error'>
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  )
}

export default ErrorText;
