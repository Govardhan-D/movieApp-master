import { View, Image } from "react-native";
import Icons from "../assets/icons/icons";
import { TextInput } from "react-native";

export default function SearchBar({onPress, onChangeText}){

    return(
        <View className="flex flex-row items-center bg-dark-200 rounded-full px-5 py-4">
            <Image source={Icons.search} className="size-5" resizeMode="contain" tintColor="#ab8bff" />
            <TextInput placeholder="Enter your query" onPress={onPress} onChangeText={onChangeText} className="flex-1 ml-2 text-white" placeholderTextColor="#a8b5db"/>
        </View>
    )
}