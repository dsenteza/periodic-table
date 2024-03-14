import React, { useEffect, useState } from "react";
import Element from "../Element/Element";
import loadPeriodicTableData from "@/scripts/PeriodicTableData";
import { ElementData } from "@/app/types";
import './PeriodicTable.css';


type PeriodicTableProps = {};

const PeriodicTable: React.FC<PeriodicTableProps> = ({}) => {

  const [elements, setElements] = useState<ElementData[]>([]);
  const [highlightedBlock, setHighlightedBlock] = useState<string | null>(null);
  const [inverted, setInverted] = useState<boolean>(false);

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
    const maxRows = Math.max(...elements.map((element) => element.row));
    const maxColumns = Math.max(...elements.map((element) => element.column));

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
    <div>
      <button onClick={handleInvertTable}>{inverted ? 'Restore' : 'Invert'}</button>
        <table className={`${inverted ? 'inverted' : ''}`}>
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
