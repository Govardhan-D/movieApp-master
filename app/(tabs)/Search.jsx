import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import { useRouter } from "expo-router";
import useFetch from '../../services/useFetch';
import fetchMovies from '../../services/api';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Images from '../../assets/images/Images';
import Icons from '../../assets/icons/icons';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import { useState, useEffect, useRef } from 'react';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  console.log('searchQuery:', searchQuery, typeof searchQuery);


  const { data, loading, error, refetch, reset } = useFetch(() => 
        fetchMovies({
        query: searchQuery
        }), false
  )
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim()) {
        refetch();
      } else{
        reset()
      }
    }, 500); 

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
        <Image source={Images.bg} className="absolute w-full z-0"/>
        <ScrollView className="justifyCenter itemsCenter px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
          <Image source={Icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          <SearchBar onPress={() => {}} onChangeText={(text) => {setSearchQuery(String(text))}}/>
          {searchQuery && <Text className="text-white font-thin mt-2">search results for <Text className="font-bold">{searchQuery}</Text></Text>}

          {loading && <Text>Loading...</Text>}
          

          {data && data.length>0 && <FlatList 
                                    data={data} 
                                    renderItem={({item}) => <MovieCard movie={item} />}  
                                    keyExtractor={(item) => item.id.toString()}
                                    numColumns={3}
                                    columnWrapperStyle={{
                                      justifyContent: "center",

                                      gap: 16,
                                      marginVertical: 16,
                                      paddingRight: 5,
                                      marginBottom: 10,
                                    }}
                                    className="mt-2 pb-32"
                                    scrollEnabled={false}
                                    contentContainerStyle={{paddingBottom: 100}}
                                    ListEmptyComponent={() =>
                                      !loading && !error ? (
                                        <Text className="text-white-50">No Results found</Text>
                                      ) : null
                                    }


                                    />}

                {error && <Text className="text-white">{error.message || String(error)}</Text>}

        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default Search