import React, { useMemo } from 'react';
import { ContainerList } from './style';
import { ViewStyle, TouchableOpacity } from 'react-native';
import CardOrder from '@/components/Cards/OrderCard';

type NavigateFunction = (product: OrderData) => void;

interface OrderData {
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

interface Product {
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

interface PropsListOfCards {
  data: OrderData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

const ListOrder: React.FC<PropsListOfCards> = ({
  data,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress,
}) => {
  return (
    <ContainerList style={style}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onCardPress(item)}
        >
          <CardOrder
            id={item.id}
            data={item}
            checkBoxSelected={selectedItemIds.includes(item.id)}
            showCheckBox={showSelectionControls}
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
        </TouchableOpacity>
      ))}
    </ContainerList>
  );
};

export default ListOrder;
