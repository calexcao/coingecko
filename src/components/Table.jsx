import { useGetCoinsQuery } from "../services/cryptoApi";
import { FaCaretUp, FaCaretDown, FaRegStar, FaSearch, FaStar } from "react-icons/fa";
import { FaRankingStar } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux"
import { addFavorite, removeFavorite } from "../redux/reducers/favoritesReducer"
import Pagination from '@mui/material/Pagination';

const Table = () => {
  const { data, isFetching } = useGetCoinsQuery();

  const [sortedColumn, setSortedColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortedData, setSortedData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [showFavorites, setShowFavorites] = useState(false); // New state to toggle between showing all coins and only favorites
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites.favorites);

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    });
  };

  useEffect(() => {
    if (data) {
      const filterAndSortData = () => {
        let filteredData = data;

        // Filter data based on search query
        if (searchQuery) {
          filteredData = data.filter((coin) =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }

        // Filter data based on showing favorites or not
        if (showFavorites) {
          filteredData = filteredData.filter((coin) => favorites.includes(coin.id));
        }

        // Sort data
        const sortedData = [...filteredData].sort((a, b) => {
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

        setSortedData(sortedData);
      };

      filterAndSortData();
    }
  }, [data, sortedColumn, sortOrder, searchQuery, showFavorites, favorites]);

  const sortByColumn = (columnName) => {
    if (sortedColumn === columnName) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortedColumn(columnName);
      setSortOrder("asc");
    }
  };

  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      dispatch(removeFavorite(id));
    } else {
      dispatch(addFavorite(id));
    }
  };

  if (isFetching) return <div className="bg-[#0d1217] min-h-screen"></div>;

  return (
    <div className="bg-[#0d1217] min-h-screen">
      <div className="mx-auto max-w-7xl text-[#dfe5ec] font-bold text-2xl">
        <div className="ml-8 py-4">Cryptocurrency Prices by Market Cap</div>
      </div>
      <div className="flex justify-center items-center mb-3">
        <div className="flex items-center w-full max-w-7xl bg-[#1b232d] rounded-lg">
          <FaSearch className="ml-3 mr-2 text-[#dfe5ec]" />
          <input
            type="text"
            placeholder="Search"
            className="w-full py-2 text-lg rounded-lg text-white bg-[#1b232d] border-none focus:outline-none"
            value={searchQuery} // Bind input value to searchQuery state
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state on input change
          />
        </div>
      </div>
      <div className="mx-auto max-w-7xl mb-3">
        <button
          className={`px-3 py-2 ${showFavorites ? "text-[#9eb0c7] bg-[#0d1217] hover:bg-[#1b232d]" : "text-[#80e038] bg-[#19271a] hover:bg-[#19271a]"} rounded-lg text-sm font-bold focus:outline-none`}
          onClick={() => setShowFavorites(false)}
        >
          <FaRankingStar className="inline-block mr-2 text-lg" />
          Cryptocurrencies
        </button>
        <button
          className={`ml-2 px-3 py-2 ${showFavorites ? "text-[#80e038] bg-[#19271a] hover:bg-[#19271a]" : "text-[#9eb0c7] bg-[#0d1217] hover:bg-[#1b232d]"} rounded-lg text-sm font-bold focus:outline-none`}
          onClick={() => setShowFavorites(true)}
        >
          <FaStar className="inline-block mr-2 text-m"/>
          Favorited
        </button>
      </div>
      <div className="mx-auto max-w-7xl">
        <table className="table-fixed w-full bg-[#0d1217] border-t border-b border-[#212d3b] text-[#dfe5ec] text-sm">
          <colgroup>
            <col style={{ width: "4%" }} />
            <col style={{ width: "4%" }} />
            <col style={{ width: "22%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr>
              <th></th>
              <th className="text-left py-4" onClick={() => sortByColumn("market_cap_rank")}>
                # {sortedColumn === "market_cap_rank" && 
                    (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                      <FaCaretDown className="inline-block w-4 h-4" />
                    )}
                {sortedColumn !== "market_cap_rank" && <FaCaretUp className="invisible inline-block w-4 h-4" />}
              </th>
              <th className="text-left" onClick={() => sortByColumn("name")}>
                Coin {sortedColumn === "name" && 
                  (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                    <FaCaretDown className="inline-block w-4 h-4" />)}
              </th>
              <th className="text-right" onClick={() => sortByColumn("current_price")}>
                {sortedColumn === "current_price" && 
                  (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                    <FaCaretDown className="inline-block w-4 h-4" />)} Price
              </th>
              <th className="text-right" onClick={() => sortByColumn("price_change_percentage_24h")}>
                {sortedColumn === "price_change_percentage_24h" && 
                  (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                    <FaCaretDown className="inline-block w-4 h-4" />)} 24h
              </th>
              <th className="text-right" onClick={() => sortByColumn("total_volume")}>
                {sortedColumn === "total_volume" && 
                  (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                    <FaCaretDown className="inline-block w-4 h-4" />)} 24h Volume
              </th>
              <th className="text-right" onClick={() => sortByColumn("market_cap")}>
                {sortedColumn === "market_cap" && 
                  (sortOrder === "asc" ? <FaCaretUp className="inline-block w-4 h-4" /> : 
                    <FaCaretDown className="inline-block w-4 h-4" />)} Market Cap
              </th>
              <th className="text-right">
                Last 7 Days
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.slice((page - 1) * 20, (page-1) * 20 + 20).map((coin, index) => (
              <tr
                key={coin.id}
                className={`border-t border-b border-[#212d3b] text-sm hover:bg-[#1b232d]`}
              >
                <td className="text-center">
                  {favorites.includes(coin.id) ? (
                    <FaStar
                      className={`inline-block text-lg ml-1 cursor-pointer text-yellow-500`}
                      onClick={() => toggleFavorite(coin.id)}
                    />
                  ) : (
                    <FaRegStar
                      className={`inline-block text-lg ml-1 cursor-pointer`}
                      onClick={() => toggleFavorite(coin.id)}
                    />
                  )}
                </td>
                <td className="text-left">{coin.market_cap_rank}</td>
                <td className="py-4 flex items-center text-left">
                  <img src={coin.image} alt={coin.name} className="w-6 h-6 mr-3" />
                  <Link
                    to={`/coins/${coin.id}`}
                    className="text-[#b7c4d3] font-semibold"
                  >
                    {coin.name}
                  </Link>
                  <span className="text-sm text-[#9eb0c7] ml-2 uppercase">{coin.symbol}</span>
                </td>
                <td className="text-right">${formatNumber(coin.current_price)}</td>
                <td className={coin.price_change_percentage_24h >= 0 ? "text-right text-[#32ca5b]" : "text-right text-[#ff3a33]"}>
                  {coin.price_change_percentage_24h > 0 && <FaCaretUp className="inline-block w-4 h-4" />}
                  {coin.price_change_percentage_24h < 0 && <FaCaretDown className="inline-block w-4 h-4" />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
                </td>
                <td className="text-right">${coin.total_volume.toLocaleString()}</td>
                <td className="text-right">${coin.market_cap.toLocaleString()}</td>
                <td className="text-right">
                  <img 
                    src={`https://www.coingecko.com/coins/${coin.image.match(/images\/(\d+)\//)[1]}/sparkline.svg`} 
                    alt={coin.name} 
                    className="ml-10"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          className="flex justify-center py-2"
          count={(sortedData?.length / 20).toFixed(0)}
          onChange={(_, value) => {
            setPage(value);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          shape="rounded"
          sx={{button: {
            color: '#dfe5ec',
            '&.Mui-selected': {
              color: '#80e038',
              backgroundColor: '#19271a'
            },
            '&:hover' : {
              backgroundColor: '#212d3b'
            },
            margin: '5px'
            }}}
        />
      </div>
    </div>
  );
};

export default Table;