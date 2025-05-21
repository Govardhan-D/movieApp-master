import { View, Text, Image, ScrollView, FlatList } from 'react-native'
import { useRouter } from "expo-router";
import useFetch from '../../services/useFetch';
import fetchMovies from '../../services/api';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Images from '../../assets/images/Images';
import Icons from '../../assets/icons/icons';
import SearchBar from '../../components/SearchBar';
import MovieCard from '../../components/MovieCard';
import { useState, useEffect } from 'react';


const Search = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const { data, loading, error, refetch } = useFetch(() => 
        fetchMovies({
        query: searchQuery
        }), false
  )
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchQuery.trim() !== '') {
        refetch();
      }
    }, 500); // 500ms delay

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);


  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
        <Image source={Images.bg} className="absolute w-full z-0"/>
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
          <Image source={Icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />

          <SearchBar onPress={() => {}} onChangeText={(text) => {setSearchQuery(text)}}/>
          {loading && <Text>Loading...</Text>}
          {data && data.length>0 && <FlatList 
                                    data={data} 
                                    renderItem={({item}) => <MovieCard {...item} />}  
                                    keyExtractor={(item) => item.id.toString()}
                                    numColumns={3}
                                    columnWrapperStyle={{
                                      justifyContent: "flex-start",
                                      gap: 20,
                                      paddingRight: 5,
                                      marginBottom: 10,
                                    }}
                                    className="mt-2 pb-32"
                                    scrollEnabled={false}


                                    />}

          {error && <Text className="text-white">{error}</Text>}
          <Text className="text-white">{searchQuery}</Text>

        </ScrollView>


      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default Search