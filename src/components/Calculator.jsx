import { useState } from 'react'

const Calculator = ({ data }) => {
  const [cryptoValue, setCryptoValue] = useState(1);
  const [usdValue, setUsdValue] = useState(data?.market_data?.current_price.usd);

  const handleCryptoChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setCryptoValue(value);
      setUsdValue(value * data?.market_data?.current_price.usd);
    } else {
      setCryptoValue(value);
      setUsdValue("NaN");
    }
  };

  const handleUsdChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      setUsdValue(value);
      setCryptoValue(value / data?.market_data?.current_price.usd);
    } else {
      setUsdValue(value);
      setCryptoValue("NaN");
    }
  };

  return (
    <>
      <div className="text-[#dfe5ec] mt-4 font-bold text-lg leading-7 mb-2">{data.symbol.toUpperCase()} Converter</div>
      <div className="flex flex-col gap-y-0.5 w-80 bg-[#0d1217] text-sm">
        <div className="flex rounded-t-lg h-10 border-2 border-[#212d3b] focus-within:border-[#7ad735]">
          <input 
            type="text" 
            className="h-full w-11/12 p-2 text-[#dfe5ec] bg-transparent focus:outline-none" 
            value={cryptoValue}
            onChange={handleCryptoChange}
          />
          <span className="p-2 text-[#7a8a9e]">{data.symbol.toUpperCase()}</span>
        </div>
        <div className="flex rounded-b-lg h-10 border-2 border-[#212d3b] focus-within:border-[#7ad735]">
          <input 
            type="text" 
            className="h-full w-11/12 p-2 text-[#dfe5ec] bg-transparent focus:outline-none" 
            value={usdValue}
            onChange={handleUsdChange}
          />
          <span className="p-2 text-[#7a8a9e]">USD</span>
        </div>
      </div>
    </>
  )
}

export default Calculator
