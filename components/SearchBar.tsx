
import { icons } from "@/constants/icons"
import { Image, TextInput, View } from "react-native"

interface SearchBarInterface {
    onPress?: ()=>void,
    placeholder: string,
    query?: string,
    onChangeText?: (text: string)=> void
}

const SearchBar:React.FC<SearchBarInterface> = ({ onPress, onChangeText, placeholder, query}) =>{
    return (
        <View className="flex-row itemsc-center bg-dark-200 rounded-full px-5 py-4">
            <Image 
                source={icons.search}
                className="size-5"
                resizeMode="contain"
                tintColor="#ab8bff"
            />
            <TextInput 
                onPress={onPress}
                placeholder={placeholder}
                value={query}
                onChangeText={onChangeText}
                placeholderTextColor="#a8b5db"
                className=" flex-1 ml-2 text-white"
    
            />
        </View>
    )
}

export default SearchBar