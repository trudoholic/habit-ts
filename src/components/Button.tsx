import type {ReactNode} from "react";

type ButtonProps = {
  // text: string
  children: ReactNode
  disabled?: boolean
}

// export function Button({text}: ButtonProps) {
export function Button({children, disabled = false}: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className="bg-violet-600 hover:bg-violet-500 transition-colors rounded px-2 py-1
      disabled:opacity-30 disabled:cursor-not-allowed">
      {children}
    </button>
  )
}
