import React from 'react'

export default function Logo() {
  return (
    <picture>
      <source srcSet="/logo/vestavital-logo-l-dark.svg" media="(prefers-color-scheme: dark)" />
      <img
        alt="VestaVital Logo"
        width={350}
        height={55.66}
        loading="eager"
        fetchPriority="high"
        src="/logo/vestavital-logo-l.svg"
        style={{ padding: '0 20px 0px 0px' }}
      />
    </picture>
  )
}
