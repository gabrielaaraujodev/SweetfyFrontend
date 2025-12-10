import { IIngredient } from '@/api/register/types';
import { getAbbreviationUnitType } from '@/pagesContent/registerItems/utils';
import { H6_bold, H6 } from '@/theme/fontsTheme';
import { theme } from '@/theme/theme';
import { TouchableOpacity, View } from 'react-native';

interface IIngredientCard {
  ingredientData: IIngredient;
  selectCardFunction?(): void;
  selected?: boolean;
}

const IngredientCard = ({
  ingredientData,
  selectCardFunction,
  selected,
}: IIngredientCard) => {
  return (
    <TouchableOpacity
      onPress={selectCardFunction}
      style={{
        borderLeftWidth: 6,
        borderLeftColor: theme.colors.pinkRed,
        borderColor: theme.colors.pinkRed,
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
        padding: 12,
        gap: 2,
        backgroundColor: selected
          ? theme.colors.lightBlue
          : theme.colors.inputWhite,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
        }}
      >
        <H6_bold colorKey="darkBrown">{ingredientData.name}</H6_bold>
        <H6 colorKey="darkBrown">R${ingredientData.unitPrice.toFixed(2)}</H6>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <H6 colorKey="darkBrown">{ingredientData.brand}</H6>
        <H6 colorKey="darkBrown">
          {ingredientData.quantity}
          {getAbbreviationUnitType(ingredientData.unit.toString())}
        </H6>
      </View>
    </TouchableOpacity>
  );
};

export default IngredientCard;
