import React, { useState } from "react";
import WebView from "react-native-webview";
import { Modal, StyleSheet } from "react-native";

interface ISubscribePopupProps {
    isOpen: boolean;
    url: string;
    onClose: () => void;
    onComplete: () => void;
}

export const SubscribePopup: React.FC<ISubscribePopupProps> = ({ isOpen, url, onClose, onComplete }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    return(
        <Modal visible={isOpen}>
            <WebView
                onError={(event) => {
                    if (!event.nativeEvent.url.includes("success")) {
                        onComplete();
                    }
                    onClose();
                }}
                source={{ uri: url }}
                style={!isLoading && styles.flex}
                onLoadStart={() => {
                    setIsLoading(true);
                }}
                onLoadEnd={(event) => {
                    setIsLoading(false);
                    // if (event.nativeEvent.url.includes("success")) {
                    // dispatch(setDefaultCreateForm(DefaultCreateForm));
                    // dispatch(approveSubscribe({id: organizationId, type}));
                    // }
                }}
                />
        </Modal>
    );
};

const styles = StyleSheet.create({
    flex: {
        flex: 1
    }
});