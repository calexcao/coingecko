import { BiArrowToTop } from "react-icons/bi";

const ToTop = () => {

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      type="button"
      className="fixed bottom-0 right-0 m-5 z-10 bg-[#212d3b] px-3 py-2 rounded-lg text-[#dfe5ec] font-bold text-xl select-none focus:outline-none hover:bg-[#384a61]"
    >
      <BiArrowToTop />
    </button>
  );
};

export default ToTop;
