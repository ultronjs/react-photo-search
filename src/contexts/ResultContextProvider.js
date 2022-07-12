import React,{createContext,useContext,useState} from "react";

const ResultContext = createContext()

export const ResultContextProvider = ({children}) => {
    const [results,setResults] = useState([])
    const [isLoading,setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState("Mercedes");
    const [currentPageNumber, setCurrentPageNumber] = useState(1);
    console.log(searchTerm);

    const getResults = async (pageNumber=1) => {
      setLoading(true);

      const response = await fetch(`https://picsum.photos/v2/list?page=${pageNumber}&limit=40`,{
        method:'GET'
      }
      ).then(res => res.json()).then(data => {
        console.log(data)
        setResults(data)
        setLoading(false)}).catch(error => console.log(error));
    };

    
    console.log(results);
    return (
      <ResultContext.Provider
        value={{
          results,
          isLoading,
          searchTerm,
          getResults,
          setSearchTerm,
          currentPageNumber,
          setCurrentPageNumber,
        }}
      >
        {children}
      </ResultContext.Provider>
    );
}

export const useResultContext = () => useContext(ResultContext)


