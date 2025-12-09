import { ReactNode } from 'react'

interface CalloutProps {
  children: ReactNode
  className?: string
}

export default function Callout({ children, className = '' }: CalloutProps) {
  return (
    <div className={`rounded-lg p-6 my-6 ${className}`} style={{ backgroundColor: '#E4E1FF' }}>
      {children}
    </div>
  )
}
