import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
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
    <Card
      style={{
        backgroundColor,
        ...(isBlockSelected ? { outline: "2px solid red" } : {}),
      }}
      className={`element-container ${isInverted ? "inverted" : ""}`}
      onClick={onClick}
    >
      <CardContent>
        <Typography variant="body2">{atomicNumber}</Typography>
        <Typography variant="h5" fontSize={"0.75rem"}>
          {symbol}
        </Typography>
        <Typography sx={{ mb: 1.5 }} fontSize={"0.5rem"}>
          {name.toLocaleLowerCase()}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Element;
