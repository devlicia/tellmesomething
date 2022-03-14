import { ButtonHTMLAttributes} from 'react';

import '../styles/button.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    ButtonRoom?: boolean;
};


export function Button ({ButtonRoom = false, ...props}: ButtonProps) {
  return (
    <button className={`button ${ButtonRoom && 'buttonRoom'}`} 
    {...props}/>
  )
}