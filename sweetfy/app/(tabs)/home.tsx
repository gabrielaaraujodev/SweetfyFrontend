import { TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { OrderData } from '@/components/Cards/OrderCard';
import { ProductData } from '@/components/Cards/ProductCard';
import { RecipeData } from '@/components/Cards/RecipeCard';
import React from 'react';
import { Title } from 'react-native-paper';
import {
  ContainerListOFCards,
  ViewButtonTitle,
} from '@/pagesContent/home/style';
import ListOrders from '@/components/ListOfCards/ListOrders';
import ListProducts from '@/components/ListOfCards/ListProducts';
import ListRecipes from '@/components/ListOfCards/ListRecipes';

const mockOrders = [
  {
    id: 1,
    name: 'Bolo de morango',
    description: 'Encomenda realizada pela Eliana, no bairro Taquaril',
    totalYield: 5,
    totalCost: 200,
    salePrice: 100,
    profit: 100,
    status: 'Em produção',
    orderProducts: [
      {
        productId: 1,
        name: 'Bolo de Cenoura',
        preparation: 'Misture a cenoura, ovo e farinha e leve ao forno.',
        salePrice: 45.5,
        profitPercent: 25,
        productIngredients: [
          {
            id: 1,
            ingredientId: 1,
            ingredientName: 'Leite condesado',
            quantity: 3,
            unit: 'kilo',
            unitPriceSnapshot: 5,
            itemCost: 15,
          },
        ],
        productRecipes: [
          {
            id: 1,
            recipeId: 1,
            recipeName: 'Brigadeiro Simples',
            quantity: 2,
            unitPriceSnapshot: 10.5,
            costSnapshot: 5.25,
            totalCost: 10.5,
            totalProfit: 10.5,
          },
        ],
        productServices: [
          {
            id: 1,
            name: 'Uber',
            description: 'Entrega',
            providerName: 'Marcelo',
            unit: 'Dinheiro',
            unitPrice: 10,
          },
        ],
      },
    ],
    orderRecipes: [
      {
        id: 1,
        recipeId: 1,
        recipeName: 'Brigadeiro Simples',
        quantity: 5,
        unitPriceSnapshot: 10.5,
        costSnapshot: 5.25,
        totalCost: 26.25,
        totalProfit: 26.25,
      },
    ],
  },
];

const mockRecipes = [
  {
    id: 1,
    recipeId: 1,
    name: 'Brigadeiro Simples',
    yieldQuantity: 20,
    yieldUnit: 'unidades',
    preparation:
      'Coloque o leite condesado, a manteiga, e o chocolate. Misture até ferver',
    additionalCostPercent: 5,
    recipeIngredients: [
      {
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite Condensado',
        quantity: 1,
        unit: 'lata',
        unitPriceSnapshot: 5,
      },
    ],
    productServices: [
      {
        id: 1,
        name: 'Uber',
        description: 'Entrega',
        providerName: 'Marcelo',
        unit: 'Dinheiro',
        unitPrice: 10,
      },
    ],
  },

  {
    id: 2,
    recipeId: 2,
    name: 'Brigadeiro Gourmet',
    yieldQuantity: 15,
    yieldUnit: 'unidades',
    preparation: 'Utilize chocolate nobre e siga o processo de temperagem.',
    additionalCostPercent: 10,
    recipeIngredients: [
      {
        id: 2,
        ingredientId: 2,
        ingredientName: 'Chocolate Nobre',
        quantity: 2,
        unit: 'g',
        unitPriceSnapshot: 15,
      },
    ],
  },
] as any;

const mockProducts = [
  {
    productId: 1,
    name: 'Bolo de Cenoura',
    preparation: 'Misture a cenoura, ovo e farinha e leve ao forno.',
    salePrice: 45.5,
    profitPercent: 25,
    productIngredients: [
      {
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite condesado',
        quantity: 3,
        unit: 'kilo',
        unitPriceSnapshot: 5,
      },
    ],
    productRecipes: [
      {
        id: 1,
        recipeId: 1,
        name: 'Brigadeiro Simples',
        yieldQuantity: 20,
        yieldUnit: 'unidades',
        preparation:
          'Coloque o leite condesado, a manteiga, e o chocolate. Misture até ferver',
        additionalCostPercent: 5,
        recipeIngredients: [
          {
            id: 1,
            ingredientId: 1,
            ingredientName: 'Leite Condensado',
            quantity: 1,
            unit: 'lata',
            unitPriceSnapshot: 5,
          },
        ],
        productServices: [
          {
            id: 1,
            name: 'Uber',
            description: 'Entrega',
            providerName: 'Marcelo',
            unit: 'Dinheiro',
            unitPrice: 10,
          },
        ],
      },
    ],
    productServices: [
      {
        id: 1,
        name: 'Uber',
        description: 'Entrega',
        providerName: 'Marcelo',
        unit: 'Dinheiro',
        unitPrice: 10,
      },
    ],
  },
  {
    productId: 2,
    name: 'Bolo de Cenoura',
    preparation: 'Misture a cenoura, ovo e farinha e leve ao forno.',
    salePrice: 45.5,
    profitPercent: 25,
    productIngredients: [
      {
        id: 1,
        ingredientId: 1,
        ingredientName: 'Leite condesado',
        quantity: 3,
        unit: 'kilo',
        unitPriceSnapshot: 5,
      },
    ],
    productRecipes: [
      {
        id: 1,
        recipeId: 1,
        name: 'Brigadeiro Simples',
        yieldQuantity: 20,
        yieldUnit: 'unidades',
        preparation:
          'Coloque o leite condesado, a manteiga, e o chocolate. Misture até ferver',
        additionalCostPercent: 5,
        recipeIngredients: [
          {
            id: 1,
            ingredientId: 1,
            ingredientName: 'Leite Condensado',
            quantity: 1,
            unit: 'lata',
            unitPriceSnapshot: 5,
          },
        ],
      },
    ],
    productServices: [
      {
        id: 1,
        name: 'Uber',
        description: 'Entrega',
        providerName: 'Marcelo',
        unit: 'Dinheiro',
        unitPrice: 10,
      },
    ],
  },
];

const HomePage = () => {
  const router = useRouter();
  const handleNavigateToDetailsRecipe = (recipe: RecipeData) => {
    const recipeDataString = JSON.stringify(recipe);

    router.push({
      pathname: '/DetailsRecipe',
      params: {
        recipeData: recipeDataString,
      },
    } as any);
  };

  const handleNavigateToDetailsProduct = (product: ProductData) => {
    const recipeDataString = JSON.stringify(product);
    router.push({
      pathname: '/DetailsProduct',
      params: {
        recipeData: recipeDataString,
      },
    } as any);
  };

  const handleNavigateToDetailsOrder = (order: OrderData) => {
    const orderDataString = JSON.stringify(order);
    router.push({
      pathname: '/DetailsOrder',
      params: {
        orderData: orderDataString,
      },
    } as any);
  };

  return (
    <ScrollView>
      <ContainerListOFCards>
        <View>
          <ViewButtonTitle>
            <Title>Receitas</Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreRecipes')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListRecipes
              onCardPress={handleNavigateToDetailsRecipe}
              dataRecipe={mockRecipes}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            />
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title>Produtos</Title>
            <TouchableOpacity
              onPress={() => router.push('/(tabs)/seeMoreProducts')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListProducts
              onCardPress={handleNavigateToDetailsProduct}
              dataProduct={mockProducts}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListProducts>
          </ScrollView>
        </View>

        <View>
          <ViewButtonTitle>
            <Title> Encomendas</Title>
            <TouchableOpacity
              onPress={() => router.push('/seeMoreOrders')}
              style={{ margin: 10 }}
            >
              {' '}
              Ver mais{' '}
            </TouchableOpacity>
          </ViewButtonTitle>

          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <ListOrders
              onCardPress={handleNavigateToDetailsOrder}
              data={mockOrders}
              style={{
                flexDirection: 'row',
                margin: 10,
              }}
              cardItemStyle={{}}
            ></ListOrders>
          </ScrollView>
        </View>
      </ContainerListOFCards>
    </ScrollView>
  );
};

export default HomePage;
