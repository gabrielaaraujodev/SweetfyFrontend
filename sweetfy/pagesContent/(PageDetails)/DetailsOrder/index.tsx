import * as React from 'react';
import { View, ScrollView } from 'react-native';

import { useLocalSearchParams } from 'expo-router';
import FieldNameAndValue from '@/components/FieldNameAndValue';
import Ingredients from '@/pagesContent/registerItems/ingredients';
import Product from '@/components/Items/Products';
import Recipe from '@/components/Items/Recipes';
import Service from '@/components/Items/Services';
import {
  PageText,
  PageTitle,
  ViewContainer,
  ViewDescription,
  ViewProduct,
} from './style';

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
  orderRecipes: RecipeData[];
  orderServices: Service[];
  orderIngredient: Ingredient[];
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
  totalCost: number;
  totalProfit: number;
  quantity: number;
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

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number;
  quantity: number;
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

const PageDetailsOrders = () => {
  const params = useLocalSearchParams();
  const orderDataParam = params.orderData;
  const orderDataJson = Array.isArray(orderDataParam)
    ? orderDataParam[0]
    : orderDataParam;
  const order: OrderData | null = orderDataJson
    ? JSON.parse(orderDataJson as string)
    : null;

  if (!order) {
    return <PageText>Encomenda não encontrada.</PageText>;
  }

  const formatCurrency = (value: string) => `R$ ${value.replace('.', ',')}`;

  return (
    <ScrollView>
      <ViewContainer>
        <ViewProduct>
          <ViewDescription>
            <PageTitle> {order.name} </PageTitle>

            <FieldNameAndValue
              name="Custo total"
              value={formatCurrency(order.totalCost.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <FieldNameAndValue
              name="Preço de venda"
              value={formatCurrency(order.salePrice.toString())}
              nameStyle={{ fontSize: 25, fontWeight: 'bold' }}
              valueStyle={{ fontSize: 25 }}
            />

            <PageTitle> Modo de preparo </PageTitle>
            <PageText> {order.description}</PageText>

            <PageTitle> Receitas </PageTitle>

            <View>
              {order.orderRecipes?.map((item) => (
                <Recipe
                  key={item.id}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Produtos </PageTitle>

            <View>
              {order.orderProducts?.map((item) => (
                <Product
                  key={item.productId}
                  data={item}
                  quantity={item.quantity}
                />
              ))}
            </View>

            <PageTitle> Gastos totais </PageTitle>

            <View>
              {order.orderIngredient?.map((item) => (
                <Ingredients
                  key={item.id}
                  data={item}
                />
              ))}
            </View>

            <View>
              {order.orderServices?.map((item) => (
                <Service
                  key={item.id}
                  data={item}
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

export default PageDetailsOrders;
