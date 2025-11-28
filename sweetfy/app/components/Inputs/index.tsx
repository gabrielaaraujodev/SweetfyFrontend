import { ColorKey, H5 } from '@/theme/fontsTheme';
import { ReactNode, useState } from 'react';
import {
  InputModeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { HelperText, TextInput } from 'react-native-paper'; // implementar mensagens de erros mais específicas se der tempo
import { Container } from './style';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

interface IInputProps {
  theme: ThemeProp;
  placeholder: string;
  value: string;
  setInputValue: (value: any) => void;
  inputMode: InputModeOptions;
  title?: string;
  titleColor?: ColorKey;
  securityRequired?: boolean;
  requiredField?: boolean;
  outlinedInput?: boolean; //booleano que viabiliza o estilo outlined do componente de input (colocar borda) com o secondaryTheme
  rightIcon?: string;
  rightIconFunction?: () => void;
  inputStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

const InputItens = ({
  theme,
  title,
  placeholder,
  inputMode,
  titleColor,
  securityRequired,
  requiredField,
  outlinedInput,
  rightIcon,
  inputStyle,
  containerStyle,
  value,
  setInputValue,
  rightIconFunction,
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
        value={value}
        placeholder={placeholder}
        onChangeText={setInputValue}
        secureTextEntry={showInputValue}
        right={effectiveInputIcon()}
        style={inputStyle}
      />
    </Container>
  );
};

export default InputItens;
