import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const safeParseFloat = (value: any): number => {
  return parseFloat(value as any) || 0;
};

interface ServiceData {
  id: number;
  name?: string;
  unitPrice: number;
  description?: string;
  providerName?: string;
  unit?: string;
  quantity: number;
}

interface ServiceProps {
  data: ServiceData;
  onCostCalculated?: (cost: number, id: number) => void;
  quantity: number;
}

const Service = ({ data, onCostCalculated, quantity }: ServiceProps) => {
  const totalCost = () => {
    const price = safeParseFloat(data.unitPrice);
    return price;
  };

  const cost = totalCost();

  React.useEffect(() => {
    onCostCalculated?.(cost, data.id);
  }, [cost, data.id, onCostCalculated]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}> {data.name} </Text>
      <Text style={styles.name}> {data.unitPrice} </Text>
      <Text style={styles.name}> {quantity}</Text>
      <Text style={styles.name}> {cost} </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    gap: 20,
    borderRadius: 18,
    backgroundColor: 'white',
    padding: 12,
  },
  name: {
    color: '#880741',
    fontFamily: 'Montserrat',
    fontSize: 18,
    margin: 3,
  },
});

export default Service;
