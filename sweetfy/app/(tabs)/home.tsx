import {
  TouchableOpacity,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';

import React, { useEffect, useState } from 'react';

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
import { getAbbreviationUnitType } from '@/pagesContent/registerItems/utils';
import ServiceCard from '@/components/CardsV2/ServiceCard';
import IngredientCard from '@/components/CardsV2/IngredientCard';
import { router } from 'expo-router';

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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);
  const { bottom: bottomInset } = useSafeAreaInsets();

  return (
    <ScrollView style={{ width: '100%', paddingBottom: bottomInset + 70 }}>
      <DinamicHeader></DinamicHeader>
      {!loading ? (
        <View style={{ padding: 20 }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
            onPress={() => router.push('/seeMoreProducts')}
          >
            <H4 colorKey="darkBrown">Encomendas</H4>

            <H6
              colorKey="darkBrown"
              style={{
                textAlignVertical: 'bottom',
                alignSelf: 'flex-end',
              }}
            >
              Ver mais{' '}
              <Icon
                size={14}
                source="chevron-right"
                color={theme.colors.darkBrown}
              ></Icon>
            </H6>
          </TouchableOpacity>
          <ScrollView
            horizontal
            style={{ width: '100%' }}
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {savedOrders &&
              savedOrders.length > 0 &&
              savedOrders.map((orderData, index) => {
                return (
                  <OrderCard
                    selectCardFunction={() =>
                      router.push({
                        pathname: '/detailsOrder',
                        params: {
                          recipeId: JSON.stringify(orderData.id),
                        },
                      })
                    }
                    orderData={orderData}
                    key={index}
                  ></OrderCard>
                );
              })}
          </ScrollView>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <H4 colorKey="darkBrown">Produtos</H4>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}
              onPress={() => router.push('/seeMoreProducts')}
            >
              <H6 colorKey="darkBrown">Ver mais</H6>
              <Icon
                size={20}
                source="chevron-right"
                color={theme.colors.darkBrown}
              ></Icon>
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ width: '100%' }}
            horizontal
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {savedProducts &&
              savedProducts.length > 0 &&
              savedProducts.map((productData, index) => (
                <ProductCard
                  selectCardFunction={() =>
                    router.push({
                      pathname: '/detailsProduct',
                      params: {
                        recipeId: JSON.stringify(productData.id),
                      },
                    })
                  }
                  productData={productData}
                  key={index}
                ></ProductCard>
              ))}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <H4 colorKey="darkBrown">Receitas</H4>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}
              onPress={() => router.push('/seeMoreRecipes')}
            >
              <H6 colorKey="darkBrown">Ver mais</H6>
              <Icon
                size={20}
                source="chevron-right"
                color={theme.colors.darkBrown}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            style={{ width: '100%' }}
            horizontal
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {savedRecipes &&
              savedRecipes.length > 0 &&
              savedRecipes.map((recipeData, index) => {
                return (
                  <RecipeCard
                    selectCardFunction={() =>
                      router.push({
                        pathname: '/detailsRecipe',
                        params: {
                          recipeId: JSON.stringify(recipeData.id),
                        },
                      })
                    }
                    recipeData={recipeData}
                    key={index}
                  ></RecipeCard>
                );
              })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <H4 colorKey="darkBrown">Ingredientes</H4>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}
            >
              <H6 colorKey="darkBrown">Ver mais</H6>
              <Icon
                size={20}
                source="chevron-right"
                color={theme.colors.darkBrown}
              ></Icon>
            </View>
          </View>
          <ScrollView
            style={{ width: '100%' }}
            horizontal
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {savedIngredients &&
              savedIngredients.length > 0 &&
              savedIngredients.map((ingredientData, index) => {
                return (
                  <IngredientCard
                    ingredientData={ingredientData}
                    key={index}
                  ></IngredientCard>
                );
              })}
          </ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <H4 colorKey="darkBrown">Serviços</H4>
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'flex-end',
              }}
            >
              <H6 colorKey="darkBrown">Ver mais</H6>
              <Icon
                size={20}
                source="chevron-right"
                color={theme.colors.darkBrown}
              ></Icon>
            </View>
          </View>
          <ScrollView
            style={{ width: '100%' }}
            horizontal
            contentContainerStyle={{ paddingVertical: 10 }}
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
          >
            {savedServices &&
              savedServices.length > 0 &&
              savedServices.map((serviceData, index) => {
                return (
                  <ServiceCard
                    serviceData={serviceData}
                    key={index}
                  />
                );
              })}
          </ScrollView>
        </View>
      ) : (
        <ActivityIndicator
          size="large"
          color={theme.colors.pinkRed}
          style={{ height: '100%' }}
        >
          <H4>Estamos carregando suas informações</H4>
        </ActivityIndicator>
      )}

      <MenuComponent></MenuComponent>
    </ScrollView>
  );
};

export default HomePage;
