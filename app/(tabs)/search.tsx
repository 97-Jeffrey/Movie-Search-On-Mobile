import MovieCard from "@/components/MovieCard";
import SearchBar from "@/components/SearchBar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { fetchMovies } from "@/services/api";
import useFetch from "@/services/useFetch";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

const Search =() =>{

  const [searchQuery, setSearchQuery]=  useState('');

  const { 
    data: movies, 
    loading: movieLoading, 
    refetch: loadMovies,
    reset,
    error: movieError
  } = useFetch(()=> fetchMovies({ query: searchQuery }), false)

  useEffect(()=>{
    const func = async() =>{
      if(searchQuery.trim()){
        await loadMovies()
      }else{
        reset()
      }

    }

    func()

  },[searchQuery])


  return (
    <View className="flex-1 bg-primary">
      <Image 
        source={images.bg} 
        className="flex-1 absolute w-full z-0"
        resizeMode="cover"
      />
      <FlatList 
          data={movies}
          renderItem={({ item })=> <MovieCard {...item}/>}
          keyExtractor={(item)=> item.id.toString()}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent:'flex-start',
            gap:16,
            marginBottom:16,
          }}
          className="px-5"
          contentContainerStyle={{ paddingBottom:100 }}
          ListHeaderComponent={
            <>
               <View className="w-full flex-row justify-center items-center mt-20">
                   <Image source={icons.logo} className="w-12 h-10"/>
               </View>
               <View className="my-5">
                   <SearchBar 
                      placeholder="Search movies... " 
                      query={searchQuery}
                      onChangeText={(text: string)=> setSearchQuery(text)}
                    />
               </View>
               {movieLoading && (
                <ActivityIndicator size='large' color='#0000ff' className="y-3"/>
               )}

               {movieError && 
                <Text className="text-red-500 px-5 y-3">
                   Error: {movieError.message}
                </Text>}
                {!movieLoading && !movieError && searchQuery.trim() && movies &&  movies.length>0
                   &&
                  <Text className="text-xl text-white font-bold">
                    Search Results For {' '} 
                    <Text className="text-accent">{searchQuery}</Text>
                  </Text>
                }
            </>
          }
      />
    </View>
  );
}

export default Search
