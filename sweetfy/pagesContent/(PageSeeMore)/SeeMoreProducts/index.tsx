import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { IProduct } from '@/api/register/types';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import { theme } from '@/theme/theme';
import { H4, H6_medium } from '@/theme/fontsTheme';
import ProductCard from '@/components/CardsV2/ProductCard';
import { IconButton } from 'react-native-paper';
import {
  epDeleteManyProduct,
  epDeleteProduct,
  epGetProducts,
} from '@/api/register/registerItem';

const SeeMoreProducts = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const [Products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    try {
      const response = await epGetProducts();
      setProducts(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getProducts();
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
        await epDeleteManyProduct(selectedItemIds);
      } else {
        await epDeleteProduct(selectedItemIds[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      getProducts();
    }
  };

  const handleSelectAllPress = () => {
    const allIds = Products.map((p) => p.id);
    const currentlyAllSelected = selectedItemIds.length === Products.length;

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

            {selectedItemIds.length !== Products.length && (
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
          {Products.map((Product, index) => (
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
              <ProductCard
                selectCardFunction={() => {
                  isSelectionModeActive
                    ? toggleItemSelection(Product.id)
                    : router.push({
                        pathname: '/detailsProduct',
                        params: {
                          ProductId: JSON.stringify(Product.id),
                        },
                      });
                }}
                productData={Product}
                key={index}
                selected={selectedItemIds.includes(Product.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeMoreProducts;
