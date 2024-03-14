import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./Element.css";

type ElementProps = {
  name: string;
  atomicNumber: number;
  symbol: string;
  block: string;
  isBlockSelected: boolean;
  onClick: () => void;
  isInverted: boolean;
};

const Element: React.FC<ElementProps> = ({
  name,
  atomicNumber,
  symbol,
  block,
  isBlockSelected,
  onClick,
  isInverted,
}) => {
  const getBackgroundColor = (propValue: string) => {
    switch (propValue) {
      case "s":
        return "#3498db";
      case "p":
        return "#2ecc71";
      case "d":
        return "#e74c3c";
      case "f":
        return "#f1c40f";
      default:
        break;
    }
  };

  const backgroundColor = getBackgroundColor(block);

  return (
    <Box
      style={{
        backgroundColor,
        ...(isBlockSelected ? { outline: "2px solid red" } : {}),
        width: window.innerWidth / 20,
        height: 'auto',
      }}
      className={`element-container ${isInverted ? "inverted" : ""}`}
      onClick={onClick}
    >
        <Typography variant="body2">{atomicNumber}</Typography>
        <Typography variant="h5" fontSize={"0.75rem"}>
          {symbol}
        </Typography>
        <Typography sx={{ mb: 1.5 }} fontSize={"0.5rem"}>
          {name.toLocaleLowerCase()}
        </Typography>
    </Box>
  );
};

export default Element;
