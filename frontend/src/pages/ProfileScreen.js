import React, { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import * as SecureStore from "expo-secure-store"

import DefaultBar from "../components/bars/DefaultBar"
import { DisplayContext } from "../context/DisplayContext"
import { Switch } from "react-native"
import { UserContext } from "../context/UserContext"
import apiCall from "../api/apiCall"
import showMyToast from "../components/util/showMyToast"

export default function ProfileScreen() {
	const navigation = useNavigation()
	const { currentUser, setCurrentUser } = useContext(UserContext)
	const { totalDuration, numTotalClips } = useContext(DisplayContext)
	const [reRecordingSpeechPattern, setReRecordingSpeechPattern] = useState(
		currentUser.reRecordingSpeechPattern,
	)

	async function handleSignout() {
		await SecureStore.deleteItemAsync("authToken")
		navigation.navigate("WelcomeScreen")
	}

	async function handleValueChange(value, speechPattern) {
		if (value) {
			setReRecordingSpeechPattern(speechPattern)
		} else {
			setReRecordingSpeechPattern("")
		}
		const changeRerecordInfo = { reRecordPattern: value ? speechPattern : "" }
		const { data, error } = await apiCall(
			"PUT",
			"user/changeReRecordPattern",
			changeRerecordInfo,
		)
		if (error) return showMyToast(error)
		const { user } = data
		setCurrentUser(user)
	}

	return (
		<Box variant="screen">
			<VStack space="3">
				<DefaultBar title="Profile" leftAction={() => navigation.goBack()} />
				<Text>{`You've recorded ${numTotalClips} clips for a total of ${totalDuration /
					60} minutes of audio`}</Text>
				<VStack>
					<Text>
						Be fed clips that have already been recorded for 'fluent' speech
					</Text>
					<Switch
						trackColor={{ false: "c1.500", true: "c2.500" }}
						thumbColor={
							reRecordingSpeechPattern === "fluent" ? "c2.500" : "c1.500"
						}
						value={reRecordingSpeechPattern === "fluent"}
						onValueChange={(value) => handleValueChange(value, "fluent")}
					/>
				</VStack>
				<VStack>
					<Text>
						Be fed clips that have already been recorded for 'sound repetition'
						speech
					</Text>
					<Switch
						trackColor={{ false: "c1.500", true: "c2.500" }}
						thumbColor={
							reRecordingSpeechPattern === "soundRepetition"
								? "c2.500"
								: "c1.500"
						}
						value={reRecordingSpeechPattern === "soundRepetition"}
						onValueChange={(value) =>
							handleValueChange(value, "soundRepetition")
						}
					/>
				</VStack>
				<Button onPress={handleSignout}>
					<Text>Sign Out</Text>
				</Button>
			</VStack>
		</Box>
	)
}
