import { Link } from "expo-router";
import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { BookmarkContext } from "../contexts/BookmarkContext";
import { useContext, useState } from "react";
import Icons from "../assets/icons/icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function MovieCard({movie}){
  const {bookmarks, addBookmarks, isBookmarked, removeBookmark} = useContext(BookmarkContext);
  const bookmarked = isBookmarked(movie.id);    
  const genre_mapping = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ]

    const IMG_BASE_URL = "https://image.tmdb.org/t/p/w185/";
    const URL = `${IMG_BASE_URL}${movie.poster_path}`
    let genres = genre_mapping.filter((genre) => movie.genre_ids.includes(genre.id));
    let genre_names = genres.reduce((genre_names, curr_name)=>genre_names.concat(curr_name['name']), []);
    if(genre_names.length>2){
        genre_names = genre_names.slice(0,2);
    }
    genre_names = genre_names.join(' • ')

    
    return(
      <Link href={`/movies/${movie.id}`} asChild>
        <TouchableOpacity className="w-[30%]" on>
            <View className="relative">
              <Image
              source={{ uri: URL }}
              className="w-full h-52 rounded-lg"
              resizeMode="cover"
              />
              <Pressable onPress={() => {
                if(!bookmarked) {
                  addBookmarks({movie});
                }
                else{
                  removeBookmark(movie.id)
                }
              }
            } className="absolute right-1 top-1 z-99">
                <MaterialIcons name={bookmarked ? "bookmark": "bookmark-border"} size={24} color="white" />
              </Pressable>

            </View>
            
            <Text className="text-white font-bold text-sm mt-2" numberOfLines={1}>{movie.title}</Text>
            <Text className="text-white text-[10px] font-bold mt-[8px]">⭐ {movie.vote_average.toFixed(1)}</Text>
            <Text className="text-white font-medium text-[10px] mt-[5px]">{genre_names}</Text>
        </TouchableOpacity>
      </Link>
    )
}