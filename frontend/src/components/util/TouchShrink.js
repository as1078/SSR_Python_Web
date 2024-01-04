import React, { useState, useEffect } from "react"
import { TouchableOpacity } from "react-native"
import { Box, Text, Button, HStack, VStack, Icon, Pressable } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"

export default function TouchShrink({ children, onPress, isDisabled }) {
	return (
		<Pressable onPress={onPress} disabled={isDisabled}>
			{({ isPressed }) => (
				<Box style={{ transform: [{ scale: isPressed ? 0.95 : 1 }] }}>
					{children}
				</Box>
			)}
		</Pressable>
	)
}
