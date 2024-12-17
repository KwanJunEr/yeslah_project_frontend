import React, { useState } from 'react'
import { View, Text, ScrollView, TouchableOpacity, Modal } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import CallDetectorManager from 'react-native-call-detection';

const AntiVish = () => {
  const [modalVisible, setModalVisible] = useState(false)

  const toggleModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="p-5">
        {/* Header */}
        <View className="flex flex-row justify-between items-center mb-6">
          <View>
            <Text className="text-white text-2xl font-bold">Vishing Protect</Text>
            <Text className="text-gray-400 mt-1">Best Protection Against Any Vishing Attacks</Text>
          </View>
          <TouchableOpacity className="bg-blue-500 p-2 rounded-full" onPress={toggleModal}>
            <Icon name="cog" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Protection Status */}
        <View className="bg-gray-800 p-4 rounded-xl mb-6">
          <View className="flex-row items-center">
            <Icon name="shield-check" size={24} color="#4CAF50" />
            <Text className="text-white font-bold ml-2">Auto Vishing-Protect Enabled</Text>
          </View>
          <Text className="text-gray-400 mt-2">Your calls are being monitored for potential vishing attempts.</Text>
        </View>

        {/* Real Time Alert */}
        <View className="mb-6">
          <Text className="text-white text-xl font-bold mb-3">Real Time Alert</Text>
          <View className="flex flex-col space-y-3 gap-3">
            <View className="bg-red-900 p-4 rounded-xl">
              <Text className="text-white font-bold">Alert 1 - High Risk</Text>
              <Text className="text-gray-300 text-xs">TimeStamp: {new Date().toLocaleString()}</Text>
              <Text className="text-white mt-2">Unknown phone number detected. Deepfake and Sentiment Analysis Model is running to detect potential frauds.</Text>
            </View>
            <View className="bg-yellow-900 p-4 rounded-xl">
              <Text className="text-white font-bold">Alert 2 - Medium Risk</Text>
              <Text className="text-gray-300 text-xs">TimeStamp: {new Date(Date.now() - 300000).toLocaleString()}</Text>
              <Text className="text-white mt-2">Potential attempt to phish your credit card information detected.</Text>
            </View>
            <View className="bg-blue-900 p-4 rounded-xl">
              <Text className="text-white font-bold">Alert 3 - Information</Text>
              <Text className="text-gray-300 text-xs">TimeStamp: {new Date(Date.now() - 600000).toLocaleString()}</Text>
              <Text className="text-white mt-2">Reminder: Do not share any credit card info with unknown contacts.</Text>
            </View>
          </View>
        </View>

        {/* Previous Call Logs */}
        <View>
          <Text className="text-white text-xl font-bold mb-3">Previous Call Logs</Text>
          <View className="flex flex-col gap-3">
            {[
              { id: 1, number: '+1 (555) 123-4567', date: '2023-05-15 14:30', duration: '5:23', safe: true },
              { id: 2, number: '+1 (555) 987-6543', date: '2023-05-14 10:15', duration: '2:47', safe: false },
              { id: 3, number: '+1 (555) 246-8135', date: '2023-05-13 16:45', duration: '8:12', safe: true },
            ].map((call) => (
              <View key={call.id} className={`p-4 rounded-xl ${call.safe ? 'bg-green-900' : 'bg-red-900'}`}>
                <View className="flex-row justify-between items-center">
                  <Text className="text-white font-bold">{call.number}</Text>
                  <View className="flex-row items-center">
                    <Icon name={call.safe ? 'shield-check' : 'shield-alert'} size={20} color={call.safe ? '#4CAF50' : '#FF5252'} />
                    <Text className={`ml-1 ${call.safe ? 'text-green-400' : 'text-red-400'}`}>
                      {call.safe ? 'Safe' : 'Unsafe'}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-300 text-xs mt-1">Date: {call.date}</Text>
                <Text className="text-gray-300 text-xs">Duration: {call.duration}</Text>
                <Text className="text-white mt-2">
                  {call.safe
                    ? 'No vishing attempt detected during this call.'
                    : 'Potential vishing attempt detected. Call details have been logged for review.'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Modal for Vishing Protection Instructions */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-gray-800 p-6 rounded-xl w-11/12 max-w-md">
            <Text className="text-white text-2xl font-bold mb-4">How Vishing Protection Works</Text>
            <ScrollView className="max-h-96">
              <View className="space-y-4 flex flex-col gap-4">
                <View className="flex-row items-start">
                  <Icon name="numeric-1-circle" size={24} color="#4CAF50" />
                  <Text className="text-white ml-2 flex-1">When a call is detected, the system runs a cross-check with existing contacts. If the number is unknown, it will be flagged for further analysis.</Text>
                </View>
                <View className="flex-row items-start">
                  <Icon name="numeric-2-circle" size={24} color="#4CAF50" />
                  <Text className="text-white ml-2 flex-1">For business purposes, the system will start audio recording and transcribe the call to text for analysis.</Text>
                </View>
                <View className="flex-row items-start">
                  <Icon name="numeric-3-circle" size={24} color="#4CAF50" />
                  <Text className="text-white ml-2 flex-1">The caller's voice will be analyzed using AI models for deepfake detection and sentiment analysis. This helps detect if the caller is using urgency tactics, which is common in vishing attempts.</Text>
                </View>
                <View className="flex-row items-start">
                  <Icon name="numeric-4-circle" size={24} color="#4CAF50" />
                  <Text className="text-white ml-2 flex-1">You will receive real-time alerts if a potential vishing attempt is detected during the call.</Text>
                </View>
              </View>
            </ScrollView>
            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-xl mt-4"
              onPress={toggleModal}
            >
              <Text className="text-white text-center font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default AntiVish

