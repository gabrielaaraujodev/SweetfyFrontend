// Interfaces

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

interface Recipe {
  id: number;
  recipeId: number;
  name: string;
  yieldQuantity: number;
  yieldUnit: string;
  preparation: string;
  additionalCostPercent: number;
  recipeIngredients: Ingredient[];
  recipeServices?: Service[];
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

export const calculateBaseItemsCost = (items: any[]): number => {
  return (items || []).reduce((soma, item) => {
    const price =
      parseFloat((item.unitPriceSnapshot as any) || (item.unitPrice as any)) ||
      0;
    const quantity = parseFloat(item.quantity as any) || 0;

    return soma + price * quantity;
  }, 0);
};

//Custo total das receitas

export const calculateRecipeTotalCost = (dataRecipe: Recipe): number => {
  const costAllItensIngredients = calculateBaseItemsCost(
    dataRecipe.recipeIngredients
  );
  const costAllItensServices = calculateBaseItemsCost(
    dataRecipe.recipeServices || []
  );

  const baseCostTotal = costAllItensIngredients + costAllItensServices;

  const additionalFeeRate = dataRecipe.additionalCostPercent / 100;
  const additionalCost = baseCostTotal * additionalFeeRate;

  return baseCostTotal + additionalCost;
};

export const applyRecipeMargin = (
  baseCost: number,
  percent: number
): number => {
  const additionalCost = baseCost * (percent / 100);
  return baseCost + additionalCost;
};

//Custo total dos produtos

export const calculateProductTotalCost = (
  dataProduct: Product,
  calculateRecipeTotalCost: (data: any) => number
): number => {
  const costAllItensIngredients =
    calculateBaseItemsCost(dataProduct.productIngredients) || 0;
  const costAllItensServices =
    calculateBaseItemsCost(dataProduct.productServices) || 0;

  const costAllItensRecipes = (dataProduct.productRecipes || []).reduce(
    (soma, recipeItem) => {
      const totalCost = calculateRecipeTotalCost(recipeItem) || 0;
      return soma + totalCost;
    },
    0
  );

  const baseCostTotal =
    costAllItensIngredients + costAllItensServices + costAllItensRecipes;

  return baseCostTotal || 0;
};