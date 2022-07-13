import React, { useRef } from 'react'
import { useEffect, useState } from 'react/cjs/react.development'
import Pagination from './Pagination';

function Favourite() {
  let genreids = {
    28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History', 27: 'Horror', 10402: 'Music', 9648: 'Mystory', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'THriller', 10752: 'War', 37: 'Western'
  }
  const people = [
    {
      name: 'Jane Cooper',
      title: 'Regional Paradigm Technician',
      department: 'Optimization',
      role: 'Admin',
      email: 'jane.cooper@example.com',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
    },
    // More people...
  ]
  let [fav, setfav] = useState([]);
  let [curgenres, setcurgenres] = useState("All-Genres")
  let [search, setsearch] = useState("");
  let [rating,setrating]=useState(0);
  let [popularity,setpopularity]=useState(0);
  let[rows,setrows]=useState(5);
  let[page,setpage]=useState(1);
  function goAhead()
  {
    if(page<maxPage)
    setpage(page+1);
  }
  function goBack()
  {
    if(page>1)
    setpage(page-1);
  }
  useEffect(() => {


    setfav([...JSON.parse(localStorage.getItem("favmovie"))])

  }, [])



  // Filter of genres
  let arr = fav.map((f) => {
    return genreids[f.genre_ids[0]]

  })
  arr = new Set(arr)
  let genres = [...arr]

  // filer fav based on genres
  let filterfav;
  curgenres == "All-Genres" ? filterfav = fav : filterfav = fav.filter((f) => {
    return genreids[f.genre_ids[0]] == curgenres
  })

//sorting
if(rating==1)
{ 
 
filterfav=filterfav.sort(function(obj1,obj2){
  return obj2.vote_average-obj1.vote_average
})
}
if(rating==-1)
{ 
 
filterfav=filterfav.sort(function(obj1,obj2){
  return obj1.vote_average-obj2.vote_average
})
}
if(popularity==1)
{ 
 
filterfav=filterfav.sort(function(obj1,obj2){
  return obj2.popularity-obj1.popularity
})
}
if(popularity==-1)
{ 
 
filterfav=filterfav.sort(function(obj1,obj2){
  return obj1.popularity-obj2.popularity
})
}

  // searching 
  filterfav = filterfav.filter((f) => {
    return f.title.toLowerCase().includes(search.toLowerCase())
  })

 
  //pagination
  let maxPage=Math.ceil(filterfav.length/rows)
  let si=(page-1)*rows
  let ei=Number(si)+Number(rows)
filterfav=filterfav.slice(si,ei);

function remove(movie) {
  let newArray = fav.filter((fav) => {
    return fav.id != movie.id
  })
  setfav([...newArray]);
  localStorage.setItem("favmovie", JSON.stringify(newArray));
}
  return (
    <>
      <div className='flex justify-center flex-wrap py-4'>

        <button className={
          curgenres == "All-Genres" ?
            `bg-blue-500 text-white px-2 py-2 mx-1 font-2xl border rounded-xl` : "bg-gray-500 text-white px-2 py-2 mx-1 font-2xl border rounded-xl"} onClick={() => { setcurgenres("All-Genres") }}  >All-Genres</button>
        {




          genres.map((obj) => {

           
            return <button  className={
          
              curgenres == obj ?
                `bg-blue-500 text-white px-2 py-2 mx-1 font-2xl border rounded-xl` : "bg-gray-500 text-white px-2 py-2 mx-1 font-2xl border rounded-xl"} onClick={() => {setpage(1)
                   setcurgenres(obj) }} >{obj}</button>
          })
        }

      </div>
      <div className='flex justify-center'>
        <input type="text" className='border ' placeholder='search' onChange={(e) =>  setsearch(e.target.value) } ></input>
        <input type="number" className='border mx-2' placeholder='rows' value={rows} onChange={(e)=>setrows(e.target.value) } ></input>


      </div>
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <span class="material-icons" onClick={()=>{
                       setpopularity(0)  
                  setrating(1)
         
                }}>
                  arrow_upward
                </span>

                Rating
                <span class="material-icons" onClick={()=>{        
                      setpopularity(0)  
                  setrating(-1)
                }}>
                  arrow_downward
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                 <span class="material-icons" onClick={()=>{
                   setrating(0)
                 setpopularity(1)
                 }}>
                  arrow_upward
                </span>

                Popularity
                <span class="material-icons" onClick={()=>{
                              setrating(0)
                            setpopularity(-1)

                }}>
                  arrow_downward
                </span>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Genre
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Remove
              </th>
              <th scope="col" className="relative px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
          
            {filterfav.length > 0 && filterfav.map((movie) => (
              <tr key={movie.email}>
                
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full " src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                      <div className="text-sm text-gray-500">{movie.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{movie.vote_average}</div>
                  <div className="text-sm text-gray-500">{movie.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    {movie.popularity}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{genreids[movie.genre_ids[0]]}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <a href="#" className="text-indigo-600 hover:text-indigo-900 " onClick={()=>remove(movie)}>
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination pageNo={page} forward={goAhead} backward={goBack} />
    </>
  )

}

export default Favourite