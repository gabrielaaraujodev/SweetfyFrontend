import CurrencyInput, { CurrencyInputProps } from 'react-native-currency-input';
import InputItens from '..';
import { secondaryTheme, theme } from '../../../theme/theme';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';
import { StyleProp, ViewStyle } from 'react-native';
import { TextInputProps } from 'react-native-paper';

interface ISpecificFormatInput extends CurrencyInputProps {
  type: 'monetary' | 'percentage';
  title?: string;
  inputTheme?: ThemeProp;
  containerStyle?: StyleProp<ViewStyle>;
  transparent?: boolean;
  inputProps?: TextInputProps;
}

const SpecificFormatInput = ({
  type,
  title,
  placeholder,
  inputTheme,
  ...rest
}: ISpecificFormatInput) => {
  const prefixByType = type === 'monetary' ? 'R$' : '';
  const suffixByType = type === 'percentage' ? '%' : '';
  const precisionByType = type === 'percentage' ? 1 : 2;
  return (
    <CurrencyInput
      prefix={prefixByType}
      suffix={suffixByType}
      delimiter="."
      separator=","
      precision={precisionByType}
      renderTextInput={(textInputProps) => (
        <InputItens
          containerStyle={[rest.containerStyle, { flex: 1 }]}
          inputMode="numeric"
          placeholder={placeholder}
          onChangeText={textInputProps.onChangeText ?? (() => {})}
          value={textInputProps.value as string}
          theme={inputTheme ?? secondaryTheme}
          keyboardType="decimal-pad"
          title={title}
          dense={rest.transparent}
          contentStyle={
            rest.transparent && {
              paddingVertical: 0,
              paddingHorizontal: 0,
              margin: 0,
              ...theme.typography.p,
            }
          }
          outlinedInput={!rest.transparent}
          requiredField
          textColor={rest.transparent ? theme.colors.inputWhite : ''}
          onSelectionChange={textInputProps.onSelectionChange}
          selection={textInputProps.selection}
          {...rest.inputProps}
        />
      )}
      {...rest}
    />
  );
};

export default SpecificFormatInput;
