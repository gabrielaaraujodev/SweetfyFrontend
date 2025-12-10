import { includedItemFields } from '@/pagesContent/registerItems/products';
import AvailableItemsBox from '../AvailableItemsBox';
import { ICustomDropdownItem } from '../Dropdown/types';
import { SelectedItemListBox } from './style';

interface ISelectedItemsList {
  selectedItemsOptions: ICustomDropdownItem[];
  selectedItemsList: includedItemFields[];
  setUpdatedSelectedItemsList(newList: includedItemFields[]): void;
}

const SelectedItemList = ({
  selectedItemsOptions,
  selectedItemsList,
  setUpdatedSelectedItemsList,
}: ISelectedItemsList) => {
  const handleUpdateItem = (
    id: number,
    multiplier: number,
    totalQuantity: number
  ) => {
    const newItem = selectedItemsOptions.find(
      (completeItem) => completeItem.value === id
    );

    const updatedItem = {
      id: newItem.value,
      category: newItem.category,
      quantity: totalQuantity,
      quantityMultiplier: multiplier,
      unitPrice: newItem.unitPrice,
      unitType: newItem.quantityUnit,
    };

    const newList = selectedItemsList.map((exisitingItem) => {
      if (exisitingItem.id === id) {
        return updatedItem;
      }
      return exisitingItem;
    });
    setUpdatedSelectedItemsList(newList);
  };

  const handleRemoveItem = (idToRemove: number) => {
    const newList = selectedItemsList.filter((item) => item.id !== idToRemove);
    setUpdatedSelectedItemsList(newList);
  };
  return (
    <SelectedItemListBox>
      {selectedItemsOptions
        .filter((selectedItem) =>
          selectedItemsList.some(
            (selected) => selected.id === selectedItem.value
          )
        )
        .map((item) => (
          <AvailableItemsBox
            key={item.value}
            isSelected={false}
            inDropDown={false}
            itemName={item.label}
            quantity={item.itemInitialQuantity}
            quantityUnit={item.quantityUnit}
            onSelect={() => {}}
            removeItem={() => {
              handleRemoveItem(item.value);
            }}
            onUpdate={(newQuantity, newQuantityMultiplier) =>
              handleUpdateItem(item.value, newQuantityMultiplier, newQuantity)
            }
          />
        ))}
    </SelectedItemListBox>
  );
};

export default SelectedItemList;
