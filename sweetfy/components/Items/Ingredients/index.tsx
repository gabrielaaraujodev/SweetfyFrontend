import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const safeParseFloat = (value: any): number => {
  return parseFloat(value as any) || 0;
};

interface Ingredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

interface IngredientsProps {
  data: Ingredient;
  onCostCalculated?: (cost: number, id: number) => void;
}

const Ingredient = ({ data, onCostCalculated }: IngredientsProps) => {
  const totalCost = () => {
    const price = safeParseFloat(data.unitPriceSnapshot);
    const quantity = safeParseFloat(data.quantity);
    return quantity * price;
  };

  const cost = totalCost();

  React.useEffect(() => {
    onCostCalculated?.(cost, data.id);
  }, [cost, data.id, onCostCalculated]);

  return (
    <View style={styles.container}>
      <Text style={styles.name}> {data.ingredientName} </Text>
      <Text style={styles.name}> {data.unitPriceSnapshot} </Text>
      <Text style={styles.name}> {data.quantity}</Text>
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

export default Ingredient;
