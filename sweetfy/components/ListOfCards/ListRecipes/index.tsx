import CardRecipe from '@/components/Cards/RecipeCard';
import { ContainerList } from './style';
import React, { useMemo } from 'react';
import { ViewStyle, TouchableOpacity } from 'react-native';
import { calculateRecipeTotalCost } from '../utils';
import RecipeCard from '@/components/CardsV2/RecipeCard';
import { IRecipe } from '@/api/register/types';

type NavigateFunction = (recipe: RecipeDataWithCost) => void;

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  quantity: number;
  additionalCostPercent: number;
  recipeIngredients: Ingredient[];
  recipeServices: Service[];
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

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number;
}

interface PropsListOfCards {
  dataRecipe: IRecipe[];
  showSelectionControls?: boolean;
  onItemSelect?: (itemId: number) => void;
  selectedItemIds?: number[];
  style?: ViewStyle;
  cardItemStyle?: ViewStyle;
  onCardPress(): void;
}

interface RecipeDataWithCost extends RecipeData {
  totalCost: number;
  quantity: number;
}

const ListRecipes: React.FC<PropsListOfCards> = ({
  dataRecipe,
  showSelectionControls = false,
  onItemSelect,
  selectedItemIds = [],
  style,
  cardItemStyle,
  onCardPress,
}) => {
  return (
    <ContainerList style={style}>
      {dataRecipe.map((item) => (
        <TouchableOpacity
          key={item.id}
          onPress={() => onCardPress()}
        >
          <RecipeCard recipeData={item}></RecipeCard>
        </TouchableOpacity>
      ))}
    </ContainerList>
  );
};

export default ListRecipes;
