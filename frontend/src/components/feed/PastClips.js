import { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { Audio } from "expo-av"

import { ClipContext } from "../../context/ClipContext"
import { formatDate } from "../util/formatDate"

export default function PastClip({ clipId }) {
	const navigation = useNavigation()
	const { clips } = useContext(ClipContext)
	const [isPlaying, setIsPlaying] = useState(false)
	const [sound, setSound] = useState(null)
	const clipData = clips[clipId]
	const { transcript, duration, url, createdAt } = clipData
	const transcriptText = transcript.transcript

	async function handlePlayClip() {
		if (isPlaying) {
			await sound.stopAsync()
			setIsPlaying(false)
		} else {
			setIsPlaying(true)
			console.log("loading")
			const { sound } = await Audio.Sound.createAsync({ uri: url })
			sound.setOnPlaybackStatusUpdate((status) => {
				console.log("loaded")
				if (status.isLoaded) {
					canPlay = true
				}
			})
			setSound(sound)
			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.didJustFinish) {
					setIsPlaying(false)
				}
			})
		}
	}

	return (
		<VStack p="2" space="1">
			<HStack space="2">
				<Text>{formatDate(createdAt)}</Text>
				<Text>{duration} s</Text>
			</HStack>
			<VStack ml="2">
				<Text>{transcriptText}</Text>
			</VStack>
			<HStack justifyContent="center" space="10">
				{/* <TouchableOpacity onPress={handlePlayClip}>
					<Icon as={<Ionicons name="play" />} size="6" color="c2.500" />
				</TouchableOpacity> */}
				<TouchableOpacity>
					<Icon as={<Ionicons name="trash" />} size="6" color="c2.500" />
				</TouchableOpacity>
			</HStack>
		</VStack>
	)
}
