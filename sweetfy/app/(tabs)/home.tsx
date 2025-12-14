import {
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

import React, { useEffect, useState } from 'react';

import {
  ProductList,
  OrderList,
  RecipeList,
  IngredientList,
  ServiceList,
} from '@/components/CardsV2/List';
import MenuComponent from '@/components/Menu';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import {
  IIngredient,
  IOrder,
  IProduct,
  IRecipe,
  IService,
} from '@/api/register/types';
import {
  epGetIngredients,
  epGetOrders,
  epGetProducts,
  epGetRecipes,
  epGetServices,
} from '@/api/register/registerItem';
import { H4, H6, H6_bold } from '@/theme/fontsTheme';
import RecipeCard from '@/components/CardsV2/RecipeCard';

import ProductCard from '@/components/CardsV2/ProductCard';
import OrderCard from '@/components/CardsV2/OrderCard';
import { theme } from '@/theme/theme';
import { Icon } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ServiceCard from '@/components/CardsV2/ServiceCard';
import IngredientCard from '@/components/CardsV2/IngredientCard';
import { router } from 'expo-router';
import { ItemsContainer } from '@/pagesContent/home/style';

const HomePage = () => {
  const [loading, setLoading] = useState(false);
  const [savedServices, setSavedServices] = useState<IService[]>([]);
  const [savedIngredients, setSavedIngredients] = useState<IIngredient[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<IRecipe[]>([]);
  const [savedProducts, setSavedProducts] = useState<IProduct[]>([]);
  const [savedOrders, setSavedOrders] = useState<IOrder[]>([]);

  const fetchAllData = async () => {
    try {
      setLoading(true);
      const [serviceRes, ingredientRes, recipesRes, productsRes, ordersRes] =
        await Promise.all([
          epGetServices(),
          epGetIngredients(),
          epGetRecipes(),
          epGetProducts(),
          epGetOrders(),
        ]);

      setSavedServices(serviceRes);
      setSavedIngredients(ingredientRes);
      setSavedRecipes(recipesRes);
      setSavedProducts(productsRes);
      setSavedOrders(ordersRes);
    } catch (e) {
      console.error(e);
      console.error('Erro na Home:', e.response?.status);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log('useEffect home');
    fetchAllData();
  }, []);
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <View style={{ flex: 1, paddingBottom: bottomInset + 70 }}>
      <DinamicHeader />
      {!loading ? (
        <View style={{ flex: 1 }}>
          <ScrollView
            contentContainerStyle={{ padding: 20 }}
            showsVerticalScrollIndicator={false}
          >
            <ItemsContainer onPress={() => router.push('/seeMoreOrders')}>
              <H4 colorKey="darkBrown">Encomendas</H4>
              <H6
                colorKey="darkBrown"
                style={{
                  textAlignVertical: 'bottom',
                  alignSelf: 'flex-end',
                }}
              >
                Ver mais
                <Icon
                  size={14}
                  source="chevron-right"
                  color={theme.colors.darkBrown}
                />
              </H6>
            </ItemsContainer>
            <ScrollView
              horizontal
              style={{ width: '100%' }}
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedOrders && OrderList(savedOrders)}
            </ScrollView>

            <ItemsContainer onPress={() => router.push('/seeMoreProducts')}>
              <H4 colorKey="darkBrown">Produtos</H4>
              <H6
                colorKey="darkBrown"
                style={{
                  textAlignVertical: 'bottom',
                  alignSelf: 'flex-end',
                }}
              >
                Ver mais
                <Icon
                  size={14}
                  source="chevron-right"
                  color={theme.colors.darkBrown}
                />
              </H6>
            </ItemsContainer>
            <ScrollView
              style={{ width: '100%' }}
              horizontal
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedProducts && ProductList(savedProducts)}
            </ScrollView>
            <ItemsContainer onPress={() => router.push('/seeMoreRecipes')}>
              <H4 colorKey="darkBrown">Receitas</H4>
              <H6
                colorKey="darkBrown"
                style={{
                  textAlignVertical: 'bottom',
                  alignSelf: 'flex-end',
                }}
              >
                Ver mais
                <Icon
                  size={14}
                  source="chevron-right"
                  color={theme.colors.darkBrown}
                />
              </H6>
            </ItemsContainer>
            <ScrollView
              style={{ width: '100%' }}
              horizontal
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedRecipes && RecipeList(savedRecipes)}
            </ScrollView>
            <ItemsContainer onPress={() => router.push('/seeMoreIngredients')}>
              <H4 colorKey="darkBrown">Ingredientes</H4>
              <H6
                colorKey="darkBrown"
                style={{
                  textAlignVertical: 'bottom',
                  alignSelf: 'flex-end',
                }}
              >
                Ver mais
                <Icon
                  size={14}
                  source="chevron-right"
                  color={theme.colors.darkBrown}
                />
              </H6>
            </ItemsContainer>
            <ScrollView
              style={{ width: '100%' }}
              horizontal
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedIngredients && IngredientList(savedIngredients)}
            </ScrollView>

            <ItemsContainer>
              <H4 colorKey="darkBrown">Serviços</H4>
              <H6
                colorKey="darkBrown"
                style={{
                  textAlignVertical: 'bottom',
                  alignSelf: 'flex-end',
                }}
              >
                Ver mais
                <Icon
                  size={14}
                  source="chevron-right"
                  color={theme.colors.darkBrown}
                />
              </H6>
            </ItemsContainer>
            <ScrollView
              style={{ width: '100%' }}
              horizontal
              contentContainerStyle={{ paddingVertical: 10 }}
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              {savedServices && ServiceList(savedServices)}
            </ScrollView>
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={theme.colors.pinkRed}
        />
      )}
      <MenuComponent />
    </View>
  );
};

export default HomePage;
