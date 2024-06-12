import { useGetCoinsQuery } from "../services/cryptoApi";
import { FaCaretUp, FaCaretDown, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";

const Table = () => {
  const { data, isFetching } = useGetCoinsQuery();

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [hoveredRow, setHoveredRow] = useState(null);
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    if (data) {
      const sortData = () => {
        const newData = [...data].sort((a, b) => {
          if (!sortedColumn) return 0;
          const columnA = a[sortedColumn];
          const columnB = b[sortedColumn];
          if (columnA < columnB) {
            return sortOrder === "asc" ? -1 : 1;
          }
          if (columnA > columnB) {
            return sortOrder === "asc" ? 1 : -1;
          }
          return 0;
        });
        setSortedData(newData);
      };

      sortData();
    }
  }, [data, sortedColumn, sortOrder]);

  const sortByColumn = (columnName) => {
    if (sortedColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortOrder("asc");
    }
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <div className="bg-[#0d1217]">
      <div className="mx-auto max-w-7xl text-[#dfe5ec] font-bold text-2xl">
        <div className="ml-8 py-4">
          Cryptocurrency Prices by Market Cap
        </div>
      </div>
      <div className="mx-auto max-w-7xl">
        <table className="table-auto w-full bg-[#0d1217] border-t border-b border-[#212d3b] text-[#dfe5ec] text-sm">
          <thead>
            <tr>
              <th></th>
              <th className="text-left py-4" onClick={() => sortByColumn("market_cap_rank")}>
                # {sortedColumn === "market_cap_rank" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)}
                {sortedColumn !== "market_cap_rank" && <FaCaretUp className="invisible inline-block w-4 h-4" />}
              </th>
              <th className="text-left" onClick={() => sortByColumn("name")}>
                Coin {sortedColumn === "name" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)}
                
              </th>
              <th className="text-right" onClick={() => sortByColumn("current_price")}>
                {sortedColumn === "current_price" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)} Price
              </th>
              <th className="text-right" onClick={() => sortByColumn("price_change_percentage_24h")}>
                {sortedColumn === "price_change_percentage_24h" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)} 24h 
              </th>
              <th className="text-right" onClick={() => sortByColumn("total_volume")}>
                {sortedColumn === "total_volume" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)} 24h Volume 
              </th>
              <th className="text-right" onClick={() => sortByColumn("market_cap")}>
                {sortedColumn === "market_cap" && (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : <FaCaretDown className="inline-block w-4 h-4" />)} Market Cap 
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((coin, index) => (
              <tr 
                key={coin.id} 
                className={`border-t border-b border-[#212d3b] py-4 text-sm ${hoveredRow === index ? 'bg-[#1b232d]' : ''}`}
                onMouseEnter={() => setHoveredRow(index)}
                onMouseLeave={() => setHoveredRow(null)}
              >
                <td className="text-center"><FaRegStar className="inline-block text-lg ml-1" /></td>
                <td className="text-left">{coin.market_cap_rank}</td>
                <td className="py-4 flex items-center text-left">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-3" />
                  {coin.name} 
                  <span className="text-sm text-[#9eb0c7] ml-2 uppercase">
                    {coin.symbol}
                  </span>
                </td>
                <td className="text-right">${coin.current_price.toFixed(2)}</td>
                <td className={coin.price_change_percentage_24h >= 0 ? "text-right text-[#32ca5b]" : "text-right text-[#ff3a33]"}>
                  {coin.price_change_percentage_24h > 0 && <FaCaretUp className="inline-block w-4 h-4" />}
                  {coin.price_change_percentage_24h < 0 && <FaCaretDown className="inline-block w-4 h-4" />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%            
                </td>
                <td className="text-right">${coin.total_volume.toLocaleString()}</td>
                <td className="text-right">${coin.market_cap.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
