import React, { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import {
	Box,
	Text,
	Button,
	HStack,
	VStack,
	Icon,
	Select,
	CheckIcon,
	Input,
} from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import DefaultBar from "../components/bars/DefaultBar"
import { DisplayContext } from "../context/DisplayContext"

export default function VoiceScreen() {
	const navigation = useNavigation()
	const {
		stutterPattern,
		accent,
		otherAccent,
		pitch,
		otherCharacteristics,
		setStutterPattern,
		setAccent,
		setOtherAccent,
		setPitch,
		setOtherCharacteristics,
	} = useContext(DisplayContext)
	const isAdvanceDisabled = !stutterPattern || !accent || !pitch
	return (
		<Box variant="screen">
			<VStack space="5">
				<DefaultBar
					title="Enter Voice Characteristics"
					rightAction={() => navigation.navigate("SignupScreen")}
					leftAction={() => navigation.navigate("GenderScreen")}
					isRightDisabled={isAdvanceDisabled}
				/>
				<Select
					selectedValue={stutterPattern}
					accessibilityLabel="Are you a person who stutters?"
					placeholder="Are you a person who stutters?"
					mt={1}
					onValueChange={(itemValue) => setStutterPattern(itemValue)}
				>
					<Select.Item label="No, I don't stutter" value="fluent" />
					<Select.Item label="Yes, I stutter rarely" value="rare" />
					<Select.Item label="Yes, I stutter moderately" value="moderate" />
					<Select.Item label="Yes, I stutter severely" value="severe" />
				</Select>
				<VStack space="2">
					<Select
						selectedValue={accent}
						accessibilityLabel="What accent do you have?"
						placeholder="What accent do you have?"
						mt={1}
						onValueChange={(itemValue) => setAccent(itemValue)}
					>
						<Select.Item label="American" value="american" />
						<Select.Item
							label="American (Southern)"
							value="american southern"
						/>
						<Select.Item label="Canadian" value="canadian" />
						<Select.Item label="British" value="british" />
						<Select.Item label="Indian" value="indian" />
						<Select.Item label="Chinese" value="chinese" />
						<Select.Item label="Australian" value="australian" />
						<Select.Item label="Other" value="other" />
					</Select>
					{accent === "other" && (
						<Input
							value={otherAccent}
							onChangeText={setOtherAccent}
							placeholder="Please describe what accent you have"
						/>
					)}
				</VStack>
				<Select
					selectedValue={pitch}
					accessibilityLabel="What pitched voice do you have?"
					placeholder="What pitched voice do you have?"
					mt={1}
					onValueChange={(itemValue) => setPitch(itemValue)}
				>
					<Select.Item label="High pitched" value="high" />
					<Select.Item label="Medium pitched" value="medium" />
					<Select.Item label="Deep pitched" value="deep" />
				</Select>
				<Input
					value={otherCharacteristics}
					onChangeText={setOtherCharacteristics}
					placeholder="Please describe any other speech patterns you have"
				/>
				<Button
					onPress={() => navigation.navigate("SignupScreen")}
					isDisabled={isAdvanceDisabled}
				>
					<Text>Next</Text>
				</Button>
			</VStack>
		</Box>
	)
}
