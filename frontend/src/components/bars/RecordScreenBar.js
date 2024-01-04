import React, { useState, useEffect, useContext } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import { UserContext } from "../../context/UserContext"

export default function RecordScreenBar() {
	const navigation = useNavigation()
	const { currentUser } = useContext(UserContext)

	return (
		<Box justifyContent="center" m="2">
			<HStack space="2" position="absolute" zIndex={9}>
				<TouchableOpacity onPress={() => navigation.navigate("HistoryScreen")}>
					<Box>
						<Icon
							as={MaterialCommunityIcons}
							name="history"
							size="7"
							color="c2.500"
						/>
					</Box>
				</TouchableOpacity>
			</HStack>
			<HStack space="2" position="absolute" zIndex={9} alignSelf="flex-end">
				<TouchableOpacity>
					<Box>
						<Icon
							as={MaterialCommunityIcons}
							name="information"
							size="7"
							color="c2.500"
						/>
					</Box>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
					<Box>
						<Icon
							as={MaterialCommunityIcons}
							name="account"
							size="7"
							color="c2.500"
						/>
					</Box>
				</TouchableOpacity>
			</HStack>
			<HStack space="2" mx="2" alignItems="center" justifyContent="center">
				{currentUser && currentUser.username && (
					<Heading>{`${currentUser.username}`}</Heading>
				)}
			</HStack>
		</Box>
	)
}
