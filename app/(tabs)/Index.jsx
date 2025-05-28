import { Text, Image, View, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Images from '../../assets/images/Images'
import Icons from '../../assets/icons/icons'
import fetchMovies from '../../services/api'
import useFetch from '../../services/useFetch'
import { useRouter } from 'expo-router'
import { ActivityIndicator } from 'react-native'
import MovieCard from '../../components/MovieCard'
import SearchBar from '../../components/SearchBar'
import { getTrendingMovies } from '../../services/appwrite'
import TrendingMovieCard from '../../components/TrendingMovieCard'

const Home = () => {
  const router = useRouter();
  const { data, loading, error, page, loadMore } = useFetch(() => 
    fetchMovies({
      query: '', page: page })    
  )
  const {data: trending, loading: trendingLoading, error: trendingError} = useFetch(getTrendingMovies);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
        <Image source={Images.bg} className="absolute w-full z-0"/>
        <View className="px-5">
          <Image source={Icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
          <SearchBar onPress={() => {router.push('/Search')}}/>
          
          <Text className="text-bold text-white text-[20px] font-bold mt-8">Trending Movies</Text>
          {trending?.length>0 && <FlatList 
                                    data={trending} 
                                    renderItem={({item, index}) => <TrendingMovieCard movie={item} index={index}/>} 
                                    ItemSeparatorComponent={() => <View className="w-4" />}
                                    keyExtractor={(movie) => movie.$id}
                                    horizontal={true}
                                    className="mt-2 pb-32"
                                    scrollEnabled={true}
                                    showsHorizontalScrollIndicator={false}
                                    />}

          <Text className="text-bold text-white text-[20px] font-bold mt-8">Latest Movies</Text>
          {Boolean(loading) && <Text>Loading...</Text>}
          {Boolean(data?.length>0) && <FlatList 
                                    data={data} 
                                    renderItem={({item}) => <MovieCard movie={item} />}  
                                    keyExtractor={(item) => item.id.toString()}
                                    numColumns={3}
                                    columnWrapperStyle={{
                                      justifyContent: "flex-start",
                                      gap: 20,
                                      paddingRight: 5,
                                      marginBottom: 10,
                                    }}
                                    className="mt-2 pb-32"
                                    scrollEnabled={true}
                                    onEndReached={loadMore}
                                    onEndReachedThreshold={0.8}
                                    />}

          {Boolean(error) && <Text className="text-white">{error}</Text>}

        </View>
      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default Home