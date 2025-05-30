import { Text, View, TouchableOpacity, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import Entypo from '@expo/vector-icons/Entypo';
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/UserContext";
import { verifyOTP } from "../../services/appwrite";
import { useRouter } from "expo-router";

export default function Verify(){
    const router = useRouter();
    const [otp, setOTP] = useState("");
    const {userId, setUser} = useContext(AuthContext);
    console.log(userId)
    const validOTP = otp.length === 6;
    const otpHandling = async(otp) => {
        try{
            console.log("Verifying OTP")
            const user = await verifyOTP(userId, otp);
            console.log(user);
            setUser(user);
            router.push('/Home');
            console.log("Verfied Successfully")
        }catch(error){
            console.log(error)
        }
    }
    return(
           
        <SafeAreaProvider>
            <SafeAreaView className="flex-1 bg-primary px-5 justify-center items-center gap-10">
                <Entypo name="mail" size={80} color="white" />
                <View className="items-center gap-2">
                    <Text className="text-4xl text-white font-bold">Verify OTP</Text>
                    <Text className="text-white">We will send an OTP. Dont share this OTP with anyone</Text>
                </View>
                <View className="w-full gap-5">
                    <View className="flex flex-row items-center bg-dark-200 rounded-lg px-5 py-4">

                        <TextInput placeholder="Enter your 6 digit OTP" inputMode="numeric" className="flex-1 ml-2 text-white" keyboardType="email" textContentType="password" onChangeText={(text) => {setOTP(String(text))}} value={otp}/>
                     </View>

                    <TouchableOpacity disabled={!validOTP}
                    className={`w-full flex justify-center items-center bg-[#D6C7FF] rounded-[4px] h-[50]`}
                    onPress={() => otpHandling(otp)}
                    >
                        <Text className="ml-2 text-white font-bold text-2xl" >Verify OTP</Text>
                    </TouchableOpacity>

                </View>
                
                
            </SafeAreaView>
        </SafeAreaProvider>
        

    )
}