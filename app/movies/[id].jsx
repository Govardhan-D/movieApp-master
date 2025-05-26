import { useLocalSearchParams } from "expo-router";
import { Text, Image, View, ImageBackground, ScrollView, Button, TouchableOpacity, Linking, StyleSheet } from "react-native";
import useFetch from "../../services/useFetch";
import fetchMovies from "../../services/api";
import Icons from "../../assets/icons/icons";
import { convertDate, convertRuntime, genreMapping } from "../../services/utils";
import InfoBox from "../../components/InfoBox";
import { useState, useCallback } from "react";
import YoutubePlayer from 'react-native-youtube-iframe'

export default function MovieInfo(){
    const {id} = useLocalSearchParams();
    

    const { data, loading, error } = useFetch(() => 
    fetchMovies({
      movieId: id,
    })
    )
      const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
      if (state === "ended") {
        setPlaying(false);
      }
    }, []);

    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);


    const url = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
    console.log(url)
    const runtime = convertRuntime(data?.runtime);
    const release_date = convertDate(data?.release_date);

    const genres = data?.genres.map((genre) => genre.name);
    const countries = data?.production_countries.map((country) => country.name).join('  •  ');
    const budget = (data?.budget/1000000).toFixed(1).replace(/\.0$/, '') + ' million';
    const revenue = (data?.revenue/1000000).toFixed(1).replace(/\.0$/, '') + ' million';
    const companies = data?.production_companies.map((company) => company.name).join('  •  ');
    const trailers = data?.videos?.results.filter((video) => video.type==="Trailer" && video.site==="YouTube");
    let trailerKey = 
    trailers ? trailerKey = trailers[0].key : trailerKey = "No Trailer";
    console.log(trailerKey)
    function DataBox({content}){
      return(
        <View className="py-[6px] px-[10px] bg-[#221F3D] rounded-[4px] max-w-[116px] flex justify-center items-center">
          <Text className="font-bold text-[12px] text-white">{content}</Text>
        </View>
      )
    }

    return(
            <View className="flex-1 bg-primary">
              {loading && <Text>Loading...</Text>} 
              {data && 
              <ScrollView>
                <View className="relative">
                    <ImageBackground source={{uri: url}} className="w-full h-[200] z-0" resizeMode="cover" style={StyleSheet.absoluteFillObject}/> 
                    {trailerKey &&
                        <View className="relative">
                          <YoutubePlayer
                            height={300}
                            play={true}
                            videoId={trailerKey}
                            onChangeState={onStateChange} 
                              initialPlayerParams={{
                              controls: 0,    // Hide all controls
                              modestbranding: true, // Less YouTube branding
                              rel: 0,          // Don’t show related videos
                              showinfo: 0,     // Deprecated, but was used to hide video info
                              fs: 0,           // Hide fullscreen button
                            }}

                            />
                          
                        </View>
                    }

                    

                    
                    
                    <TouchableOpacity className="w-[50] h-[50] flex flex-1 justify-center items-center bg-white z-10 rounded-full absolute top-[95%] right-[20]" onPress={() => Linking.openURL( `https://www.youtube.com/watch?v=${trailers[0].key}`)}>
                        <Image source={Icons.play} className="w-[20] h-[24]" />
                    </TouchableOpacity>
                </View>
                <View className="px-5">
                    <Text className="font-bold text-[20px] text-white mt-[18]">{data.title}</Text>
                    <Text className="font-normal text-[14px] mt-[10] text-[#A8B5DB]">{data.release_date.split('-')[0]} • {runtime.hours}h {runtime.minutes}m</Text>
                </View>
                <View className="px-5 mt-[10]">
                  <DataBox content={"⭐ "+data.vote_average.toFixed(1)}/>

                </View>
                <InfoBox title="Overview" content={data.overview}/>
                <View className="flex flex-row">
                  <InfoBox title="Release Date" content={release_date} />
                  <InfoBox title="Status" content={data.status} />
                </View>
                <InfoBox title="Genres" renderChild={() => genres.map((genre, index) => <DataBox key={index} content={genre} />)} />
                <InfoBox title="Countries" renderChild={() => <Text className="text-[#D6C7FF] text-[14px]">{countries}</Text>} />
                <View className="flex flex-row">
                  <InfoBox title="Budget" content={"$ " + budget} />
                  <InfoBox title="Status" content={"$ "+ revenue} />
                </View>
                <InfoBox title="Tagline" content={data.tagline} />
                <InfoBox title="Companies" content={companies} />
                <View className="px-5 py-3 mb-10">
                  <TouchableOpacity
                  className="px-6 py-3 w-full flex justify-center items-center bg-[#D6C7FF] rounded-[4px]"
                  onPress={() => Linking.openURL(data.homepage)}
                >
                  <Text className="text-black font-semibold">Visit Homepage</Text>
                </TouchableOpacity>

                </View>


              </ScrollView>
              }
              {error && <Text className="text-red-400">Error Fetching Movies</Text>}
            </View>
    )
}