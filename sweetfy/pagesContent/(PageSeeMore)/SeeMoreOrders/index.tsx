import React, { useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { OrderData } from '@/components/Cards/OrderCard';

import DinamicButton from '@/components/Buttons';
import ListOrders from '@/components/ListOfCards/ListOrders';
import { ContainerHomePage, ViewTitle } from './style';

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

const SeeMoreOrders = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const handleNavigateToDetailsOrder = (order: OrderData) => {
    const orderDataString = JSON.stringify(order);
    router.push({
      pathname: '/DetailsOrder',
      params: {
        orderData: orderDataString,
      },
    } as any);
  };
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
  const handleSelectAllPress = () => {
    const allIds = mockOrders.map((o) => o.id);
    const currentlyAllSelected = selectedItemIds.length === mockOrders.length;

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <ContainerHomePage>
        <Text> Header </Text>

        <View style={{ backgroundColor: '#f1e5ebff' }}>
          <ViewTitle> Encomendas</ViewTitle>

          <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
            <View style={{ flex: 1, flexDirection: 'row', gap: 10 }}>
              <DinamicButton
                type="brownLight"
                onPress={handleSelectPress}
                buttonText="Selecionar"
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />

              <DinamicButton
                type="brownLight"
                onPress={handleSelectAllPress}
                buttonText={
                  selectedItemIds.length === mockOrders.length
                    ? 'Remover'
                    : 'Todos'
                }
                disabled={false}
                buttonStyle={{
                  margin: 10,
                  width: 150,
                  backgroundColor: 'white',
                }}
              />
            </View>

            {isSelectionModeActive ? (
              <View
                style={{
                  flexDirection: 'row',
                  gap: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/edit.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Editar
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    flexDirection: 'row',
                    gap: 15,
                  }}
                >
                  <View
                    style={{
                      backgroundColor: 'white',
                      flexDirection: 'row',
                      gap: 10,
                      borderRadius: 18,
                      width: 100,
                      height: 30,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Image
                      source={require('../../../assets/icons/delete.png')}
                      style={{
                        width: 15,
                        height: 15,
                      }}
                    />
                    Excluir
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>

          <ListOrders
            onCardPress={handleNavigateToDetailsOrder}
            data={mockOrders}
            showSelectionControls={isSelectionModeActive}
            selectedItemIds={selectedItemIds}
            onItemSelect={toggleItemSelection}
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              margin: 10,
            }}
            cardItemStyle={{
              backgroundColor: '#FFFFFF',
            }}
          />
        </View>
      </ContainerHomePage>
    </ScrollView>
  );
};

export default SeeMoreOrders;
