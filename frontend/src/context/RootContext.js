import React, { useState, useEffect } from "react"
import { DisplayContextProvider } from "./DisplayContext"
import { UserContextProvider } from "./UserContext"
import { ClipContextProvider } from "./ClipContext"


function RootContextProvider({children}) {
	return (
		<DisplayContextProvider>
			<ClipContextProvider>
				<UserContextProvider>{children}</UserContextProvider>
			</ClipContextProvider>
		</DisplayContextProvider>
	)
}

export { RootContextProvider }
