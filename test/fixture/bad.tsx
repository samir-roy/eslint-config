/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const Bad = (props: any) => {
  const [n, setN] = useState(0);
  if (n == 1) {
    console.log('x');
  }
  for (const k in props) {
    setN(n++);
  }
  return <div onClick={() => setN(n + 1)}>{'hi'}</div>;
};
