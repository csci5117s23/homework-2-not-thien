import React from 'react'
import Image from 'next/image'
import photo from './404.png'

export default function Custom404() {
  return (
    <div>
      <h1>Oh no! i think we're lost</h1>
      <Image src={photo} width={500} height={500}/>
    </div>
  )
}
