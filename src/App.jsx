import axios from "axios";
import React, { useEffect, useState } from "react";

function App() {
  const [userData, setuserData] = useState([]);
  const [page, setPage] = useState(1);
  const getData = async () => {
    let url = `https://picsum.photos/v2/list?page=${page}&limit=12`;
    const images = await axios.get(url);
    setuserData(images.data);
  };

  useEffect(() => {
    getData();
  }, [page]);

  let printUserData = <h1 className="font-extrabold text-7xl"> Loading... </h1> ;
  if (userData.length > 0) {
    printUserData = userData.map(function (elem, idx) {
      return (
        <div key={idx}>
          <a href={elem.url}>
            <div className="h-40 w-44 overflow-hidden rounded-2xl ">
              <img
                className="object-cover w-full h-full"
                src={elem.download_url}
                alt=""
              />
            </div>
            <h2>{elem.author}</h2>
          </a>
        </div>
      );
    });
  }
  return (
    <div className="w-full">
         <h1 className="text-center text-6xl font-bold text-amber-300  mt-5 font-mono bb">Image Gallery</h1>
      <div className="flex flex-wrap justify-around p-10  gap-3">
        {printUserData}
      </div>
      <div className="flex justify-center items-center m-2 gap-4">
        <button
          className="bg-amber-300 rounded-2xl px-4 py-2 font-mono text-black cursor-pointer active:scale-90"
          onClick={() => {
            if (page > 1) 
            {setPage(page - 1);
            setuserData([]);}
          }
        }
        >
          Prev
        </button>
        <h4>{page}</h4>
        <button
          className="bg-amber-300 rounded-2xl px-4 py-2 font-mono text-black cursor-pointer active:scale-90"
          onClick={() => {
            setPage(page + 1);
            setuserData([]);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
