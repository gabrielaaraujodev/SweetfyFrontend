import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { IDropdownItem } from './types';
import { primaryTheme, theme } from '../../theme/theme';
import { Icon } from 'react-native-paper';
import { Container } from '../Inputs/style';
import { H5 } from '../../theme/fontsTheme';
import { StyleProp, ViewStyle } from 'react-native';

interface IDropdownProps {
  options: IDropdownItem[];
  placeholder: string;
  multipleSelection?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  requiredField?: boolean;
  title?: string;
  containerStyle?: StyleProp<ViewStyle>;
  selectedOptions: any;
  setSelectedOptions(value: any): void;
}

const DropdownInput = ({
  options,
  placeholder,
  searchPlaceholder,
  multipleSelection,
  searchable,
  requiredField,
  title,
  selectedOptions,
  setSelectedOptions,
}: IDropdownProps) => {
  const [showDropDownOptions, setShowDropDownOptions] = useState(false);
  return (
    <Container
      style={{ flex: 1 }}
      theme={primaryTheme}
    >
      {title && (
        <H5 colorKey="white">
          {title}
          {requiredField && ' *'}
        </H5>
      )}
      <DropDownPicker
        multiple={multipleSelection}
        mode="BADGE"
        open={showDropDownOptions}
        value={selectedOptions}
        items={options}
        dropDownDirection="BOTTOM"
        setOpen={setShowDropDownOptions}
        setValue={setSelectedOptions}
        searchable={searchable}
        placeholder={placeholder}
        searchPlaceholder={searchPlaceholder}
        extendableBadgeContainer
        labelProps={{ numberOfLines: 1 }}
        style={{
          backgroundColor: 'transparent',
          maxWidth: '100%',
          borderColor: theme.colors.yellow,
          minHeight: 41,
        }}
        autoScroll
        badgeColors={theme.colors.inputWhite}
        badgeDotColors={theme.colors.pinkRed}
        containerStyle={{ width: 'auto', maxWidth: '100%' }}
        dropDownContainerStyle={{
          maxWidth: '100%',
          borderColor: theme.colors.yellowLight,
        }}
        selectedItemContainerStyle={{ backgroundColor: theme.colors.white }}
        labelStyle={{ color: theme.colors.inputWhite }}
        textStyle={{ ...theme.typography.h6_body }}
        placeholderStyle={{
          color: theme.colors.yellow,
          opacity: '60%',
        }}
        ArrowDownIconComponent={() => {
          return (
            <Icon
              source="menu-down"
              size={24}
              color={theme.colors.yellow}
            />
          );
        }}
        ArrowUpIconComponent={() => {
          return (
            <Icon
              source="menu-up"
              size={24}
              color={theme.colors.yellow}
            />
          );
        }}
      />
    </Container>
  );
};
export default DropdownInput;
