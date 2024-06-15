import { useGetGlobalQuery, useGetEthGasQuery } from "../services/cryptoApi";
import millify from 'millify';
import { FaEthereum, FaCaretUp, FaCaretDown } from "react-icons/fa";

const Header = () => {
  const { data, isFetching } = useGetGlobalQuery();
  const { data: gasData, isFetching: isFetchingGas } = useGetEthGasQuery();

  const globalStats = data?.data;
  const ethGas = Math.floor(gasData?.gas?.eth * 10000); 

  const marketCapPercentage = globalStats?.market_cap_change_percentage_24h_usd;

  if (isFetching | isFetchingGas) return <div className="bg-[#0d1217] min-h-screen"></div>;

  return (
    <nav className="bg-[#0d1217] border-b border-[#212d3b]">
      <div className="mx-auto max-w-7xl px-5 py-3 flex flex-wrap items-center">
        <span className="text-[#9eb0c7] text-xs mr-5 ml-3">Coins:&nbsp; 
          <span className="text-white font-semibold hover:text-[#80e038]">
            {globalStats?.active_cryptocurrencies.toLocaleString()}
          </span>
        </span>
        <span className="text-[#9eb0c7] text-xs mr-5">Exchanges:&nbsp;  
          <span className="text-white font-semibold hover:text-[#80e038]">
            {globalStats?.markets.toLocaleString()}
          </span>
        </span>
        <span className="text-[#9eb0c7] text-xs mr-5">Market Cap:&nbsp; 
          <span className="text-white font-semibold hover:text-[#80e038]">
            ${millify(globalStats?.total_market_cap.usd, { precision: 3 })}&nbsp; 
          </span>
          <span className={marketCapPercentage >= 0 ? "text-[#32ca5b]" : "text-[#ff3a33]"}>
            {marketCapPercentage > 0 && <FaCaretUp className="inline-block w-4 h-4" />}
            {marketCapPercentage < 0 && <FaCaretDown className="inline-block w-4 h-4" />}
            {Math.abs(globalStats?.market_cap_change_percentage_24h_usd).toFixed(1)}%            
          </span>
        </span>
        <span className="text-[#9eb0c7] text-xs mr-5">24h Vol:&nbsp; 
          <span className="text-white font-semibold hover:text-[#80e038]">
            ${millify(globalStats?.total_volume.usd, { precision: 3 })}
          </span>
        </span>
        <span className="text-[#9eb0c7] text-xs mr-5">Dominance:&nbsp; 
          <span className="text-white font-semibold hover:text-[#80e038]">
            BTC {globalStats?.market_cap_percentage.btc.toFixed(1)}%&nbsp;&nbsp;
          </span>
          <span className="text-white font-semibold hover:text-[#80e038]">
            ETH {globalStats?.market_cap_percentage.eth.toFixed(1)}%
          </span>
        </span>
        <span className="text-[#9eb0c7] text-xs flex items-center"> <FaEthereum className="w-4 h-3"/> Gas:&nbsp;  
          <span className="text-white font-semibold hover:text-[#80e038]">
            {ethGas} GWEI
          </span>
        </span>
      </div>
    </nav>
  );
};

export default Header;

