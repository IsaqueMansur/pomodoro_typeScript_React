import React from 'react';

interface Props {
  text: string;
  onClick?: () => void;
  className?: string;
  ref?: string;
}

export default function Button(props: Props): JSX.Element {
  return (
    <button
      type="button"
      onClick={props?.onClick}
      className={props?.className}
      ref={props?.ref}
    >
      {props.text}

    </button>
  );
}
