import { ColorKey, H5 } from '../../theme/fontsTheme';
import { ReactNode, useState } from 'react';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { HelperText, TextInput, TextInputProps } from 'react-native-paper'; // implementar mensagens de erros mais específicas se der tempo
import { Container } from './style';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

interface IInputProps extends TextInputProps {
  theme: ThemeProp;
  title?: string;
  titleColor?: ColorKey;
  securityRequired?: boolean;
  requiredField?: boolean;
  outlinedInput?: boolean; //booleano que viabiliza o estilo outlined do componente de input (colocar borda) com o secondaryTheme
  rightIcon?: string;
  rightIconFunction?(): void;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
}

const InputItens = ({
  theme,
  title,
  inputMode,
  titleColor,
  securityRequired,
  requiredField,
  outlinedInput,
  rightIcon,
  inputStyle,
  containerStyle,
  disabled,
  rightIconFunction,
  ...rest
}: IInputProps) => {
  const [showInputValue, setShowInputValue] = useState(securityRequired);

  const handleShowInputValue = () => {
    setShowInputValue(!showInputValue);
  };

  const effectiveInputIcon = (): ReactNode => {
    if (securityRequired) {
      return (
        <TextInput.Icon
          icon={showInputValue ? 'eye-off' : 'eye'}
          onPress={handleShowInputValue}
        />
      );
    }

    if (rightIcon) {
      return (
        <TextInput.Icon
          icon={rightIcon}
          onPress={rightIconFunction}
        />
      );
    }

    return null;
  };

  const noBorderInput = {
    outlineColor: 'transparent',
    activeOutlineColor: 'transparent',
  };

  const effectiveInputMode = securityRequired ? 'text' : inputMode;

  const placeholderColor = (theme.colors as any)?.onSurfaceVariant + '80';

  return (
    <Container style={containerStyle}>
      {title && (
        <H5 colorKey={titleColor || 'white'}>
          {title}
          {requiredField && ' *'}
        </H5>
      )}

      <TextInput
        {...(!outlinedInput ? noBorderInput : {})} //regra do input com fundo marrom escuro (registro de itens)
        mode="outlined"
        theme={theme}
        inputMode={effectiveInputMode}
        editable={!disabled}
        placeholderTextColor={placeholderColor}
        secureTextEntry={showInputValue}
        right={effectiveInputIcon()}
        style={[{ height: 40 }, inputStyle]}
        {...rest}
      />
    </Container>
  );
};

export default InputItens;
