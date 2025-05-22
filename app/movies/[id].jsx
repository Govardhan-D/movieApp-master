import { useLocalSearchParams } from "expo-router";
import { Text, Image, View } from "react-native";
import { SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import useFetch from "../../services/useFetch";
import fetchMovies from "../../services/api";
import Icons from "../../assets/icons/icons";

export default function MovieInfo(){
    const {id} = useLocalSearchParams();

    const { data, loading, error } = useFetch(() => 
    fetchMovies({
      movieId: id,
    })
    )
    const url = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
    console.log(url)

    return(
            <View className="flex-1 bg-primary">
              {loading && <Text>Loading...</Text>} 
              {data && 
              <View>
                <View className="relative">
                    <Image source={{uri: url}} className="w-full h-[550]" resizeMode="cover"/> 
                    <View className="w-[50] h-[50] flex flex-1 justify-center items-center bg-white z-10 rounded-full absolute top-[95%] right-[20]">
                        <Image source={Icons.play} className="w-[20] h-[24]"/>
                    </View>
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-[20px] text-white mt-[18]">{data.title}</Text>
                </View>

              </View>
              }
            </View>
    )
}