import { useState, useEffect } from "react";
import dummyAdminStats from "../mock/dummyAdminStats.json";

export default function useEmployerAdminMockData() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate async loading delay
    const loadData = async () => {
      // You can simulate a delay here if you want
      setData(dummyAdminStats);
    };

    loadData();
  }, []);

  return data;
}
