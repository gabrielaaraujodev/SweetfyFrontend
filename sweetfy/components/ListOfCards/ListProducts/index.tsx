import React, { useMemo } from 'react';
import { ContainerList } from './style';
import { ViewStyle, TouchableOpacity } from 'react-native';
import CardProduct from '@/components/Cards/ProductCard';
import { calculateProductTotalCost, calculateRecipeTotalCost } from '../utils';

type NavigateFunction = (product: ProductDataWithCost) => void;

interface ProductData {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: any[];
  productRecipes: any[];
  productServices: any[];
}

interface PropsListOfCards {
  dataProduct: ProductData[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress: NavigateFunction;
}

interface ProductDataWithCost extends ProductData {
  totalCost: number;
  totalProfit: number;
}

const ListProducts: React.FC<PropsListOfCards> = ({
  dataProduct,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress,
}) => {
  const productWithCost: ProductDataWithCost[] = useMemo(() => {
    return dataProduct.map((item) => {
      const totalCost = calculateProductTotalCost(
        item,
        calculateRecipeTotalCost
      );
      const safeTotalCost = totalCost || 0;

      const totalProfit = (item.salePrice || 0) - safeTotalCost;

      return {
        ...item,
        totalCost: safeTotalCost,
        totalProfit: totalProfit,
      };
    });
  }, [dataProduct]);

  return (
    <ContainerList style={style}>
      {productWithCost.map((item) => (
        <TouchableOpacity
          key={item.productId}
          onPress={() => onCardPress(item)}
        >
          <CardProduct
            id={item.productId}
            data={item}
            checkBoxSelected={selectedItemIds.includes(item.productId)}
            showCheckBox={showSelectionControls}
            functionButtonSelected={onItemSelect}
            cardStyle={cardItemStyle}
          />
        </TouchableOpacity>
      ))}
    </ContainerList>
  );
};

export default ListProducts;
