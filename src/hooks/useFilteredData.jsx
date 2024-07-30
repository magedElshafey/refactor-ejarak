import { useState, useEffect } from "react";

const useFilteredData = (originalData, filterdRealState, activeIndex) => {
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (originalData.length > 0) {
      const value = filterdRealState?.[activeIndex]?.value;
      const newData = originalData.filter((item) => item.status === value);
      setFilteredData(newData);
    }
  }, [originalData, activeIndex, filterdRealState]);

  return filteredData;
};

export default useFilteredData;
