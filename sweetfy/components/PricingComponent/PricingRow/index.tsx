import SpecificFormatInput from '@/components/Inputs/SpecificFormatInput';
import { P, H6_medium } from '../../../theme/fontsTheme';
import { transparentStepperTheme, theme } from '../../../theme/theme';
import { useEffect, useState } from 'react';
import { View } from 'react-native';
import { IconButton, RadioButton } from 'react-native-paper';
import { TableRow } from '../styles';
import {
  calculateMargin,
  calculateSalePrice,
} from '@/pagesContent/registerItems/utils';

interface IPricingValue {
  cost: number;
  profit: number;
  currentSelectedProfit: number;
  setCurrentSelectedProfit(rowProfitValue: number): void;
  onUpdateProfit(updatedProfit: number): void;
}

const PricingRow = ({
  cost,
  profit,
  currentSelectedProfit,
  setCurrentSelectedProfit,
  onUpdateProfit,
}: IPricingValue) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isManualPrice, setIsManualPrice] = useState(false);

  const initialPrice = cost * (profit / 100) + cost;

  const [priceValue, setPriceValue] = useState<number | null>(initialPrice);
  const [profitValue, setProfitValue] = useState<number | null>(profit);
  const [onEditingPriceValue, setOnEditingPriceValue] = useState<number | null>(
    initialPrice
  );
  const [onEditingProfitValue, setOnEditingProfitValue] =
    useState<number>(profit);

  useEffect(() => {
    if (!isManualPrice) {
      const newPrice = calculateSalePrice(cost, profit);
      setPriceValue(newPrice);
      setProfitValue(profit);
      setOnEditingPriceValue(newPrice);
      setOnEditingProfitValue(profit);
    } else if (priceValue && cost > 0) {
      const newMargin = calculateMargin(cost, priceValue);
      setProfitValue(newMargin);
      setOnEditingProfitValue(newMargin);
      onUpdateProfit(newMargin);
    }
  }, [cost, profit]);

  const handleStartEditing = () => {
    setIsEditing(true);
    setOnEditingPriceValue(priceValue);
    setOnEditingProfitValue(profitValue);
  };

  const handleSaveEditedValue = () => {
    setIsEditing(false);

    if (onEditingProfitValue > 0) {
      setPriceValue(onEditingPriceValue);
      setProfitValue(onEditingProfitValue);
      onUpdateProfit(profitValue);
    } else {
      setOnEditingPriceValue(priceValue);
      setProfitValue(profitValue);
    }

    setIsManualPrice(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setOnEditingPriceValue(priceValue);
    setOnEditingProfitValue(profitValue);

    setIsManualPrice(false);
  };

  const handlePriceChange = (newPrice: number | null) => {
    setOnEditingPriceValue(newPrice);

    const calculatedProfit =
      newPrice !== null && !isNaN(newPrice) && cost > 0
        ? ((newPrice - cost) / cost) * 100
        : 0;

    setOnEditingProfitValue(calculatedProfit);
  };

  return (
    <TableRow>
      <P style={{ minWidth: '15%' }}>{`R$${cost.toFixed(2)}`}</P>
      <SpecificFormatInput
        inputTheme={transparentStepperTheme}
        value={isEditing ? onEditingPriceValue : priceValue}
        onChangeValue={handlePriceChange}
        type="monetary"
        containerStyle={{ maxWidth: '23%' }}
        transparent
        inputProps={{
          disabled: !isEditing,
          underlineStyle: { borderWidth: 20 },
          style: isEditing
            ? {
                textDecorationColor: theme.colors.yellow,
                textDecorationLine: 'underline',
              }
            : {},
        }}
      />
      <IconButton
        icon={isEditing ? 'backup-restore' : 'pencil'}
        size={15}
        iconColor={theme.colors.yellow}
        rippleColor={theme.colors.rippleColor}
        style={{
          backgroundColor: theme.colors.brown,
          margin: 0,
          width: 25,
          height: 25,
          right: 4,
          alignSelf: 'center',
        }}
        onPress={!isEditing ? handleStartEditing : handleCancelEdit}
      />
      <H6_medium style={{ minWidth: '20%' }}>
        {isEditing ? onEditingProfitValue.toFixed(1) : profitValue.toFixed(1)}%
      </H6_medium>
      <View style={{ transform: [{ scale: 0.85 }] }}>
        {isEditing ? (
          <IconButton
            icon={'check'}
            size={20}
            iconColor={theme.colors.yellow}
            rippleColor={theme.colors.rippleColor}
            style={{
              backgroundColor: theme.colors.brown,
              margin: 0,
            }}
            onPress={handleSaveEditedValue}
          />
        ) : (
          <RadioButton
            value={profitValue.toString()}
            status={
              currentSelectedProfit === profitValue ? 'checked' : 'unchecked'
            }
            onPress={() => {
              setCurrentSelectedProfit(profitValue);
              setIsManualPrice(false);
            }}
            color={theme.colors.yellow}
          />
        )}
      </View>
    </TableRow>
  );
};

export default PricingRow;
