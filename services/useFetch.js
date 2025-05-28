import { useState, useEffect } from "react"

const useFetch = (fetchFunction, autofetch=true, infiniteScrolling=false) => {
    const [data, setData]  = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    
    

    const fetchData = async() => {
        console.log("fetching Data");
        try{
            setError(null)
            setLoading(true);
            let result = await fetchFunction({page});
            setPage(2);
            setData(result);
        }
        catch(err){
            setError(err);
            console.log(err);
        }finally{
            setLoading(false);
        }
        
    }
    const loadMore = async () => {
      try {
        const next = page + 1
        const moreData = await fetchFunction({ page: next });
        
        setData(prev => [...prev, ...moreData]);
        setPage(next);

      } catch (err) {
        console.error("Error loading more data", err);
        setError(err)
      }
    };
    
    
    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }
    

    useEffect(() => {
        if(autofetch){
            fetchData();
        }
    },[])


    return {data, loading, error, page, setPage, refetch: fetchData, reset, setData, loadMore};
}


export default useFetch;