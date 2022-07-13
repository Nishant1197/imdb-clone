import React from 'react'
import Image from "./BannerImg.jpg"
import { useState, useEffect } from 'react'
import Pagination from './Pagination';
import axios from 'axios';
import { Audio } from 'react-loader-spinner'
function Movies() {
  let [page, setpage] = useState(1);
  let [movies, setmovies] = useState([]);
  let [title, settitle] = useState("");
  let [hover, sethover] = useState("");
  let [fav, setfav] = useState([]);
  let mv;
  
  function add(movie) {
   let newArray=[...fav,movie]
    setfav([...newArray]);
    localStorage.setItem("favmovie", JSON.stringify(newArray))

   
  }
  function remove(movie) {
    let newArray = fav.filter((fav) => {
      return fav.id != movie.id
    })
    setfav([...newArray]);
    localStorage.setItem("favmovie", JSON.stringify(newArray));
  }
  function goAhead() {
    setpage(page + 1)
  }
  function goBack() {
    if (page > 1)
      setpage(page - 1)
  }
  

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=80bcab711c5eeb9e1c13a3da533ecb08&page=${page}`)
    .then((res)=>{
      
        
        setmovies(res.data.results);
        setfav([...JSON.parse(localStorage.getItem('favmovie'))])
      })
  }, [page]);


  return (
    <div className=''>
      <div className='text-center font-bold text-xl'>Trending Movies</div>

      <div className='flex  flex-wrap justify-center'>
        {
          movies.length === 0 ?
            <Audio
              heigth="100"
              width="100"
              color='grey'
              ariaLabel='loading'
            /> :

            movies.map((movie) => (
              <div key={movie.id} className={`bg-[url(https://image.tmdb.org/t/p/w500/${movie.backdrop_path})] md:h-[150px] md:w-[120px]
              h-[130px] w-[100px]
        bg-center bg-cover rounded-md flex items-end m-4 hover:scale-110 ease-out duration-300 relative`
              }

                onMouseEnter={() => {
                  sethover(movie.id)

                }
                }
                onMouseLeave={() => {
                  sethover("")
                }}

              >

                <div className={`bg-black h-[40px] w-[120px] 
        rounded-md`}>
                  {
                    hover == movie.id &&
                    <div>
                      {
                        fav.find((m) => m.id == movie.id) ?
                          <div className='bg-blue absolute top-1 right-1 text-2xl bg-gray-900 cursor-pointer' onClick={() => remove(movie)}>❌</div>
                          : <div className='bg-blue absolute top-1 right-1 text-2xl bg-gray-900 cursor-pointer' onClick={() => add(movie)}>😻</div>

                      }
                    </div>
                  }
                  <div className='text-white text-sm text-center font-bold'>{movie.title}</div>
                  

                </div>
              </div>
            ))

        }


      </div>
      <Pagination pageNo={page} forward={goAhead} backward={goBack} />

    </div>
  )
}

export default Movies