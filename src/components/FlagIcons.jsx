import React from 'react'

export function FlagDE({ size = 18, style = {} }) {
  const height = Math.round(size * 0.7)
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 5 3" 
      style={{ borderRadius: 3, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.3)', ...style }}
    >
      <rect width="5" height="3" fill="#000000"/>
      <rect width="5" height="2" y="1" fill="#DD0000"/>
      <rect width="5" height="1" y="2" fill="#FFCC00"/>
    </svg>
  )
}

export function FlagGB({ size = 18, style = {} }) {
  const height = Math.round(size * 0.7)
  return (
    <svg 
      width={size} 
      height={height} 
      viewBox="0 0 60 30" 
      style={{ borderRadius: 3, display: 'inline-block', verticalAlign: 'middle', flexShrink: 0, boxShadow: '0 1px 3px rgba(0,0,0,0.3)', ...style }}
    >
      <clipPath id="gb-s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
      <clipPath id="gb-t"><path d="M30,15 h30 v15 z v-15 h-30 z h-30 v-15 z v15 h30 z"/></clipPath>
      <g clipPath="url(#gb-s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6"/>
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" clipPath="url(#gb-t)"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10"/>
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
      </g>
    </svg>
  )
}
