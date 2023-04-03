import cn from "classnames"
import { forwardRef } from "react";
import { ComponentProps, JSXElementConstructor, } from 'react';


enum Variant {
  primary,
  secondary,
  accent,
  info,
  extra
}

export interface IButton extends ComponentProps<"button"> {
  as?: JSXElementConstructor<any>
  component?: string | JSXElementConstructor<any>
  variant?: keyof typeof Variant;
  resetStyles?: boolean,
}


const Button = forwardRef<HTMLButtonElement, IButton>((props, ref): JSX.Element => {
  const { as, component = "button", className, children, resetStyles, variant, ...rest } = props;

  const Element = as || component

  const rootClass = cn({
    'bg-white text-blue-500 px-2 md:px-4  h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary': variant === 'primary' && !resetStyles,
    // 'text-3xl font-bold font-title': as === 'primary' && !resetStyles,
    'bg-blue-600 text-white px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer': variant === "secondary" && !resetStyles,
  },
    className
  );

  return (
    <Element ref={ref} className={rootClass} {...rest}>
      {children}
    </Element>
  )
}
)

export default Button