import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { IService } from '@/api/register/types';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import { theme } from '@/theme/theme';
import { H4, H6_medium } from '@/theme/fontsTheme';
import serviceCard from '@/components/CardsV2/ServiceCard';
import { IconButton } from 'react-native-paper';
import {
  epDeleteManyServices,
  epDeleteService,
  epGetServices,
} from '@/api/register/registerItem';
import ServiceCard from '@/components/CardsV2/ServiceCard';

const SeeMoreservices = () => {
  const [isSelectionModeActive, setIsSelectionModeActive] = useState(false);
  const [selectedItemIds, setSelectedItemIds] = useState<number[]>([]);

  const router = useRouter();

  const [services, setservices] = useState<IService[]>([]);

  const getservices = async () => {
    try {
      const response = await epGetServices();
      setservices(response);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getservices();
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
        await epDeleteManyServices(selectedItemIds);
      } else {
        await epDeleteService(selectedItemIds[0]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      getservices();
    }
  };

  const handleSelectAllPress = () => {
    const allIds = services.map((p) => p.id);
    const currentlyAllSelected = selectedItemIds.length === services.length;

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

            {selectedItemIds.length !== services.length && (
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
          {services.map((service, index) => (
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
              <ServiceCard
                selectCardFunction={() => {
                  isSelectionModeActive && toggleItemSelection(service.id);
                }}
                serviceData={service}
                key={index}
                selected={selectedItemIds.includes(service.id)}
              />
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default SeeMoreservices;
