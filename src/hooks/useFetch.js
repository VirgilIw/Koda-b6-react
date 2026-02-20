import React from "react";

export default function useFetch(url) {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(url);
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [url]);

  return data;
}
