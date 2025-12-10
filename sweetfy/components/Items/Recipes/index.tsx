import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface Recipe {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  totalCost: number;
  recipeIngredients: any[];
}

interface RecipeProps {
  data: Recipe;
  quantity: number;
}

const Recipe = ({ data, quantity }: RecipeProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}> {data.name} </Text>
      <Text style={styles.name}> {quantity} </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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

export default Recipe;
