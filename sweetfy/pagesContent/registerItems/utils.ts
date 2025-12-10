import { ICustomDropdownItem } from "@/components/Dropdown/types";
import { includedItemFields } from "./products";

export const getAbbreviationUnitType = (unitType: string)=>{
    switch(unitType){
        case 'Grama':
            return 'g';
        case 'Quilograma':
            return 'kg';
        case 'Mililitro':
            return 'ml';
        case 'Litro':
            return 'l';
        case 'Unidade':
            return 'unid.(s)';
        case 'ColherDeSopa':
            return 'c. de sopa';
        case 'ColherDeCha':
            return 'c. de chá';
        case 'Xicara': 
            return 'xícara(s)';
        case 'Hora':
            return 'hora(s)';
        default:
            return '';
    }
}

export const calculateProductTotals = (
  includedItems: includedItemFields[],
  profitPercent: number,
  allIngredients: ICustomDropdownItem[],
  allRecipes: ICustomDropdownItem[],
  allServices: ICustomDropdownItem[]
) => {
 const totalBaseCost = includedItems.reduce((acc, item) => {
    
    let sourceList: ICustomDropdownItem[] = [];
    
    switch (item.category) {
      case 'ingredient':
        sourceList = allIngredients;
        break;
      case 'recipe':
        sourceList = allRecipes;
        break;
      case 'service':
        sourceList = allServices;
        break;
      default:
        return acc; 
    }

    const originalItem = sourceList.find((complete) => complete.value === item.id);
    
    if (originalItem) {
      const price = originalItem.unitPrice || 0;
      const baseQuantity = originalItem.itemInitialQuantity || 1; 
      const usedQuantity = item.quantity;

      if (item.category === 'service') {
        return acc + (price * usedQuantity);
      } else {
        const costPerUnit = price / baseQuantity;
        return acc + (costPerUnit * usedQuantity);
      }
    }
    return acc;
  }, 0); 
  
  const profitAmount = totalBaseCost * (profitPercent / 100);
  const salePrice = totalBaseCost + profitAmount;

  return {
    totalBaseCost,
    profitAmount,
    salePrice
  };
};

export const calculateSalePrice = (cost: number, profitPercent: number): number => {
  if (cost <= 0) return 0;
  return cost + (cost * (profitPercent / 100));
};

export const calculateMargin = (cost: number, salePrice: number): number => {
  if (cost <= 0) return 0; 
  return ((salePrice - cost) / cost) * 100;
};

