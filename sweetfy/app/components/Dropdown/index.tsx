import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { IDropdownItem } from './types';
import { theme } from '@/theme/theme';
import { Icon } from 'react-native-paper';

interface IDropdownProps {
  options: IDropdownItem[];
  placeholder: string;
  multipleSelection?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
}

const DropdownInput = ({
  options,
  placeholder,
  searchPlaceholder,
  multipleSelection,
  searchable,
}: IDropdownProps) => {
  const [selectedOptions, setSelectedOptions] = useState<any>(
    multipleSelection ? [] : ''
  );
  const [showDropDownOptions, setShowDropDownOptions] = useState(false);
  return (
    <DropDownPicker
      multiple={multipleSelection}
      mode="BADGE"
      open={showDropDownOptions}
      value={selectedOptions}
      items={options}
      setOpen={setShowDropDownOptions}
      setValue={setSelectedOptions}
      searchable={searchable}
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      extendableBadgeContainer
      style={{
        backgroundColor: 'transparent',
        maxWidth: '100%',
        borderColor: theme.colors.yellow,
      }}
      autoScroll
      badgeColors={theme.colors.inputWhite}
      badgeDotColors={theme.colors.pinkRed}
      containerStyle={{ width: 'auto', maxWidth: '100%' }}
      dropDownContainerStyle={{ maxWidth: '100%' }}
      selectedItemContainerStyle={{ backgroundColor: theme.colors.white }}
      labelStyle={{ color: theme.colors.inputWhite }}
      textStyle={{ ...theme.typography.h6_body }}
      placeholderStyle={{
        color: theme.colors.yellow,
        ...theme.typography.h6_body_bold,
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
  );
};
export default DropdownInput;
