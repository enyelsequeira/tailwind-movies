import { ComponentPropsWithoutRef, forwardRef } from "react";
import cn from "classnames"
enum Component {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span
}
export interface ITypography extends ComponentPropsWithoutRef<'p'>, ComponentPropsWithoutRef<"h1"> {
  as?: keyof typeof Component,
  component?: keyof typeof Component,
  resetStyles?: boolean,

}


const Typography = forwardRef<HTMLDivElement, ITypography>(
  (props, ref): JSX.Element => {
    const { as, component = "p", className, children, resetStyles, ...rest } = props;
    const Element = as || component;

    const rootClass = cn({
      'text-4xl font-bold font-title': Element === 'h1' && !resetStyles,
      'text-3xl font-bold font-title': Element === 'h2' && !resetStyles,
      'text-2xl font-bold font-title': Element === 'h3' && !resetStyles,
      'text-xl font-medium font-title': Element === 'h4' && !resetStyles,
      'text-lg font-medium font-title': Element === 'h5' && !resetStyles,
      'text-lg font-base font-title dark:text-white text-black': Element === 'h6' && !resetStyles,
      'text-base font-body': Element === 'p' && !resetStyles,
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

export default Typography
