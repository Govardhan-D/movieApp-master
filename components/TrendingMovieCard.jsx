import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import { Link } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import MovieCard from "./MovieCard";
import Images from "../assets/images/Images";

export default function TrendingMovieCard({movie, index}){
    console.log(movie.movie_id)

    return(
    <Link href={`/movies/${movie.movie_id}`} asChild>
        <TouchableOpacity className="w-32 relative">
            <Image source={{uri: movie.poster_path}} className="w-full h-52 rounded-lg" resizeMode="cover"/> 
            <View className="absolute -bottom-20  px-0.5 rounded-full">
                    <MaskedView
                        maskElement={
                        <Text className="font-bold text-white  text-6xl">{index + 1}</Text>
                        }
                    >
                        <Image
                        source={Images.gradient}
                        className="size-14 "
                        resizeMode="cover"
                        />
                    </MaskedView>
            </View>
            <Text className="text-sm font-bold mt-2 text-light-200 ml-2" numberOfLines={1}>
            {movie.title}
            </Text>
            
        </TouchableOpacity>
    </Link>

    )
}