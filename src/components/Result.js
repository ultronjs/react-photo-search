import React, { useEffect, useState } from "react";
import PreloadImage from "./PreloadImage";
import Sidebar from "./sidebar";
import Loading from './Loading'
import { useResultContext } from "../contexts/ResultContextProvider"

function Result() {
  const {
    results,
    isLoading,
    searchTerm,
    getResults,
    currentPageNumber,
    setCurrentPageNumber,
    toggle,
    setToggle,
  } = useResultContext();

  const handleToggle = (photoId) => {
    if(photoId === toggle.photoId){
      setToggle((pre) => !pre);
    }
    else{
      setToggle((pre) => ({ ...pre,status: true, photoId: photoId }));
    }    
  };

  useEffect(() => {
    getResults(currentPageNumber);
  }, [searchTerm,currentPageNumber]);

  console.log(toggle)
  if (isLoading) return <Loading />;
    return (
      <div
        className={toggle.status ? "container container_toggle" : "container"}
      >
        <div className={toggle.status ? "card_list_toggle" : "card-list"}>
          {results?.map(({ id, author, download_url }, index) => {
            return (
              <div className="card" key={id}>
                <PreloadImage
                  lazy={index > 20}
                  src={download_url}
                  width="50%"
                  height="50%"
                  className="card--image card_placeholder_background"
                  onClick={() => handleToggle(id)}
                />
              </div>
            );
          })}
        </div>
        {toggle.status && (
          <Sidebar
            imgDetails={results.filter((item) => item.id === toggle.photoId)}
            close={() => setToggle({ status: false, photoId: 0 })}
          />
        )}
        <div className="result_footer">
          <button
            className="btn btn_dark_outline"
            onClick={() => setCurrentPageNumber((prev) => prev - 1)}
            disabled={currentPageNumber === 1}
          >
            Prev
          </button>
          <button
            className="btn btn_dark_outline"
            onClick={() => setCurrentPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
    );
}

export default Result