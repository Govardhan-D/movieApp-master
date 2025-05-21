import { useState, useEffect } from "react"

const useFetch = (fetchFunction, autofetch=true) => {
    const [data, setData]  = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchData = async() => {
        try{
            setError(null)
            setLoading(true);
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

    return {data, loading, error, refetch: fetchData, reset};
}


export default useFetch;