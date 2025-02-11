import { Stack, Link } from 'expo-router';
import { View, Text, TextInput, ScrollView, Pressable } from 'react-native';
import React, { useState } from 'react';
import { supabase } from '~/lib/supabase';

const popularChannels = [
  { name: 'MKBHD', url: 'https://youtube.com/@mkbhd' },
  { name: 'Fireship', url: 'https://youtube.com/@Fireship' },
  { name: 'Veritasium', url: 'https://youtube.com/@veritasium' },
];

export default function Home() {
  const [url, setUrl ] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const startAnalyzing = async () => {
    const { error, data } = await supabase.functions.invoke('trigger_collection_api', { 
      body: { url },
    });
    console.log('error:', error)
    console.log('data:', data)
  }

  return (
    <>
      <Stack.Screen options={{ title: 'YouTube Analytics' }} />
      <View className='flex-1 bg-white p-2'>
        <ScrollView className="flex-1">
          <View className="py-8">
            <Text className="text-3xl font-bold text-center mb-2">
              YouTube Channel Analytics
            </Text>
            <Text className="text-gray-600 text-center mb-8">
              Analyze any YouTube channel's performance and metrics
            </Text>

            <View className="flex-row space-x-2 px-4">
              <TextInput
                className="flex-1 h-12 px-4 rounded-lg bg-gray-200 border border-gray-200"
                placeholder="Enter YouTube channel URL"
                value={url}
                onChangeText={setUrl}
              />
              <Pressable
                className="bg-red-600 px-6 rounded-lg items-center justify-center"
                onPress={startAnalyzing}
              >
                <Text className="text-white font-semibold">Analyze</Text>
              </Pressable>
            </View>
          </View>

          <View className="px-4 mb-8">
            <Text className="text-lg font-semibold mb-4">Popular Channels</Text>
            <View className="flex-row flex-wrap gap-2">
              {popularChannels.map((channel) => (
                <Pressable
                  key={channel.url}
                  className="bg-gray-200 px-4 py-2 rounded-full"
                  onPress={() => setSearchInput(channel.url)}
                >
                  <Text className="text-gray-800">{channel.name}</Text>
                </Pressable>
              ))}
            </View>
          </View>

          {recentSearches.length > 0 && (
            <View className="px-4">
              <Text className="text-lg font-semibold mb-4">Recent Searches</Text>
              <View className="space-y-2">
                {recentSearches.map((search, index) => (
                  <Pressable
                    key={index}
                    className="bg-white p-4 rounded-lg border border-gray-200"
                    onPress={() => setSearchInput(search)}
                  >
                    <Text className="text-gray-800">{search}</Text>
                  </Pressable>
                ))}
              </View>
            </View>
          )}
        <Link href="/channel" asChild>
            <Pressable className="mx-4 mt-6 mb-8 bg-blue-600 p-4 rounded-lg">
              <Text className="text-white font-semibold text-center text-lg">
                Go to Channel Analysis
              </Text>
            </Pressable>
          </Link>
        </ScrollView>
      </View>
    </>
  );
}