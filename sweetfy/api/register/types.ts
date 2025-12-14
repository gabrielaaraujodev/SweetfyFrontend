import { UnitTypeEnum } from "../../pagesContent/registerItems/types"

export interface IIngredientsRequest{
  name: string,
  description: string,
  brand: string,
  quantity: number,
  unit: UnitTypeEnum,
  unitPrice: number
}

export interface IServiceRequest{
  name: string,
  description: string,
  providerName: string,
  unit: UnitTypeEnum.Unidade | UnitTypeEnum.Hora,
  unitPrice: number
}

export interface IRecipeRequest{
  name: string,
  yieldQuantity: number,
  yieldUnit: UnitTypeEnum,
  preparation: string,
  additionalCostPercent: number,
  recipeIngredients:includedIngredients[],
  recipeServices?:includedServices[],
}

export interface IProductRequest{
  name: string,
  preparation: string,
  salePrice: number,
  profitPercent: number,
  productIngredients:includedIngredients[],
  productServices?:includedServices[],
  productRecipes?:includedRecipes[],
}

export interface IOrderRequest{
  name: string,
  description: string,
  status: string,
  orderProducts:includedProducts[],
  orderRecipes:includedRecipes[],
}

export interface IIngredient{
    id: number,
    name: string,
    description: string,
    brand: string,
    quantity: number,
    unit: UnitTypeEnum,
    unitPrice: 0,
    createdAt: Date,
    updatedAt: Date
}

export interface IService{
    id: number,
    name: string,
    description: string,
    providerName: string,
    unit: UnitTypeEnum,
    unitPrice: 0,
    createdAt: Date,
    updatedAt: Date
}

export interface IRecipe{
    id: number,
    name: string,
    preparation: string,
    additionalCostPercent:number,
    yieldQuantity: number,
    yieldUnit: UnitTypeEnum,
    baseCost: number,
    createdAt: Date,
    updatedAt: Date,
    recipeIngredients: includedIngredientDetails[],
    recipeServices: includedServiceDetails[]
}

export interface IProduct{
    id: number,
    name: string,
    preparation: string,
    baseCost: number,
    salePrice:number,
    profitPercent: number,
    profitAmount:number,
    createdAt: Date,
    updatedAt: Date,
    productIngredients:includedIngredientDetails[],
    productRecipes:includedRecipeDetails[],
    productServices:includedServiceDetails[]
}
export interface IOrder{
  id: number,
  name: string,
  description: string,
  salePrice:number,
  totalYield:number,
  totalCost:number,
  profit: number,
  status: string,
  createdAt: Date,
  orderProducts: includedProductDetails[]
}

export interface IRecipeDetails{
    id: number,
    name: string,
    additionalCostPercent:number,
    yieldQuantity: number,
    yieldUnit: UnitTypeEnum,
    preparation?: string,
    baseCost: number,
    createdAt: Date,
    updatedAt: Date,
    recipeIngredients: includedIngredientDetails[],
    recipeServices: includedServiceDetails[]
}

export interface IBulkUpdatePrices{
  id: number,
  newPrice: number
}

export interface includedIngredients{
  ingredientId: number,
  quantity: number,
  unit: UnitTypeEnum
}

interface includedIngredientDetails{
  id: number,
  ingredientId: number,
  ingredientName: string,
  quantity: number,
  unit: UnitTypeEnum,
  unitPriceSnapshot: number
}

interface includedServices{
  serviceId: number,
  quantity: number,
}
interface includedRecipes{
  recipeId: number,
  quantity: number,
}

interface includedProducts{
  productId: number,
  quantity: number,
}

interface includedRecipeDetails{
  id: number,
  recipeId: number,
  recipeName: string,
  quantity: number,
  unitPriceSnapshot: number
}
interface includedServiceDetails{
  id: number,
  serviceId: number,
  serviceName: string,
  quantity: number,
  unitPriceSnapshot: number,
  unit: UnitTypeEnum;
}

interface includedProductDetails{
   id: number,
  productId: number,
  productName: string,
  quantity: number,
  unitPriceSnapshot: number,
  costSnapshot: number
}