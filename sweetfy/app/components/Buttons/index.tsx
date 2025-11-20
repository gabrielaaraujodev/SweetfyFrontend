import { Button } from 'react-native-paper';
import { ButtonVariantTypes, theme } from '@/theme/theme';
import { H5 } from '@/theme/fontsTheme';
import { ViewStyle } from 'react-native';

interface IButtonProps {
  buttonText: string;
  type: ButtonVariantTypes;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
}

const DinamicButton = ({
  buttonText,
  type,
  onPress,
  buttonStyle,
  disabled,
}: IButtonProps) => {
  const buttonType = theme.buttonVariants[type];
  return (
    <Button
      {...buttonType}
      textColor={buttonType.textColor}
      style={{ borderRadius: 8, ...buttonStyle }}
      onPress={onPress}
      disabled={disabled}
    >
      <H5 colorKey={buttonType.textColor}>{buttonText}</H5>
    </Button>
  );
};

export default DinamicButton;
