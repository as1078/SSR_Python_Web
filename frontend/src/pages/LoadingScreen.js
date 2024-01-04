import React, { useState, useEffect } from "react"
import { Box, Text, Button, HStack, VStack, Icon, Spinner } from "native-base"
import useStartup from "../components/util/useStartup"

export default function LoadingScreen() {
	const callStartup = useStartup()
	useEffect(() => {
		callStartup()
	}, [])
	return (
		<Box variant="screen" alignItems="center" justifyContent="center">
			<Spinner />
		</Box>
	)
}
