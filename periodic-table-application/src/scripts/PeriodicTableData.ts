import { ElementData } from '@/app/types';
import periodicTableData from '../data/periodic-table-data.json';

const loadPeriodicTableData = async (): Promise<ElementData[]> => {
    return periodicTableData
};

export default loadPeriodicTableData;
