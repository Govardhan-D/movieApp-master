import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import Images from '../../assets/images/Images'
import Icons from '../../assets/icons/icons'

const Home = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1 bg-primary">
        <Image source={Images.bg} className="absolute w-full z-0"/>
        <ScrollView className="px-5" showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          minHeight: "100%",
          paddingBottom: 10
        }}>
          <Image source={Icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
    
  )
}

export default Home