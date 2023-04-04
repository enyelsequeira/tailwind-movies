import { VariantProps, cva } from "cva";
import { forwardRef } from "react";
import { ComponentProps, JSXElementConstructor } from "react";
import { mergeClasses } from "../helpers";

export const ButtonStyles = cva("", {
  variants: {
    variant: {
      primary:
        "bg-white text-blue-500 px-2 md:px-4  h-[fit-content]  py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg cursor-pointer hover:bg-light-extra-two transition-all ease-in duration-200 hover:text-light dark:hover:bg-dark-background-primary",
      secondary:
        "bg-blue-600 text-white px-6 my-2 md:my-0 md:px-4 h-[fit-content] py-2 rounded-lg border flex justify-center items-center space-x-3 text-lg hover:bg-blue-500 transition-all ease-in duration-300 cursor-pointer",
    },
  },
});
export interface ButtonOwnProps extends VariantProps<typeof ButtonStyles> {}

export interface IButton extends ButtonOwnProps, ComponentProps<"button"> {
  as?: JSXElementConstructor<any>;
  component?: string | JSXElementConstructor<any>;
}

const Button = forwardRef<HTMLButtonElement, IButton>(
  (props, ref): JSX.Element => {
    const {
      as,
      component = "button",
      variant,
      className,
      children,
      ...rest
    } = props;

    const Element = as || component;

    return (
      <Element
        ref={ref}
        className={mergeClasses(ButtonStyles({ variant }), className)}
        {...rest}
      >
        {children}
      </Element>
    );
  }
);

export default Button;
