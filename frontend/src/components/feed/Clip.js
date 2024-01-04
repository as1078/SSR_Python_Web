import { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons, Feather } from "@expo/vector-icons"
import { Audio } from "expo-av"

import { ClipContext } from "../../context/ClipContext"

export default function Clip({ recording, transcriptId, index }) {
	const navigation = useNavigation()
	const [isPlaying, setIsPlaying] = useState(false)
	const [sound, setSound] = useState(null)
	const { transcripts } = useContext(ClipContext)
	const transcript = transcripts[transcriptId]
	if (!transcript) return null

	async function handlePlayClip() {
		if (isPlaying) {
			await sound.stopAsync()
			setIsPlaying(false)
		} else {
			setIsPlaying(true)
			const uri = recording.getURI()
			const { sound } = await Audio.Sound.createAsync({ uri })
			await sound.playAsync()
			setSound(sound)
			sound.setOnPlaybackStatusUpdate((status) => {
				if (status.didJustFinish) {
					setIsPlaying(false)
				}
			})
		}
	}

	return (
		<Box p="2">
			<VStack space="2">
				<Box>
					<Heading>{`Clip ${index + 1}/5`}</Heading>
				</Box>
				<VStack space="1">
					<Text color="c1.50" mx="3" numberOfLines={2}>
						{transcript.transcript}
					</Text>
					<HStack justifyContent="center" space="3">
						<TouchableOpacity onPress={handlePlayClip}>
							<Icon
								as={<Ionicons name={isPlaying ? "pause" : "play"} />}
								size="6"
								color="c2.500"
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => navigation.navigate(`RecordScreen${index}`)}
						>
							<Icon as={<Feather name="edit" />} size="6" color="c2.500" />
						</TouchableOpacity>
					</HStack>
				</VStack>
			</VStack>
		</Box>
	)
}
