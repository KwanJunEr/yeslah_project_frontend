import { View, Text, ScrollView, Image } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import RiskAssessmentBox from '../../components/RiskAssessmentBox';


const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-black h-full">
      <ScrollView className="px-5 py-5">
        <View className="mb-3 flex flex-row justify-between">
          <View>
            <Text className="text-2xl font-extrabold text-white mb-[5px]">
              Welcome Back
            </Text>
            <Text className="text-xl font-bold text-[#CCCCCC]">
              Hi, Jonas Kwan
            </Text>
          </View>
          <View>
            <Image
              source={images.appLogo}
              className="w-20 h-20"
              resizeMode="contain"
            />
          </View>
        </View>
        <View className="flex justify-center items-center">
          <RiskAssessmentBox/>
        </View>
        <View className="flex flex-row space-x-2">

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
