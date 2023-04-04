"use client";

import { Circle } from "react-circle";

type Props = {
  average: number;
};
const ClientCircle = ({ average }: Props) => {
  return (
    <Circle
      animate={true}
      animationDuration="4s"
      responsive={false}
      size="100"
      lineWidth="40"
      progress={average * 10}
      progressColor="rgba(36, 101, 187, 0.747)"
      bgColor="#ecedf0"
      textColor="#6b778c"
      textStyle={{
        font: "bold 4rem Source Sans Pro, Arial, sans-serif", // CSSProperties: Custom styling for percentage.
      }}
      percentSpacing={20} // Number: Adjust spacing of "%" symbol and number.
      roundedStroke={false} // Boolean: Rounded/Flat line ends
      showPercentage={true} // Boolean: Show/hide percentage.
      showPercentageSymbol={true} // Boolean: Show/hide only the "%" symbol.
    />
  );
};
export default ClientCircle;
