import clsx from 'clsx'
import React from 'react'

const Button = ({icon,className, label,type, onClick = () =>{} }) => {
  return (
    <div>
      <button
      type={type || "button"}
      className={clsx("px-3 poy-2 outline-none rounded",className)}
      >
        <span>{label}</span>
        {icon && icon}
      </button>
    </div>
  )
}

export default Button
