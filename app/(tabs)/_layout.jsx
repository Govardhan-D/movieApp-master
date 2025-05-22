import React from 'react'
import { Tabs } from 'expo-router'
import { ImageBackground, Text, View, Image } from 'react-native';
import Images from '../../assets/images/Images';
import Icons from '../../assets/icons/icons';
import { enableAndroidFontFix } from '../../AndroidFontFix';
import { TransitionPresets } from '@react-navigation/bottom-tabs';

enableAndroidFontFix();

function TabIcon({tabName, tabIcon, focused}){

  
  if(focused){
    return(
      <ImageBackground source={Images.highlight} className='flex flex-row flex-1 w-full min-w-[118px] min-h-16 mt-4  justify-center items-center rounded-full overflow-hidden gap-2'>
        <Image source={tabIcon} tintColor="#151312" className="size-5" />

        <Text className='font-bold'>{tabName}</Text>
      </ImageBackground>


    )
  }
  else{
    return(
      <View className='size-full justify-center items-center mt-4 rounded-full'>
        <Image source={tabIcon} tintColor="#A8B5DB" className="size-5" />
      </View>
    )
  }
}
const _layout = () => {
  return (
    <Tabs screenOptions={{headerShown: false,
        tabBarShowLabel: false,
        tabBarItemStyle:{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center"
        },
        tabBarStyle: {
          backgroundColor: "#0f0d23",
          borderRadius: 50,
          marginHorizontal: 20,
          marginBottom: 50,
          height: 52,
          position: 'absolute',
          borderTopWidth: 0,
        },
         ...TransitionPresets.ShiftTransition
    }}>
      <Tabs.Screen name="Index" options={{tabBarIcon: ({focused, color, size})=>{
        return(
          <TabIcon tabName="Home" tabIcon={Icons.home} focused={focused} color={color} size={size}/>

        )
      }}} />
      <Tabs.Screen name="Search" options={{tabBarIcon: ({focused, color, size})=>{
        return(
          <TabIcon tabName="Search" tabIcon={Icons.search} focused={focused} color={color} size={size}/>
        )
      }, headerShown: false}} />
      <Tabs.Screen name="Profile" options={{tabBarIcon: ({focused, color, size})=>{
        return(
          <TabIcon tabName="Profile" tabIcon={Icons.person} focused={focused} color={color} size={size}/>

        )
      }}} />
      <Tabs.Screen name="Bookmark" options={{tabBarIcon: ({focused, color, size})=>{
        return(
          <TabIcon tabName="Saved" tabIcon={Icons.save} focused={focused} color={color} size={size}/>

        )
      }}} />

    </Tabs>
 
  )
}

export default _layout