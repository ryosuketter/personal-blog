import Link from 'next/link'
import React from 'react'

export default function User() {
  return (
    <>
      <h1>myPage</h1>
      <div>
        <Link href="/user/editProfile">editProfile</Link>
      </div>
      <div>
        <Link href="/user/editPhoto">editPhoto</Link>
      </div>
    </>
  )
}
