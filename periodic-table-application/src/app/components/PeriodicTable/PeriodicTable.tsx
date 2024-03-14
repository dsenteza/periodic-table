import React from "react";
import Element from "../Element/Element";

type PeriodicTableProps = {};

const PeriodicTable: React.FC<PeriodicTableProps> = ({}) => {
  return (
   <Element name="Hydrogen" atomicNumber={1} symbol="H" block="s" isBlockSelected={true} />
  );
};

export default PeriodicTable;
