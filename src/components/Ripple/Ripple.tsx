import React from 'react';
import './Ripple.scss';

type Props = {
    color?: string
    size?: number
  } & React.HTMLAttributes<HTMLDivElement>

export function Ripple({ color = '#7f58af', size = 80, style }: Props) {
  const circles = [...Array(2)].map((_, index) => (
    <div
      key={index}
      style={{
        borderColor: `${color}`,
        borderWidth: size * 0.05,
      }}
    />
  ))

  return (
    <div className="loader-ripple" style={{ width: size, height: size, ...style }}>
      {circles}
    </div>
  )
}