import { Button } from 'react-native-paper';
import { ButtonVariantTypes, theme } from '../../theme/theme';
import { H5, H6 } from '../../theme/fontsTheme';
import { ViewStyle } from 'react-native';

interface IButtonProps {
  buttonText: string;
  type: ButtonVariantTypes;
  onPress: () => void;
  buttonStyle?: ViewStyle;
  disabled?: boolean;
  smallText?: boolean;
}

const DinamicButton = ({
  buttonText,
  type,
  onPress,
  buttonStyle,
  disabled,
  smallText,
}: IButtonProps) => {
  const variantProps = theme.buttonVariants[type](disabled);
  return (
    <Button
      {...variantProps}
      textColor={variantProps.textColor}
      style={{ borderRadius: 8, ...buttonStyle, zIndex: -1 }}
      onPress={onPress}
      disabled={disabled}
      theme={{
        colors: {
          surfaceDisabled: variantProps.buttonColor,
          onSurfaceDisabled: variantProps.textColor,
        },
      }}
      compact={smallText}
    >
      {smallText ? (
        <H6 colorKey={variantProps.textColor}>{buttonText}</H6>
      ) : (
        <H5 colorKey={variantProps.textColor}>{buttonText}</H5>
      )}
    </Button>
  );
};

export default DinamicButton;
