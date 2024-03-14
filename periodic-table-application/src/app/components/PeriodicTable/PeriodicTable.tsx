import React, { useEffect, useState } from "react";
import loadPeriodicTableData from "@/scripts/PeriodicTableData";
import { ElementData } from "@/app/types";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Element from "../Element/Element";
import "./PeriodicTable.css";

type PeriodicTableProps = {};

const PeriodicTable: React.FC<PeriodicTableProps> = ({}) => {
  const [elements, setElements] = useState<ElementData[]>([]);
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);
  const [inverted, setInverted] = useState<boolean>(false);

  // Fetch the periodic table data on component mount
  useEffect(() => {
    const fetchPeriodicTableData = async () => {
      const data = await loadPeriodicTableData();
      setElements(data);
    };
    fetchPeriodicTableData();
  }, []);

  const handleClick = (block: string) => {
    if (highlightedBlock === block) {
      // If the clicked block is already highlighted, remove the highlight
      setHighlightedBlock(null);
    } else {
      // Highlight the clicked block
      setHighlightedBlock(block);
    }
  };

  const handleInvertTable = () => {
    setInverted(!inverted);
  };

  const organizeElements = (): ElementData[][] => {
    // Determine the maximum number of rows and columns (we know these values but allows for flexibility)
    const maxRows = Math.max(...elements.map((element) => element.row));
    const maxColumns = Math.max(...elements.map((element) => element.column));

    // Create a 2D array to represent the periodic table, gaps will be filled with null
    const rows: ElementData[][] = [];
    for (let i = 0; i < maxRows; i++) {
      rows.push(new Array(maxColumns).fill(null));
    }

    elements.forEach((element) => {
      const { row, column } = element;
      rows[row - 1][column - 1] = element;
    });

    return rows;
  };

  return (
    <div className="page-layout">
      <Typography variant="h2" component="h1">
        Periodic Table
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleInvertTable}>
        {inverted ? "Restore" : "Invert"}
      </Button>
      <br />
      <br />
      <table className={`table-layout ${inverted ? "inverted" : ""}`}>
        <tbody>
          {organizeElements().map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((element, columnIndex) => (
                <td key={columnIndex}>
                  {element && (
                    <Element
                      key={element.atomicNumber}
                      name={element.name}
                      symbol={element.symbol}
                      atomicNumber={element.atomicNumber}
                      block={element.block}
                      isBlockSelected={highlightedBlock === element.block}
                      isInverted={inverted}
                      onClick={() => handleClick(element.block)}
                    />
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PeriodicTable;
