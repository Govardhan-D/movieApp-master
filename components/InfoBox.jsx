import {View, Text} from 'react-native'
export default function InfoBox({title, content='', renderChild}){
    return(
        <View className="flex gap-[5px] px-5 mt-[18px]">
            <Text className="text-[12px] font-normal text-[#A8B5DB]">{title}</Text>
            {content!='' && <Text className="text-[14px] font-bold leading-[1.5] text-[#D6C7FF]">{content}</Text>}
            <View className="flex flex-row gap-[9px]">
                {renderChild && renderChild()}
            </View>

            
        </View>
    )
}