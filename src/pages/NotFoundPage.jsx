import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <section className='text-center flex flex-col py-24 items-center min-h-screen bg-[#0d1217] text-[#dfe5ec]'>
      <FaExclamationTriangle className='text-[#fae988] text-6xl mb-4' />
      <h1 className='text-6xl font-bold mb-4'>404 Not Found</h1>
      <p className='text-xl mb-5'>This page does not exist</p>
      <Link
        to='/'
        className='text-[#dfe5ec] bg-[#1b232d] hover:bg-[#19271a] hover:text-[#80e038] rounded-md px-3 py-2 mt-4 font-bold'
      >
        Go Back
      </Link>
    </section>
  );
};
export default NotFoundPage;