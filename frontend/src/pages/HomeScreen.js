import { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import {
	Box,
	Text,
	Button,
	HStack,
	VStack,
	Icon,
	Heading,
	Radio,
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import RecordScreenBar from "../components/bars/RecordScreenBar"
import { DisplayContext } from "../context/DisplayContext"

export default function HomeScreen() {
	const navigation = useNavigation()
	const { speechPattern, setSpeechPattern } = useContext(DisplayContext)

	return (
		<Box variant="screen">
			<VStack space="2">
				<RecordScreenBar />
				<VStack space="1">
					<Heading>Select your speech pattern</Heading>
					<Box mx="2">
						<Radio.Group
							name="myRadioGroup"
							value={speechPattern}
							onChange={(nextValue) => {
								setSpeechPattern(nextValue)
							}}
						>
							<Radio value="fluent" my="1">
								No stuttering
							</Radio>
							<Radio value="soundRepetition" my="1">
								Sound Repetitions
							</Radio>
						</Radio.Group>
					</Box>
				</VStack>
				<Button onPress={() => navigation.navigate("RecordScreen0")}>
					<Text>Start Recording</Text>
				</Button>
			</VStack>
		</Box>
	)
}
