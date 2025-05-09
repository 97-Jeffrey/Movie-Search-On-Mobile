import { icons } from "@/constants/icons";
import { fetchMovieDetails } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const MovieDetails =() =>{

  const { id } = useLocalSearchParams()
  const router = useRouter()
  const { 
    data: movie, 
    loading,
  } = useFetch(()=> fetchMovieDetails(id as string))

  console.log(movie)



  return (
    <View className="flex-1 bg-primary">

      <ScrollView
          className="flex-1" 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            // minHeight:'100%',
            paddingBottom:100
            
          }}
      >
        <Image  
          source={{
            uri: movie?.poster_path?
            `https://image.tmdb.org/t/p/original${movie?.poster_path}`:
            `https://placehold.co/600x400/1a1a1a/ffffff.png`
          }}
          className="w-full h-[550px] rounded-lg"
          resizeMode="stretch"
        />

        <View className='px-[20px] py-[10px]'>
          <Text className=" font-bold text-[30px] text-white">{movie?.title}</Text>
        </View>

        <View className='px-[20px] py-[10px] flex flex-row justify-start items-center gap-[15px]'>
          <Text className=" text-[16px] text-white">{movie?.release_date.split('-')[0]} •</Text>
          <Text className=" text-[16px] text-white">{movie?.runtime} m</Text>
        </View>

        <View 
          className={`ml-[20px] h-[50px] w-[150px] 
          bg-dark-200 rounded-[5px] 
          flex flex-row justify-center items-center gap-[5px]`}
        >
          <Image source={icons.star} className='size-4'/>

          <Text className="text-white">{movie?.vote_average ?? 0 }/10</Text>

          <Text className="text-white">({movie?.vote_count})</Text>

        </View>

        <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[15px]">
           <Text className="text-light-200">Overview</Text>
           <Text className="text-white">{movie?.overview}</Text>
        </View>

        <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
          <Text className="text-light-200">Genres</Text>
          <View className="flex flex-row justify-start items-center gap-[15px]">
            {movie?.genres?.map(genre=> (
              <Text 
                className="bg-dark-100 text-white font-bold px-[12px] py-[6px] rounded-[5px]" 
                key={genre.id}
              >
                {genre.name}
              </Text>
            ))}
          </View>
        </View>

        <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
          <Text className="text-light-200">Countries</Text>
          <Text className="text-light-100 flex flex-row justify-start items-center gap-[15px] font-bold">
            {movie?.production_countries?.map((c) => c.name).join(" • ") ||
            "N/A"}
          </Text>
        </View>


        <View className="flex flex-row justify-start items-center">

          <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
            <Text className="text-light-200">Budgets</Text>
            <Text className="text-light-100 flex flex-row justify-start items-center gap-[15px] font-bold">
              {`$${(movie?.budget ?? 0) / 1_000_000} million`}
            </Text>
          </View>

          <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
            <Text className="text-light-200">Revenue</Text>
            <Text className="text-light-100 flex flex-row justify-start items-center gap-[15px] font-bold">
              {`$${Math.round(
                (movie?.revenue ?? 0) / 1_000_000
              )} million`}
            </Text>
          </View>

        </View>

        <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
          <Text className="text-light-200">Companies</Text>
          <Text className="text-light-100 flex flex-row justify-start items-center gap-[15px] font-bold">
            {movie?.production_companies?.map((c) => c.name).join(" • ") ||
            "N/A"}
          </Text>
        </View>

        {movie?.tagline 
          &&
        <View className="px-[20px] mt-[20px] flex flex-col items-start justify-center gap-[10px]">
          <Text className="text-light-200">Tagline</Text>
          <Text className="text-light-100 flex flex-row justify-start items-center gap-[15px] font-bold">
            {movie?.tagline}
          </Text>
        </View>
        }



      </ScrollView>

      <TouchableOpacity
        className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50"
        onPress={router.back}
      >
        <Image
          source={icons.arrow}
          className="size-5 mr-1 mt-0.5 rotate-180"
          tintColor="#fff"
        />
        <Text className="text-white font-semibold text-base">Go Back</Text>
      </TouchableOpacity>
      
      

    </View>
  );
}

export default MovieDetails
