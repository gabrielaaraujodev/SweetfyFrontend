import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

interface OrderData {
  id: number;
  name: string;
  description: string;
  totalYield: number;
  totalCost: number;
  salePrice: number;
  profit: number;
  status: string;
  orderProducts: Product[];
  orderRecipes: Recipe[];
}

interface Product {
  productId: number;
  name: string;
  preparation: string;
  salePrice: number;
  profitPercent: number;
  productIngredients: Ingredient[];
  productRecipes: Recipe[];
  productServices: Service[];
}

interface Recipe {
  id: number;
  recipeId: number;
  recipeName: string;
  quantity: number;
  unitPriceSnapshot: number;
  costSnapshot: number;
  totalCost: number;
  totalProfit: number;
}

interface Service {
  id: number;
  name: string;
  description: string;
  providerName: string;
  unit: string;
  unitPrice: number;
}

interface Ingredient {
  id: number;
  ingredientId: number;
  ingredientName: string;
  quantity: number;
  unit: string;
  unitPriceSnapshot: number | string | undefined | null;
  itemCost?: number;
}

interface ItemsInputProps {
  items: Product[];
}

const ItemsInput = ({ items }: ItemsInputProps) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View
          key={index}
          style={styles.viewIngredientes}
        >
          <Text style={styles.name}> {item.name}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  viewIngredientes: {
    width: 90,
    margin: 2,
    backgroundColor: '#F5F0F0',
    borderRadius: 18,
    textAlign: 'center',
  },
  name: {
    color: '#880741',
    fontFamily: 'Montserrat',
    fontSize: 11.5,
    margin: 3,
  },
});

export default ItemsInput;
