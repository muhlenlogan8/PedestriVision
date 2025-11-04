import { View, Text, TouchableOpacity } from "react-native";

export default function HomeScreen() {
	return (
		<View className="flex-1 bg-gray-900 items-center justify-center px-6">
			<Text className="text-white text-3xl font-bold mb-6">GPS Glasses</Text>

			<TouchableOpacity className="bg-blue-600 px-6 py-4 rounded-xl mb-4">
				<Text className="text-white text-lg font-semibold">
					Connect to Glasses
				</Text>
			</TouchableOpacity>

			<TouchableOpacity className="bg-green-600 px-6 py-4 rounded-xl">
				<Text className="text-white text-lg font-semibold">
					Start Navigation
				</Text>
			</TouchableOpacity>
		</View>
	);
}
