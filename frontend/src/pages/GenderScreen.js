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

import { DisplayContext } from "../context/DisplayContext"
import DefaultBar from "../components/bars/DefaultBar"

export default function GenderScreen() {
	const navigation = useNavigation()
	const { gender, otherGender, setGender, setOtherGender } = useContext(
		DisplayContext,
	)
	const isAdvanceDisabled = !gender
	return (
		<Box variant="screen">
			<VStack space="5">
				<DefaultBar
					title="Enter Your Gender"
					rightAction={() => navigation.navigate("VoiceScreen")}
					leftAction={() => navigation.navigate("AgeScreen")}
					isRightDisabled={isAdvanceDisabled}
				/>
				<VStack space="2">
					<Select
						selectedValue={gender}
						accessibilityLabel="Select Age"
						placeholder="Select Age"
						mt={1}
						onValueChange={(itemValue) => setGender(itemValue)}
					>
						<Select.Item label="Female" value="female" />
						<Select.Item label="Male" value="male" />
						<Select.Item label="Trans MTF" value="trans mtf" />
						<Select.Item label="Trans FTM" value="trans ftm" />
						<Select.Item label="Intersex" value="intersex" />
						<Select.Item label="Nonconforming" value="nonconforming" />
						<Select.Item label="Other" value="other" />
					</Select>
					{gender === "other" && (
						<Input
							value={otherGender}
							onChangeText={setOtherGender}
							placeholder="Please describe your gender"
						/>
					)}
				</VStack>
				<Button
					onPress={() => navigation.navigate("VoiceScreen")}
					isDisabled={isAdvanceDisabled}
				>
					<Text>Next</Text>
				</Button>
			</VStack>
		</Box>
	)
}
