import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CardOrder, { OrderData } from '@/components/Cards/OrderCard';
import { theme } from '@/theme/theme';
import DinamicButton from '@/components/Buttons';
import ListOrders from '@/components/ListOfCards/ListOrders';
import { ContainerHomePage, ViewTitle } from './style';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import { H4, H6_medium } from '@/theme/fontsTheme';
import { IconButton } from 'react-native-paper';
import { IOrder } from '@/api/register/types';
import { epDeleteManyOrders, epDeleteOrder, epGetOrders } from '@/api/register/registerItem';
import ProductCard from '@/components/CardsV2/ProductCard';


const SeeMoreOrders = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const [Orders, setOrders] = useState<IOrder[]>([]);

  const getProducts = async () => {
      try {
        const response = await epGetOrders();
        setOrders(response);
      } catch (e) {
        console.error(e);
      }
    };
  
    useEffect(() => {
      getProducts();
    }, []);


  const handleNavigateToDetailsOrder = (order: IOrder) => {
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
    const allIds = Orders.map((o) => o.id);
    const currentlyAllSelected = selectedItemIds.length === Orders.length;

    if (currentlyAllSelected) {
      setSelectedItemIds([]);
    } else {
      setSelectedItemIds(allIds);
    }

    if (!isSelectionModeActive) {
      setIsSelectionModeActive(true);
    }
  };

   const handleDelete = async () => {
      try {
        if (selectedItemIds.length > 1) {
          await epDeleteManyOrders(selectedItemIds);
        } else {
          await epDeleteOrder(selectedItemIds[0]);
        }
      } catch (e) {
        console.error(e);
      } finally {
        getProducts();
      }
    };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
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

          <H4 colorKey="darkBrown">Encomendas</H4>

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

            {selectedItemIds.length !== Orders.length && (
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

          {/* <ListOrders
            onCardPress={handleNavigateToDetailsOrder}
            data={Orders}
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
          /> */}

          
        </View>
        <View style={{ padding: 10 }}>
          {Orders.map((Order, index) => (
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
              <CardOrder
                data={Order}
                key={index} 
                id={Order.id} 
                showCheckBox={false} 
                checkBoxSelected={false}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeMoreOrders;
