import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {View, Text, TextInput, TouchableOpacity, Image, ActivityIndicator} from 'react-native';
import { sendOTP } from "../../services/appwrite";
import { useContext, useState } from "react";
import Images from "../../assets/images/Images";
import { enableAndroidFontFix } from "../../AndroidFontFix";
import { useRouter } from "expo-router";
import Icons from "../../assets/icons/icons";
import Entypo from '@expo/vector-icons/Entypo';
import { AuthContext } from "../../contexts/UserContext";



enableAndroidFontFix();
export default function SendOtp(){
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setUserId} = useContext(AuthContext);

    const otpHandling = async(email) => {
        try{
            
            setLoading(true)
            const sessionToken = await sendOTP(email);
            setUserId(sessionToken.userId);
            console.log(sessionToken)
            router.push('/Verify');


        }catch(error){
            setError(error)
        }finally{
            setLoading(false)
        }
    }
     
    return(
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary px-5 justify-center items-center gap-10">
                <Entypo name="mail" size={80} color="white" />
                <View className="items-center gap-2">
                    <Text className="text-4xl text-white font-bold">Login with Email</Text>
                    <Text className="text-white">We will send an OTP. Do not share this OTP with anyone</Text>
                </View>
                <View className="w-full gap-5">
                    <View className="flex flex-row items-center bg-dark-200 rounded-lg px-5 py-4">

                        <TextInput placeholder="Enter your email" className="flex-1 ml-2 text-white" keyboardType="email" textContentType="emailAddress" textCOlor onChangeText={(text) => {setEmail(String(text))}} value={email}/>
                     </View>

                    <TouchableOpacity
                    className="w-full flex justify-center items-center bg-[#D6C7FF] rounded-[4px] h-[50]"
                    onPress={() => otpHandling(email)}
                    >
                        {loading && <ActivityIndicator size={24} color="white"/>}
                        {!loading && <Text className="ml-2 text-white font-bold text-2xl" >Send OTP</Text>}
                    </TouchableOpacity>

                </View>
                
                
            </SafeAreaView>
        </SafeAreaProvider>
        
    )
}