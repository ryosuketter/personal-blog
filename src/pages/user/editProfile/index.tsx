import Link from 'next/link'
import React from 'react'

export default function User() {
  return (
    <>
      <h1>editProfile</h1>
      <div>
        <Link href="/user">user</Link>
      </div>
    </>
  )
}
