import Navbar from "./components/Navbar";
import Banner from "./components/Banner"
import Movies from "./components/Movies";
import Pagination from "./components/Pagination";
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Favourite from "./components/Favourite";

function App() {
  return (
    <BrowserRouter>
      <div className="App">

        <Navbar />
        
      <Routes>
        <Route path="/" element={
        <>
        <Banner/>
        <Movies />
     
        </>
        }></Route>
      <Route path="/favourite" element={<Favourite/>}>

      </Route>
      </Routes>
     
    </div>
    </BrowserRouter>
  );
}

export default App;
