import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { IRecipe } from '@/api/register/types';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import { theme } from '@/theme/theme';
import { H4, H6_medium } from '@/theme/fontsTheme';
import RecipeCard from '@/components/CardsV2/RecipeCard';
import { IconButton } from 'react-native-paper';
import {
  epDeleteManyRecipes,
  epDeleteRecipe,
  epGetRecipes,
} from '@/api/register/registerItem';

const SeeMoreRecipes = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  const getRecipes = async () => {
    try {
      const response = await epGetRecipes();
      setRecipes(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getRecipes();
  }, []);

  const toggleItemSelection = (itemId: number) => {
    setSelectedItemIds((prevSelected) => {
      if (prevSelected.includes(itemId)) {
        return prevSelected.filter((id) => id !== itemId);
      } else {
        return [...prevSelected, itemId];
      }
    });
  };
  const handleSelectPress = () => {
    if (isSelectionModeActive) {
      setSelectedItemIds([]);
    }
    setIsSelectionModeActive((prev) => !prev);
  };

  const handleDelete = async () => {
    try {
      if (selectedItemIds.length > 1) {
        await epDeleteManyRecipes(selectedItemIds);
      } else {
        await epDeleteRecipe(selectedItemIds[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      getRecipes();
    }
  };

  const handleSelectAllPress = () => {
    const allIds = recipes.map((p) => p.id);
    const currentlyAllSelected = selectedItemIds.length === recipes.length;

    if (currentlyAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allIds);
    }

    if (!isSelectionModeActive) {
      setIsSelectionModeActive(true);
    }
  };

  return (
    <ScrollView>
      <View style={{}}>
        <DinamicHeader></DinamicHeader>

        <View
          style={{
            backgroundColor: theme.colors.lightBrown,
            flexDirection: 'column',
            gap: 10,
            padding: 10,
          }}
        >
          <H4 colorKey="darkBrown">Receitas</H4>

          <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
            <H6_medium
              onPress={handleSelectPress}
              colorKey="darkBrown"
              style={{ backgroundColor: theme.colors.yellow, padding: 6 }}
            >
              {isSelectionModeActive
                ? `${selectedItemIds.length} selecionado(s)`
                : 'Selecionar'}
            </H6_medium>

            {selectedItemIds.length !== recipes.length && (
              <H6_medium
                onPress={handleSelectAllPress}
                colorKey="darkBrown"
                style={{ backgroundColor: theme.colors.yellow, padding: 6 }}
              >
                Selecionar todos
              </H6_medium>
            )}
            <IconButton
              icon="trash-can-outline"
              size={12}
              style={{ margin: 0 }}
              iconColor={theme.colors.pinkRed}
              disabled={selectedItemIds.length === 0}
              onPress={handleDelete}
            />
          </View>
        </View>
        <View style={{ padding: 10 }}>
          {recipes.map((recipe, index) => (
            <View
              key={index}
              style={{
                backgroundColor: isSelectionModeActive
                  ? theme.colors.backColor
                  : '',
                borderRadius: 8,
                padding: isSelectionModeActive ? 4 : 2,
              }}
            >
              <RecipeCard
                selectCardFunction={() => {
                  isSelectionModeActive
                    ? toggleItemSelection(recipe.id)
                    : router.push({
                        pathname: '/detailsRecipe',
                        params: {
                          recipeId: JSON.stringify(recipe.id),
                        },
                      });
                }}
                recipeData={recipe}
                key={index}
                selected={selectedItemIds.includes(recipe.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeMoreRecipes;
