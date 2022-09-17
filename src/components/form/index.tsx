import {InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{

}

export default function input(props: InputProps) {
  return (
    <input
    {...props}
    className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zine-500"
    />
  )
}
