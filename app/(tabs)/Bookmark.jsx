import { useContext } from 'react'
import { BookmarkContext } from '../../contexts/BookmarkContext'
import { FlatList, Image, Text, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Images from '../../assets/images/Images';
import MovieCard from '../../components/MovieCard';


export default function Bookmark(){
  const {bookmarks} = useContext(BookmarkContext);
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
        <Image source={Images.bg} className="absolute w-full z-0"/>
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
          <Text className="text-bold text-white text-[20px] font-bold mt-8">Saved</Text>
          {!!bookmarks && bookmarks.length>0 && <FlatList 
                                    data={bookmarks} 
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
                                    scrollEnabled={false}


                                    />}


        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>

        
        

  )
  
}