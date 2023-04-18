import { ComponentPropsWithoutRef, forwardRef } from "react";
import { VariantProps, cva } from "cva";
import { mergeClasses } from "../helpers";
enum Component {
  p,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  span,
}

export const textStyles = cva("", {
  variants: {
    size: {
      h1: "text-4xl font-bold font-title",
      h2: "text-3xl font-bold font-title",
      h3: "text-2xl font-bold font-title",
      h4: "text-xl font-medium font-title",
      h5: "text-lg font-medium font-title",
      base: "text-base font-body",
    },
  },
  defaultVariants: {
    size: "base",
  },
});
export interface TextProps extends VariantProps<typeof textStyles> {}

export interface TypographyProps
  extends TextProps,
    ComponentPropsWithoutRef<"p">,
    ComponentPropsWithoutRef<"h1"> {
  as?: keyof typeof Component;
  component?: keyof typeof Component;
}

const Text = forwardRef<HTMLDivElement, TypographyProps>(
  (props, ref): JSX.Element => {
    const { as, component = "p", className, children, size, ...rest } = props;
    const Element = as || component;

    return (
      <Element
        ref={ref}
        className={mergeClasses(textStyles({ size }), className)}
        {...rest}
      >
        {children}
      </Element>
    );
  }
);

export default Text;
