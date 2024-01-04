import React, { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import {
	Box,
	Text,
	Button,
	HStack,
	VStack,
	Icon,
	ScrollView,
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import DefaultBar from "../components/bars/DefaultBar"
import { ClipContext } from "../context/ClipContext"
import PastClip from "../components/feed/PastClips"

export default function HistoryScreen() {
	const navigation = useNavigation()
	const { pastClipIds } = useContext(ClipContext)
	return (
		<Box variant="screen">
			<DefaultBar leftAction={() => navigation.goBack()} title="History" />
			<ScrollView>
				<VStack space="2">
					{pastClipIds.map((clipId) => (
						<PastClip key={clipId} clipId={clipId} />
					))}
				</VStack>
			</ScrollView>
		</Box>
	)
}
