import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const BookmarkContext = createContext();

export default function BookmarkContextProvider({children}){
    const [bookmarks, setBookmarks] = useState([]);
    const loadBookmarks = async () => {
        AsyncStorage.getItem("movies").then(data => data ? JSON.parse(data): []).then(bookmarks => setBookmarks(bookmarks)).catch(err => console.log(err))
    }
    const updateAsyncStorage = async() => {
        await AsyncStorage.setItem("movies", JSON.stringify(bookmarks));
    }

    const addBookmarks = ({movie}) => {
        setBookmarks(prev => [...prev, movie]);
    }

    const removeBookmark = (id) => {
        if(isBookmarked(id)){
            let updatedBookmarks = bookmarks.filter((bookmark) => bookmark.id!==id);
            setBookmarks(updatedBookmarks);
        }
        else{
            console.log("Movie isn't it bookmarks.")
        }
    }

    const isBookmarked = (id) => {
        return bookmarks.some((bookmark) => bookmark.id===id);
    }

    useEffect(() => {
        loadBookmarks();
        
    }, [])
    useEffect(() => {
        updateAsyncStorage();
    }, [bookmarks])

    return(
        <BookmarkContext.Provider value={{bookmarks, addBookmarks, isBookmarked, removeBookmark}}>
            {children}
        </BookmarkContext.Provider>
    )
}