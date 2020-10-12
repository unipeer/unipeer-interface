import { InferGetStaticPropsType, Get } from 'next'

export default function Button({ onClick, children }) {
  return (
    <button onClick={onClick} className="btn-blue">
      { children }
    </button>
  )
}
