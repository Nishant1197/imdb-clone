import React from 'react'

function Pagination({pageNo,forward,backward}) {


  return (
    <div className="flex justify-center py-4">
        <button className='px-2 border-indigo-500 border-2  text-indigo-500 rounded-l-xl  ' onClick={backward} >Previous</button>
        <button className='px-2 border-indigo-500 border-2 text-indigo-500 border-l-0 bg-gray-300'>{pageNo}</button>
        <button className='px-2 border-indigo-500 border-2 text-indigo-500 rounded-r-xl border-l-0' onClick={forward}>Next</button>
    </div>
  )
}

export default Pagination;