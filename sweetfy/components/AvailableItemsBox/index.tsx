import { H6_medium, P } from '../../theme/fontsTheme';
import { theme, transparentStepperTheme } from '../../theme/theme';
import { useEffect, useState } from 'react';
import InputItens from '../Inputs';
import {
  ButtonBox,
  CalculationButtonBox,
  Container,
  VerticalLine,
} from './styles';
import { getAbbreviationUnitType } from '../../pagesContent/registerItems/utils';
import { UnitTypeEnum } from '../../pagesContent/registerItems/types';
import { IconButton } from 'react-native-paper';

interface IAvailableItemsBox {
  itemName: string;
  quantity: number;
  quantityUnit: UnitTypeEnum;
  inDropDown: boolean;
  isSelected: boolean;
  onSelect(item: any): void;
  removeItem?(): void;
  onUpdate?(newTotal: number, newMultiplier: number): void;
}

const AvailableItemsBox = ({
  itemName,
  quantity,
  quantityUnit,
  inDropDown,
  isSelected,
  onSelect,
  removeItem,
  onUpdate,
}: IAvailableItemsBox) => {
  const [totalValue, setTotalValue] = useState<number>(quantity);
  const [multiplier, setMultiplier] = useState<number>(1);
  const [isFocused, setIsFocused] = useState(false);
  const unitLabel = getAbbreviationUnitType(quantityUnit.toString());

  useEffect(() => {
    if (inDropDown) {
      setTotalValue(quantity);
    }
  }, [quantity, inDropDown]);

  const handleInputChange = (text: string) => {
    const cleanText = text.replace(/[^0-9.,]/g, '').replace(',', '.');
    const newTotal = parseFloat(cleanText);

    if (!isNaN(newTotal)) {
      setTotalValue(newTotal);

      const newMultiplier = quantity > 0 ? Math.ceil(newTotal / quantity) : 1;
      setMultiplier(newMultiplier);

      if (onUpdate) onUpdate(newTotal, newMultiplier);
    } else {
      setTotalValue(quantity);
      setMultiplier(1);
      if (onUpdate) onUpdate(quantity, 1);
    }
  };

  const handleStepperChange = (change: number) => {
    const newMultiplier = Math.max(0, multiplier + change);
    const newTotal = newMultiplier * quantity;

    setMultiplier(newMultiplier);
    setTotalValue(newTotal);

    if (onUpdate) onUpdate(newTotal, newMultiplier);
  };

  return (
    <Container
      onPress={onSelect}
      selectedBackgroundColor={isSelected}
    >
      <P
        colorKey="pinkRed"
        style={{ flex: 0.9 }}
      >
        {itemName}
      </P>
      <InputItens
        containerStyle={{ width: '25%' }}
        inputStyle={{
          textAlign: 'center',
          textDecorationLine: !inDropDown ? 'underline' : 'none',
          textDecorationColor: !inDropDown ? theme.colors.pinkRed : '',
        }}
        contentStyle={{
          paddingVertical: 0,
          paddingHorizontal: 0,
          margin: 0,
          ...theme.typography.p_medium,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputMode="numeric"
        keyboardType="number-pad"
        placeholder=""
        onChangeText={handleInputChange}
        theme={transparentStepperTheme}
        value={isFocused ? String(totalValue) : `${totalValue}${unitLabel}`}
        disabled={inDropDown}
      />
      {!inDropDown && (
        <>
          <CalculationButtonBox>
            <ButtonBox
              onPress={() => (multiplier > 1 ? handleStepperChange(-1) : {})}
            >
              <H6_medium colorKey="pinkRed">-</H6_medium>
            </ButtonBox>
            <VerticalLine />
            <P
              colorKey="pinkRed"
              style={{ padding: 3 }}
            >
              {multiplier}
            </P>
            <VerticalLine />

            <ButtonBox onPress={() => handleStepperChange(+1)}>
              <H6_medium colorKey="pinkRed">+</H6_medium>
            </ButtonBox>
          </CalculationButtonBox>
          <IconButton
            icon={require('../../assets/icons/close.png')}
            size={12}
            style={{ margin: 0 }}
            onPress={removeItem}
            iconColor={theme.colors.pinkRed}
          />
        </>
      )}
    </Container>
  );
};

export default AvailableItemsBox;
