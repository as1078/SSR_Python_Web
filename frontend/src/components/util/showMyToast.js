import { Box, Text, Toast } from "native-base"

function MyToast({ message, isSuccess }) {
	return (
		<Box
			bg="c1.900"
			p="10px"
			rounded="md"
			mb={5}
			borderWidth="2px"
			borderColor={isSuccess ? "c2.500" : "c3.400"}
		>
			<Text>{message}</Text>
		</Box>
	)
}

function showMyToast(message, isSuccess) {
	Toast.show({
		render: () => <MyToast message={message} isSuccess />,
		placement: "top",
		duration: 2000,
	})
}

export default showMyToast
