import * as React from 'react';
import { ViewStyle, View, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-paper';
import {
  ContainerCard,
  ContainerPrice,
  ContainerWithCheckBox,
  TextCard,
  TextCost,
  TextProfit,
  TitleCard,
  ViewCard,
  ViewPrice,
} from './style';
import FieldNameAndValue from '../../FieldNameAndValue';
import { ListProductsInput } from '@/components/ListProductsInput';
import { IOrder } from '@/api/register/types';
import { H5 } from '@/theme/fontsTheme';

export interface OrderData {
  id: number;
  name: string;
  description: string;
  totalYield: number;
  totalCost: number;
  salePrice: number;
  profit: number;
  status: string;
  orderProducts: Product[];
  orderRecipes: Recipe[];
}

export interface Product {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: Ingredient[];
  productRecipes: Recipe[];
  productServices: Service[];
}

interface Recipe {
  id: number;
  recipeId: number;
  recipeName: string;
  quantity: number;
  unitPriceSnapshot: number;
  costSnapshot: number;
  totalCost: number;
  totalProfit: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number;
}

interface Ingredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

interface CardOrderProps {
  data: IOrder;
  id: number;
  showCheckBox: boolean;
  checkBoxSelected: boolean;
  functionButtonSelected?: (id: number) => void;
  cardStyle?: ViewStyle;
}

export const CardOrder: React.FC<CardOrderProps> = ({
  id,
  showCheckBox,
  checkBoxSelected,
  functionButtonSelected,
  data,
  cardStyle,
}) => {
  const ControllerCheckBox = () => {
    if (!showCheckBox || !functionButtonSelected) {
      return null;
    }

    const iconName = checkBoxSelected
      ? 'checkbox-marked'
      : 'checkbox-blank-outline';

    return (
      <TouchableOpacity onPress={() => functionButtonSelected(id)}>
        <Icon
          source={iconName}
          size={24}
          color="#880741"
        />
      </TouchableOpacity>
    );
  };

  return (
    <ContainerWithCheckBox >
      {ControllerCheckBox()}

      <ContainerCard>
        <ViewCard>
          <H5 colorKey="darkBrown">{data.name}</H5>

          <View
            style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
             }}
          >
            <TextCard> {data.description} </TextCard>
          </View>

          <FieldNameAndValue
            name="Preço de venda:"
            value={data.salePrice}
          />
          <ContainerPrice>
            <ViewPrice>
              <TextCost> Custo total </TextCost>
              <TextCost> {data.totalCost} </TextCost>
            </ViewPrice>
            <ViewPrice>
              <TextProfit> Lucro total </TextProfit>
              <TextProfit> {data.profit} </TextProfit>
            </ViewPrice>
          </ContainerPrice>

          <View>
            {/* <ListProductsInput items={data.orderProducts} /> */}
          </View>
        </ViewCard>
      </ContainerCard>
    </ContainerWithCheckBox>
  );
};

export default CardOrder;
