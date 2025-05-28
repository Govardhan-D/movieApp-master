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
      if (state === "playing") {
        setPlaying(true);
      }
    }, []);

    const togglePlaying = useCallback(() => {
      setPlaying((prev) => !prev);
    }, []);


    const backdropURL = `https://image.tmdb.org/t/p/original/${data?.backdrop_path}`;
    const runtime = convertRuntime(data?.runtime);
    const release_date = convertDate(data?.release_date);

    const genres = data?.genres.map((genre) => genre.name);
    const countries = data?.production_countries.map((country) => country.name).join('  •  ');
    const budget = (data?.budget/1000000).toFixed(1).replace(/\.0$/, '') + ' million';
    const revenue = (data?.revenue/1000000).toFixed(1).replace(/\.0$/, '') + ' million';
    const companies = data?.production_companies.map((company) => company.name).join('  •  ');
    const trailers = data?.videos.results.filter((video) => video.type==="Trailer" && video.site==="YouTube");
    let trailerKey = trailers ? trailerKey = trailers[0].key : trailerKey = "No Trailer";
    const logoPATH = data?.images.logos.filter((logo) => logo.iso_639_1 === "en")[0]?.file_path;
    console.log(logoPATH)
    const logoURL = `https://image.tmdb.org/t/p/original${logoPATH}`;
    console.log(logoURL);
    console.log()
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
                    {!playing && <ImageBackground source={{uri: backdropURL}} className="w-full h-[200] z-0" resizeMode="cover" style={StyleSheet.absoluteFillObject}/> }
                    {trailerKey &&
                        <View className="relative">
                          <YoutubePlayer
                            height={300}
                            loop={true}
                            play={true}
                            mute={true}
                            videoId={trailerKey}
                            playlist={[trailerKey]}
                            onChangeState={onStateChange} 
                              initialPlayerParams={{
                              controls: 0,    
                              modestbranding: true, 
                              rel: 0,          
                              showinfo: 0,     
                              fs: 0,
                              showClosedCaptions: false,
                              

                            }}
                            webViewStyle={{opacity: 0.6}
                            }
                            />
                            {logoPATH &&<Image source={{uri: logoURL}}  className="w-[300] h-[200] z-99 absolute top-1/2 left-1/2 translate-x-[-150] translate-y-[-100]" resizeMode="stretch" />}


                            

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