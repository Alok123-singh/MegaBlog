import React, { useState } from 'react';
import PostCard from './PostCard';
import { useSelector } from 'react-redux'

const Pagination = ({ items, itemsPerPage }) => {
  const search = useSelector(state => state.search.search);
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the indexes of the items to display on the current page.
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  let pages =[];
  for(let i=1; i <= Math.ceil(items.length/itemsPerPage); i++)  pages.push(i);

  // Change the current page.
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle "Previous" and "Next" button clicks
  const handlePrevious = () => {
    if (currentPage > 1) {
      paginate(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(items.length / itemsPerPage)) {
      paginate(currentPage + 1);
    }
  };

  const check = (post) => {
    return post.title.toLowerCase().includes(search.toLowerCase()) || search === '';
  }

  return (
    <div className='flex flex-wrap flex-col justify-center md:justify-evenly'>
      {/* Display the current page items */}
      <div className='flex flex-wrap justify-center md:justify-evenly'>
        {currentItems.map((item) => {

          return check(item) && <div key={item.$id} className='p-2 w-[18rem]'>
            <PostCard {...item} />
          </div>
        })}
      </div>

      {/* Create the pagination buttons */}
      <div className='w-full flex flex-wrap flex-col justify-center items-center mt-[3rem] mb-[1rem]'>
        <button 
        onClick={handlePrevious}
        className='h-[2.5rem] w-[5rem] m-2 p-2 flex justify-center items-center font-bold bg-blue-500 hover:bg-blue-600 rounded-lg'
        >
          Previous
        </button>

        <div className='flex flex-wrap justify-center items-center'>
            {pages.map((value,index) => (
              <button key={index} onClick={() => paginate(index + 1)} className={`${currentPage == index + 1 && 'bg-gray-700 dark:bg-purple-800'} h-[2.5rem] w-[3rem] m-1 p-1 flex justify-center items-center bg-black dark:bg-gray-800 rounded-lg font-bold text-white dark:text-gray-300`}>
                {value}
              </button>
            ))}
        </div>

        <button 
        onClick={handleNext} 
        className='h-[2.5rem] w-[4.5rem] m-2 p-2 flex justify-center items-center font-bold bg-blue-500 hover:bg-blue-600 rounded-lg'>
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;