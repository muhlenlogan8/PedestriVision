import { StatusBar } from "expo-status-bar";
import { SafeAreaView, View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import "./global.css";

export default function App() {
	return (
		<SafeAreaView className="flex-1">
			<View className="flex-1 bg-gray-900">
				<HomeScreen />
			</View>
			<StatusBar style="light" />
		</SafeAreaView>
	);
}
