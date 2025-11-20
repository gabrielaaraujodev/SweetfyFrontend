import { theme } from '@/theme/theme';
import { useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { IDropdownItem } from '../Dropdown/types';

interface ITemplateComponent {
  options: IDropdownItem[];
  placeholder: string;
  searchPlaceholder: string;
}

const TemplateComponent = ({
  options,
  placeholder,
  searchPlaceholder,
}: ITemplateComponent) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [showDropDownOptions, setShowDropDownOptions] = useState(false);
  return (
    <DropDownPicker
      open={showDropDownOptions}
      value={selectedOption}
      items={options}
      setOpen={setShowDropDownOptions}
      setValue={setSelectedOption}
      autoScroll
      searchable
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      style={{
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        width: 'auto',
      }}
      containerStyle={{ width: 'auto' }}
      showArrowIcon={false}
      searchContainerStyle={{}}
      dropDownContainerStyle={{ width: 200, zIndex: 99 }}
      placeholderStyle={{
        color: 'white',
        textDecorationLine: 'underline',
      }}
      selectedItemContainerStyle={{ backgroundColor: theme.colors.white }}
      labelStyle={{
        backgroundColor: theme.colors.yellow,
        color: theme.colors.darkBrown,
        borderRadius: 12,
        padding: 6,
        ...theme.typography.h6_body_bold,
      }}
    />
  );
};

export default TemplateComponent;
