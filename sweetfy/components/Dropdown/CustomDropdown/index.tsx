import { memo, useEffect, useState } from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import { primaryTheme, theme } from '../../../theme/theme';
import { Icon } from 'react-native-paper';
import { H5 } from '../../../theme/fontsTheme';
import { ICustomDropdownItem } from '../types';
import { Container } from '@/components/Inputs/style';
import AvailableItemsBox from '@/components/AvailableItemsBox';
import { includedItemFields } from '@/pagesContent/registerItems/products';

interface ICustomDropdownProps {
  options: ICustomDropdownItem[];
  currentSelectedItems: includedItemFields[];
  placeholder: string;
  searchable?: boolean;
  searchPlaceholder?: string;
  requiredField?: boolean;
  title?: string;
  setSelectedOptions(value: includedItemFields[]): void;
}

const CustomDropdownInput = ({
  options,
  currentSelectedItems,
  placeholder,
  searchPlaceholder,
  requiredField,
  title,
  setSelectedOptions,
}: ICustomDropdownProps) => {
  const [showDropDownOptions, setShowDropDownOptions] = useState(false);
  const [selectedItemsIds, setSelectedItemsIds] = useState<number[]>(
    currentSelectedItems.map((item) => item.id)
  );

  useEffect(() => {
    const currentIds = currentSelectedItems.map((item) => item.id);
    setSelectedItemsIds(currentIds);
  }, [currentSelectedItems]);

  useEffect(() => {
    const newSelectedObjects = options
      .filter((option) => selectedItemsIds.includes(option.value))
      .map((includedItem) => ({
        id: includedItem.value,
        category: includedItem.category,
        quantity: includedItem.itemInitialQuantity,
        quantityMultiplier: 1,
        unitPrice: includedItem.unitPrice,
        unitType: includedItem.quantityUnit,
      }));

    if (
      newSelectedObjects.length !== currentSelectedItems.length ||
      !newSelectedObjects.every((item) =>
        currentSelectedItems.some((curr) => curr.id === item.id)
      )
    ) {
      setSelectedOptions(newSelectedObjects);
    }
  }, [selectedItemsIds]);

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
        multiple
        open={showDropDownOptions}
        value={selectedItemsIds}
        multipleText="Selecionando..."
        ListEmptyComponent={() => <></>}
        items={options}
        renderListItem={(props) => {
          const item = props.item as ICustomDropdownItem;
          return (
            <AvailableItemsBox
              inDropDown
              itemName={item.label}
              quantityUnit={item.quantityUnit}
              quantity={item.itemInitialQuantity}
              onSelect={() => props.onPress(props.item as any)}
              isSelected={props.isSelected}
            />
          );
        }}
        dropDownDirection="BOTTOM"
        setOpen={setShowDropDownOptions}
        setValue={setSelectedItemsIds}
        searchable
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
        containerStyle={{ width: 'auto', maxWidth: '100%', zIndex: 20000 }}
        dropDownContainerStyle={{
          maxWidth: '100%',
          borderColor: theme.colors.yellowLight,
        }}
        selectedItemContainerStyle={{ backgroundColor: theme.colors.white }}
        labelStyle={{ color: theme.colors.inputWhite }}
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
export default memo(CustomDropdownInput);
