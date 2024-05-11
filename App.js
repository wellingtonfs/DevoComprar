import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './src/home';

export default function App() {
	return (
		<SafeAreaView style={styles.container}>
			<Home />
			<StatusBar style="light" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '100%',
		backgroundColor: "#710117"
	},
});