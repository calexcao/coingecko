import logo from '../assets/images/logo.png'

const Navbar = () => {
  return (
    <>
      <nav className="bg-[#0d1217] border-b border-[#212d3b]">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
              <a className="flex flex-shrink-0 items-center mr-4" href="/">
                <img className="h-10 w-auto" src={logo} alt="CoinGecko" />
                <span className="hidden md:block text-[#dfe5ec] text-2xl font-bold ml-2">
                  CoinGecko
                </span>
              </a>
              <div className="flex space-x-2">
                <a href="/" className="text-[#dfe5ec] text-sm px-3 py-2 hover:text-[#4bcc00]">
                  Home
                </a>
                <a href="/" className="text-[#dfe5ec] text-sm px-3 py-2 hover:text-[#4bcc00]">
                  Exchanges
                </a>
                <a href="/" className="text-[#dfe5ec] text-sm px-3 py-2 hover:text-[#4bcc00]">
                  NFT
                </a>
                <a href="/" className="text-[#dfe5ec] text-sm px-3 py-2 hover:text-[#4bcc00]">
                  Learn
                </a>
                <a href="/" className="text-[#dfe5ec] text-sm px-3 py-2 hover:text-[#4bcc00]">
                  Products
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar