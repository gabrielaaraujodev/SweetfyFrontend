import * as React from 'react';
import { View, ScrollView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import { useCallback, useMemo, useState } from 'react';
import { calculateRecipeTotalCost } from '@/components/ListOfCards/utils';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Ingredients from '@/pagesContent/registerItems/ingredients';
import Service from '@/components/Items/Services';
import Recipe from '@/components/Items/Recipes';
import {
  PageText,
  ViewContainer,
  ViewProduct,
  ViewDescription,
  PageTitle,
} from './style';

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  quantity: number;
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

interface RecipeData {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  quantity: number;
  totalCost: number;
  additionalCostPercent: number;
  recipeIngredients: Ingredient[];
  recipeServices?: Service[];
}

interface Product {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: Ingredient[];
  productRecipes: RecipeData[];
  productServices: Service[];
}

interface ProductDataWithCost extends Product {
  totalCost: number;
  totalProfit: number;
}

const calculateItemCost = (
  price: number | string | undefined | null,
  quantity: number | string | undefined | null
) => {
  const p = parseFloat(price as any) || 0;
  const q = parseFloat(quantity as any) || 0;
  return p * q;
};

const PageDetailsProduct = () => {
  const [ingredientCosts, setIngredientCosts] = useState<
    Record<number, number>
  >({});
  const [serviceCosts, setServiceCosts] = useState<Record<number, number>>({});
  const [recipeCosts, setRecipeCosts] = useState<Record<number, number>>({});

  const params = useLocalSearchParams();
  const productDataParam = params.recipeData;
  const productDataJson = Array.isArray(productDataParam)
    ? productDataParam[0]
    : productDataParam;
  const product: ProductDataWithCost | null = productDataJson
    ? JSON.parse(productDataJson as string)
    : null;

  if (!product) {
    return <PageText>Produto não encontrado.</PageText>;
  }

  React.useEffect(() => {
    if (!product) return;

    const initialIngredientCosts = (product.productIngredients || []).reduce(
      (acc, item) => {
        acc[item.id] = calculateItemCost(item.unitPriceSnapshot, item.quantity);
        return acc;
      },
      {} as Record<number, number>
    );

    const initialServiceCosts = (product.productServices || []).reduce(
      (acc, item) => {
        const cost = (item.unitPrice || 0) * (item.quantity || 1);
        acc[item.id] = cost;
        return acc;
      },
      {} as Record<number, number>
    );

    const initialRecipeCosts = (product.productRecipes || []).reduce(
      (acc, item) => {
        const costPerUnit = calculateRecipeTotalCost(item);
        acc[item.id] = costPerUnit * (item.quantity || 1);
        return acc;
      },
      {} as Record<number, number>
    );

    setIngredientCosts(initialIngredientCosts);
    setServiceCosts(initialServiceCosts);
    setRecipeCosts(initialRecipeCosts);
  }, [product.productId]);

  const updateIngredientCost = useCallback((itemId: number, cost: number) => {
    setIngredientCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateServiceCost = useCallback((itemId: number, cost: number) => {
    setServiceCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const updateRecipeCost = useCallback((itemId: number, cost: number) => {
    setRecipeCosts((prevCosts) => ({
      ...prevCosts,
      [itemId]: cost,
    }));
  }, []);

  const totalCostValue = useMemo(() => {
    const ingredientsBaseCost = Object.values(ingredientCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const servicesBaseCost = Object.values(serviceCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );
    const recipesBaseCost = Object.values(recipeCosts).reduce(
      (sum, cost) => sum + cost,
      0
    );

    const baseCost = ingredientsBaseCost + servicesBaseCost + recipesBaseCost;
    return baseCost.toFixed(2);
  }, [ingredientCosts, serviceCosts, recipeCosts]);

  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ScrollView>
      <ViewContainer>
        <ViewProduct>
          <ViewDescription>
            <PageTitle> {product.name} </PageTitle>

            <FieldNameAndValue
              name="Custo total"
              value={formatCurrency(totalCostValue)}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <FieldNameAndValue
              name="Preço de venda"
              value={formatCurrency(product.salePrice.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <PageTitle> Modo de preparo </PageTitle>
            <PageText> {product.preparation}</PageText>

            <PageTitle> Receitas </PageTitle>

            <View>
              {product.productRecipes?.map((item) => (
                <Recipe
                  key={item.id}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Gastos totais </PageTitle>

            <View>
              {product.productIngredients?.map((item) => (
                <Ingredients
                  key={item.id}
                  data={item}
                  onCostCalculated={updateIngredientCost}
                />
              ))}
            </View>

            <View>
              {product.productServices?.map((item) => (
                <Service
                  key={item.id}
                  data={item}
                  onCostCalculated={updateServiceCost}
                  quantity={item.quantity}
                />
              ))}
            </View>
          </ViewDescription>
        </ViewProduct>
      </ViewContainer>
    </ScrollView>
  );
};

export default PageDetailsProduct;
