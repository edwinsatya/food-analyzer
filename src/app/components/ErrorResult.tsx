import { FunctionComponent } from 'react'

interface ErrorResultProps {
  text: string
}

export const ErrorResult: FunctionComponent<ErrorResultProps> = ({ text }) => {
  return (
    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 text-red-700 text-sm">
      {text}
    </div>
  )
}
