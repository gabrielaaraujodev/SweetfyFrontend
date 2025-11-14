import { ColorKey, H5 } from '@/theme/fontsTheme';
import { useState } from 'react';
import { InputModeOptions } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Container } from './style';

interface IInputProps {
  title: string;
  placeholder: string;
  inputMode: InputModeOptions;
  titleColor?: ColorKey;
  securityRequired?: boolean;
  requiredField?: boolean;
  outlinedInput?: boolean; //booleano que viabiliza o estilo outlined do componente de input (colocar borda) com o secondaryTheme
}

const InputItens = ({
  title,
  placeholder,
  inputMode,
  titleColor,
  securityRequired,
  requiredField,
  outlinedInput,
}: IInputProps) => {
  const [inputValue, setInputValue] = useState('');
  const [showInputValue, setShowInputValue] = useState(securityRequired);

  const handleShowInputValue = () => {
    setShowInputValue(!showInputValue);
  };

  const noBorderInput = {
    outlineColor: 'transparent',
    activeOutlineColor: 'transparent',
  };

  return (
    <Container>
      <H5 colorKey={titleColor || 'white'}>
        {title}
        {requiredField && ' *'}
      </H5>
      <TextInput
        {...(!outlinedInput ? noBorderInput : {})} //regra do input com fundo marrom escuro (registro de itens)
        mode="outlined"
        inputMode={inputMode}
        value={inputValue}
        placeholder={placeholder}
        onChangeText={setInputValue}
        secureTextEntry={showInputValue}
        right={
          securityRequired ? (
            <TextInput.Icon
              icon={showInputValue ? 'eye-off' : 'eye'}
              onPress={handleShowInputValue}
            />
          ) : null
        }
      />
    </Container>
  );
};

export default InputItens;
