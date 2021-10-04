import cn from "classnames"
import { ComponentPropsWithRef, ComponentType, forwardRef, HTMLAttributes, JSXElementConstructor } from "react";

export interface IContainer extends ComponentPropsWithRef<"div"> {
  as?: string | JSXElementConstructor<any>
  component?: string | JSXElementConstructor<any>
  reset?: boolean,
}

const Grid = forwardRef<HTMLDivElement, IContainer>(
  (props, ref): JSX.Element => {
    const { as, component = "div", className, children, reset, ...rest } = props;

    const Element = (as || component) as ComponentType<HTMLAttributes<HTMLDivElement>>;

    const rootClass = cn(
      {
        'border-4 gap-2 border-red-200 border-black md:grid md:grid-cols-9 h-2/3 overflow-hidden': !reset,
      },
      className
    )

    return (
      <Element ref={ref} className={rootClass} {...rest}>
        {children}
      </Element>
    )
  }
)

export default Grid