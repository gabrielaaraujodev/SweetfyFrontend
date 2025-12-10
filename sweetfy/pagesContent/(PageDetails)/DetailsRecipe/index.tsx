import * as React from 'react';
import { View, ScrollView, ActivityIndicator } from 'react-native';

import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

import { ViewContainer } from './style';
import { IRecipeDetails } from '@/api/register/types';
import {
  epDeleteRecipe,
  epGetRecipeDetails,
} from '@/api/register/registerItem';
import { getAbbreviationUnitType } from '@/pagesContent/registerItems/utils';
import { H4, H5, H6, H6_medium, P } from '@/theme/fontsTheme';
import { theme } from '@/theme/theme';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import { IconsContainer } from '@/pagesContent/registerItems/styles';
import { IconButton } from 'react-native-paper';

const PageDetailsRecipe = () => {
  const { recipeId } = useLocalSearchParams();

  const [recipeDetails, setRecipeDetails] = useState<IRecipeDetails>();

  const [isLoading, setIsLoading] = useState(true);
  const getRecipeDetails = async () => {
    try {
      setIsLoading(true);
      const response = await epGetRecipeDetails(Number(recipeId));
      setRecipeDetails(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await epDeleteRecipe(Number(recipeId));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecipeDetails();
  }, []);

  return (
    <ScrollView>
      <DinamicHeader></DinamicHeader>
      {isLoading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <>
          <ViewContainer style={{}}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <H4 colorKey="darkBrown">{recipeDetails.name} </H4>
              <IconsContainer>
                <IconButton
                  icon={require('../../../assets/icons/edit.png')}
                  size={20}
                  style={{ margin: 2 }}
                  iconColor={theme.colors.darkBrown}
                  onPress={() => {
                    router.push({
                      pathname: '/createRecipePage',
                      params: {
                        pageMode: 'edit',
                        id: recipeDetails.id,
                      },
                    });
                  }}
                />
                <IconButton
                  icon={require('../../../assets/icons/delete.png')}
                  size={20}
                  style={{ margin: 2 }}
                  iconColor={theme.colors.darkBrown}
                  onPress={handleDelete}
                />
              </IconsContainer>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <H5 colorKey="darkBrown">Rendimento total</H5>
              <H6_medium colorKey="darkBrown">
                {recipeDetails.yieldQuantity}
                {getAbbreviationUnitType(recipeDetails.yieldUnit.toString())}
              </H6_medium>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <H5 colorKey="darkBrown">Custo total</H5>
              <H6_medium colorKey="darkBrown">
                R$
                {(recipeDetails.baseCost * recipeDetails.yieldQuantity).toFixed(
                  2
                )}
              </H6_medium>
            </View>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <H5 colorKey="darkBrown">
                Custos incalculáveis<H6 colorKey="darkBrown">(%)</H6>
              </H5>
              <H6_medium colorKey="darkBrown">
                {recipeDetails.additionalCostPercent}%
              </H6_medium>
            </View>
            {recipeDetails.preparation && (
              <View>
                <H5 colorKey="darkBrown">Modo de preparo</H5>
                <P colorKey="darkBrown">{recipeDetails.preparation}</P>
              </View>
            )}
            <View />
            <H4 colorKey="darkBrown">Gastos Totais</H4>
            <View style={{ flexDirection: 'column', gap: 20 }}>
              {recipeDetails.recipeIngredients?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: theme.colors.yellowLight,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    padding: 8,
                    borderRadius: 8,
                  }}
                >
                  <P colorKey="pinkRed">{item.ingredientName}</P>
                  <P colorKey="pinkRed">R${item.unitPriceSnapshot}</P>
                  <P colorKey="pinkRed">
                    {item.quantity}
                    {getAbbreviationUnitType(item.unit.toString())}
                  </P>
                </View>
              ))}
            </View>

            <View>
              {recipeDetails.recipeServices?.map((item, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: theme.colors.yellowLight,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}
                >
                  <P colorKey="pinkRed">{item.serviceName}</P>
                  <P colorKey="pinkRed">R${item.unitPriceSnapshot}</P>
                  <P colorKey="pinkRed">
                    {item.quantity}
                    {getAbbreviationUnitType(item.unit.toString()) === 'hora(s)'
                      ? '/hr.'
                      : '/unid.'}
                  </P>
                </View>
              ))}
            </View>
          </ViewContainer>
        </>
      )}
    </ScrollView>
  );
};

export default PageDetailsRecipe;
