import { View, Text, Image } from 'react-native';


const channel =
{
    "input": {
        "url": "https://www.youtube.com/@jaidenanimations/about"
    },
    "url": "https://www.youtube.com/@jaidenanimations/about",
    "handle": "@jaidenanimations",
    "handle_md5": "4e2083f32de8c4dca0e500600bd36486",
    "banner_img": "https://yt3.googleusercontent.com/9b5DW0WsoUtzke1Q54ARDE26FqU4FXAgjnWKEihmDCgYAu2ZLN8qLhvD1WjQT-lFjDbg43HsHQ=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj",
    "profile_image": "https://yt3.googleusercontent.com/6uDu4HmbcorfDWch6L4FAzv-DFMOstOwhTks-5VUm-kY5puZ_oU4EeA1YOqEM_EDvCTj3UPUW68=s160-c-k-c0x00ffffff-no-rj",
    "name": "JaidenAnimations",
    "subscribers": 14300000,
    "Description": "hi it's jaiden and bird\n\nchannel profile picture made by: me\nchannel banner art made by: https://twitter.com/motiCHIKUBI\n",
    "videos_count": 167,
    "created_date": "2014-02-16T00:00:00.000Z",
    "views": 2789001070,
    "Details": {
        "location": "United States"
    },
    "Links": [
        "jaidenanimations.com",
        "twitch.tv/jaidenanimations",
        "twitter.com/JaidenAnimation",
        "instagram.com/jaiden_animations"
    ],
    "identifier": "UCGwu0nbY2wSkW8N-cghnLpA",
    "id": "UCGwu0nbY2wSkW8N-cghnLpA",
    "timestamp": "2025-02-10T05:05:10.671Z"
}

export default function Channel() {
    return (
        <View className="flex-1 bg-white">
            {/* Banner Section */}
            <View className="w-full h-56 relative">
                <Image 
                    source={{ uri: channel.banner_img }} 
                    className="w-full min-h-[10rem] object-cover"
                />
                {/* Profile Image Overlay */}
                <View className="absolute -bottom-[4.5rem] left-4">
                    <Image 
                        source={{ uri: channel.profile_image }} 
                        className="w-32 h-32 rounded-full border-4 border-white shadow-xl"
                    />
                </View>
            </View>

            {/* Channel Info Section */}
            <View className="mt-20 px-6 ">
                <Text className="text-3xl font-bold text-gray-900">{channel.name}</Text>
                <Text className="text-gray-500 mt-1 font-medium">{channel.handle}</Text>
                <View className="flex-row space-x-6 mt-3 ">

                    <View >
                        <Text className="text-gray-900 font-semibold">
                            {channel.subscribers.toLocaleString()}
                        </Text>
                        <Text className="text-sm text-gray-500">subscribers</Text>
                    </View>
                    <View>
                        <Text className="text-gray-900 font-semibold">
                            {channel.videos_count.toLocaleString()}
                        </Text>
                        <Text className="text-sm text-gray-500">videos</Text>
                    </View>
                    <View>
                        <Text className="text-gray-900 font-semibold">
                            {(channel.views / 1000000).toFixed(1)}M
                        </Text>
                        <Text className="text-sm text-gray-500">views</Text>
                    </View>
                </View>
            </View>

            {/* Description Section */}
            <View className="mt-8 px-6">
                <Text className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {channel.Description}
                </Text>
            </View>

            {/* Links Section */}
            <View className="mt-8 px-6">
                <Text className="text-lg font-semibold text-gray-900 mb-3">Links</Text>
                <View className="space-y-2">
                    {channel.Links.map((link, index) => (
                        <Text 
                            key={index} 
                            className="text-blue-600 font-medium hover:underline"
                        >
                            {link}
                        </Text>
                    ))}
                </View>
            </View>
        </View>
    );
}
