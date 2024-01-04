import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon, Heading } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

export default function DefaultBar({
	title,
	leftAction,
	rightAction,
	isLeftDisabled,
	isRightDisabled,
}) {
	const navigation = useNavigation()
	return (
		<Box justifyContent="center" m="2">
			{leftAction && (
				<HStack space="2" position="absolute" zIndex={9}>
					<TouchableOpacity onPress={leftAction} disabled={isLeftDisabled}>
						<Box opacity={isLeftDisabled ? 0.3 : 1}>
							<Icon
								as={MaterialCommunityIcons}
								name="chevron-left"
								size="8"
								color="c2.500"
							/>
						</Box>
					</TouchableOpacity>
				</HStack>
			)}
			{rightAction && (
				<HStack space="2" position="absolute" zIndex={9} alignSelf="flex-end">
					<TouchableOpacity onPress={rightAction} disabled={isRightDisabled}>
						<Box opacity={isRightDisabled ? 0.3 : 1}>
							<Icon
								as={MaterialCommunityIcons}
								name="chevron-right"
								size="8"
								color="c2.500"
							/>
						</Box>
					</TouchableOpacity>
				</HStack>
			)}
			<HStack space="2" mx="2" alignItems="center" justifyContent="center">
				<Heading>{title}</Heading>
			</HStack>
		</Box>
	)
}
