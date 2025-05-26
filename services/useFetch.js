import { useState, useEffect } from "react"

const useFetch = (fetchFunction, autofetch=true, infiniteScrolling=false) => {
    const [data, setData]  = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    
    

    const fetchData = async() => {
        try{
            setError(null)
            setLoading(true);
            if(infiniteScrolling) setPage(prev => prev+1)
            let result = await fetchFunction();
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
        const moreData = await fetchFunction({ page: page });
        setData(prev => [...prev, ...moreData]);
        setPage(prev => prev + 1);
      } catch (err) {
        console.error("Error loading more data", err);
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

    return {data, loading, error, page, refetch: fetchData, reset, setData, loadMore};
}


export default useFetch;