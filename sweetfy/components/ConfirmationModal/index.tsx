import React from 'react';
import { Button, Dialog, Portal } from 'react-native-paper';
import { theme } from '../../theme/theme';
import { H3, H6, H6_medium } from '../../theme/fontsTheme';
import DinamicButton from '../Buttons';

interface ConfirmModalProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
}

const ConfirmModal = ({
  visible,
  onDismiss,
  onConfirm,
  title,
  message,
  confirmText,
  cancelText,
}: ConfirmModalProps) => {
  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={{ backgroundColor: theme.colors.white, borderRadius: 16 }}
      >
        <Dialog.Title>
          <H3 colorKey="darkBrown">{title}</H3>
        </Dialog.Title>

        <Dialog.Content>
          <H6 colorKey="darkBrown">{message}</H6>
        </Dialog.Content>

        <Dialog.Actions>
          <Button onPress={onDismiss}>
            <H6_medium colorKey="darkBrown">{cancelText}</H6_medium>
          </Button>

          <DinamicButton
            onPress={onConfirm}
            buttonText={confirmText}
            type="yellow"
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default ConfirmModal;
