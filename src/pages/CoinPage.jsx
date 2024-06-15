import { useState } from 'react';
import { useGetCoinDataQuery } from "../services/cryptoApi";
import { useParams } from "react-router-dom";
import { FaCaretUp, FaCaretDown, FaRegStar, FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom"
import Calculator from "../components/Calculator";
import Chart from "../components/Chart";

const CoinPage = () => {
  const { id } = useParams();
  const { data, isFetching } = useGetCoinDataQuery(id);

  const [typeButton, setTypeButton] = useState('prices');
  const [timeButton, setTimeButton] = useState(1);

  const [showFullDescription, setShowFullDescription] = useState(false);

  let description = data?.description.en;

  if (!showFullDescription) {
    description = description?.substring(0, 500) + '...';
  }

  const handleTypeButtonClick = (buttonName) => {
    setTypeButton(buttonName);
  };

  const handleTimeButtonClick = (buttonName) => {
    setTimeButton(buttonName);
  };

  const formatNumber = (num) => {
    return num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 20,
    });
  };

  const highlightText = (text) => {
    const styledText = text.replace(
      /<a.*?>(.*?)<\/a>/g,
      '<span style="font-weight: bold; color: white; text-decoration: underline;">$&</span>'
    );
    return { __html: styledText };
  };
  
  if (isFetching) return <div className="bg-[#0d1217] min-h-screen"></div>;

  return (
    <div className="bg-[#0d1217] min-h-screen">
      <div className="mx-auto max-w-7xl flex flex-col">
        <div className="col-start-1 ml-8 flex items-center">
          <ol className="flex items-center space-x-4 list-none mt-4">
            <Link className="flex truncate" to={"/"}>
              <span className="text-[#dfe5ec] font-medium text-sm leading-5 hover:text-[#80e038]">Cryptocurrencies</span>
            </Link>
            <FaAngleRight className="text-[#dfe5ec] far ml-4" />
            <span className="text-[#7a8a9e] font-medium text-sm leading-5">{data.name} Price</span>
          </ol>
        </div>
        <div className="flex-1 flex">
          <div className="flex-1"> 
            <div className="mb-2 flex items-center ml-8 mt-4 gap-x-2">
              <img src={data.image.large} alt={data.name} className="w-6 h-6" />
              <h1 className="font-bold text-[#dfe5ec] text-lg leading-7">{data.name}</h1>
              <span className="font-normal text-[#5f6c7b] text-sm leading-5 mt-0.5">{data.symbol.toUpperCase()} Price</span>
              <span className="inline-flex items-center rounded-md bg-[#1c2732] px-1.5 py-0.5 mt-0.5 mr-3">
                <div className="text-xs leading-4 text-[#7a8a9e] font-medium">#{data.market_cap_rank}</div>
              </span>
            </div>
            <div className="mb-2 flex items-center ml-8">
              <div className="font-bold text-[#dfe5ec] text-3xl leading-10">${formatNumber(data.market_data.current_price.usd)}</div>
              <div className="font-bold text-[#dfe5ec] text-lg leading-7">
                <span className={data.market_data.price_change_percentage_24h >= 0 ? "text-right text-[#32ca5b]" : "text-right text-[#ff3a33]"}>
                  {data.market_data.price_change_percentage_24h > 0 && <FaCaretUp className="inline-block w-5 h-5 mb-2 ml-1" />}
                  {data.market_data.price_change_percentage_24h < 0 && <FaCaretDown className="inline-block w-5 h-5 mb-2 ml-1" />}
                  {Math.abs(data.market_data.price_change_percentage_24h.toFixed(1))}%
                </span>
              </div>
            </div>    
            <div className="mt-1 mb-2 ml-8">
              <button className="bg-[#1b232d] border-2 border-b-4 border-[#4a6382] text-[#dfe5ec] items-center justify-start font-semibold text-inline rounded-lg select-none focus:outline-none px-2.5 py-1.5 flex w-80 hover:bg-[#212d3b]">
                <FaRegStar className="inline-block mr-2 mb-0.5 text-lg"/>Add to Favorites</button>
            </div>
            <div className="flex flex-col ml-8">
              <div className="block">
                <table className="w-80 border-b border-[#212d3b]">
                  <tbody className="grid grid-cols-1 divide-y divide-[#212d3b]">
                    <tr className="flex justify-between py-3">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">Market Cap</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">${data.market_data.market_cap.usd.toLocaleString()}</td>
                    </tr>
                    <tr className="flex justify-between py-3 border-t border-[#212d3b]">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">Fully Diluted Valuation</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">${data.market_data.fully_diluted_valuation.usd.toLocaleString()}</td>
                    </tr>
                    <tr className="flex justify-between py-3 border-t border-[#212d3b]">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">24 Hour Trading Vol</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">${data.market_data.total_volume.usd.toLocaleString()}</td>
                    </tr>
                    <tr className="flex justify-between py-3 border-t border-[#212d3b]">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">Circulating Supply</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">{data.market_data.circulating_supply.toLocaleString()}</td>
                    </tr>
                    <tr className="flex justify-between py-3 border-t border-[#212d3b]">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">Total Supply</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">{data.market_data.total_supply.toLocaleString()}</td>
                    </tr>
                    <tr className="flex justify-between py-3 border-t border-[#212d3b]">
                      <th className="text-[#7a8a9e] font-medium text-sm leading-5 text-left">Max Supply</th>
                      <td className="text-[#dfe5ec] font-semibold text-sm leading-5 text-right">{data?.market_data?.max_supply ? data.market_data.max_supply.toLocaleString() : '∞'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Calculator data={data} />
            </div>
          </div>
          <div className="w-full border-l border-[#212d3b] ml-4">
            <div className="flex gap-1 justify-between mb-2">
              <div className="ml-4 flex flex-wrap rounded-lg bg-[#1b232d] text-[#7a8a9e] py-1 px-1 font-semibold text-sm">
                <button
                  onClick={() => handleTypeButtonClick('prices')}
                  className={typeButton === 'prices' ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  Price
                </button>
                <button
                  onClick={() => handleTypeButtonClick('market_caps')}
                  className={typeButton === 'market_caps' ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  Market Cap
                </button>
              </div>
              <div className="mr-2 flex justify-end rounded-lg bg-[#1b232d] text-[#7a8a9e] py-1 px-1 font-semibold text-sm">
                <button
                  onClick={() => handleTimeButtonClick(1)}
                  className={timeButton === 1 ? 'bg-[#0d1217] text-[#dfe5ec] px-2 rounded-lg' : 'px-2 rounded-lg'}
                >
                  24h
                </button>
                <button
                  onClick={() => handleTimeButtonClick(7)}
                  className={timeButton === 7 ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  7d
                </button>
                <button
                  onClick={() => handleTimeButtonClick(30)}
                  className={timeButton === 30 ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  1m
                </button>
                <button
                  onClick={() => handleTimeButtonClick(90)}
                  className={timeButton === 90 ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  3m
                </button>
                <button
                  onClick={() => handleTimeButtonClick(365)}
                  className={timeButton === 365 ? 'bg-[#0d1217] text-[#dfe5ec] py-1 px-2 rounded-lg' : 'py-1 px-2 rounded-lg'}
                >
                  1y
                </button>
              </div>
            </div>
            <Chart id={id} days={timeButton} type={typeButton}/>
            <div className="font-bold text-[#dfe5ec] ml-4">What is {data.name}?</div>
            <div className="text-[#7a8a9e] text-sm ml-4 -mb-0.5" dangerouslySetInnerHTML={ highlightText(description) }></div>
            <button onClick={() => setShowFullDescription((prevState) => !prevState)} className="text-sm font-bold text-[#dfe5ec] underline hover:text-[#80e038] ml-4">
              {showFullDescription ? 'Show Less' : 'Read More'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoinPage;
