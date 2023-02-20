import { observer } from "mobx-react";
import React from "react";
import {
	NativeSyntheticEvent,
	Platform,
	TextInput,
	TextInputKeyPressEventData,
} from "react-native";
import { useTheme } from "react-native-paper";
import { CustomTheme } from "../../constants/Colors";
import Channel from "../../stores/Channel";
import Container from "../Container";

interface Props {
	channel: Channel;
}

function ChatInput({ channel }: Props) {
	const [message, setMessage] = React.useState("");
	const theme = useTheme<CustomTheme>();

	const postMessage = async (
		e: NativeSyntheticEvent<TextInputKeyPressEventData>,
	) => {
		// @ts-ignore
		if (e.which === 13 && !e.shiftKey) {
			// send message
			e.preventDefault();

			// check if the message is empty, contains only spaces, or contains only newlines
			if (
				!message ||
				!message.trim() ||
				!message.replace(/\r?\n|\r/g, "")
			)
				return;

			setMessage("");
			await channel.messages.sendMessage({
				content: message,
			});
		}
	};

	return (
		<Container
			testID="chatInput"
			style={{
				paddingHorizontal: 16,
				marginBottom: 24,
				maxHeight: Platform.isMobile ? undefined : "50vh",
			}}
		>
			<TextInput
				placeholder={`Message #${channel?.name}`}
				value={message}
				onChangeText={(message) => setMessage(message)}
				editable
				multiline
				style={{
					backgroundColor: theme.colors.palette.backgroundPrimary80,
					color: theme.colors.whiteBlack,
					padding: 10,
					borderRadius: 10,
					// @ts-ignore
					outlineStyle: "none",
				}}
				placeholderTextColor={theme.colors.text}
				spellCheck={false}
				onKeyPress={postMessage}
			/>
		</Container>
	);
}

export default observer(ChatInput);
