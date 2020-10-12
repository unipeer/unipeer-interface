import { PropTypes } from "react";

export default function Button({ onClick, children }: PropTypes) {
  return (
    <button onClick={onClick} className="btn-blue">
      {children}
    </button>
  );
}
