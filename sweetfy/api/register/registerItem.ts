import { IIngredient, IOrder, IPostOrderRequest, IPostProductRequest, IProduct, IRecipe, IRegisterIngredientsRequest, IRegisterRecipeRequest, IRegisterServiceRequest, IService } from './types';
import api from "../pathConfiguration";

// Ingredients
export async function epPostIngredient(request: IRegisterIngredientsRequest) {
  const response = await api.post('/ingredients', request);
  return response.data;
}

export async function epGetIngredients():Promise<IIngredient[]>{
  const response = await api.get('/ingredients')
  return response.data;
}

export async function epDeleteIngredients(id: number){
  const response = await api.delete(`/ingredients/${id}`);
   return response.data;
}

export async function epDeleteManyIngredients(ids: number[]){
   const response = await api.delete('/ingredients/bulk-delete', {data:ids});
  return response.data;
}


// Services
export async function epPostService(request: IRegisterServiceRequest) {
  const response = await api.post('/services', request);
  return response.data;
}

export async function epGetServices():Promise<IService[]>{
  const response = await api.get('/services')
  return response.data;
}

export async function epDeleteService(id: number){
  const response = await api.delete(`/services/${id}`);
   return response.data;
}

export async function epDeleteManyServices(ids: number[]){
   const response = await api.delete('/services/bulk-delete', {data:ids});
  return response.data;
}



//Recipes
export async function epPostRecipe(request: IRegisterRecipeRequest) {
  const response = await api.post('/recipes', request);
  return response.data;
}

export async function epGetRecipes():Promise<IRecipe[]>{
  const response = await api.get('/recipes')
  return response.data;
}

export async function epGetRecipeDetails(id:number) {
  const response = await api.get(`/recipes/${id}`)
  return response.data;
}

export async function epDeleteRecipe(id: number){
  const response = await api.delete(`/recipes/${id}`);
   return response.data;
}

export async function epDeleteManyRecipes(ids: number[]){
   const response = await api.delete('/recipes/bulk-delete', {data:ids});
  return response.data;
}


//Products
export async function epPostProducts(request: IPostProductRequest) {
  const response = await api.post('/products', request);
  return response.data;
}

export async function epGetProducts():Promise<IProduct[]>{
  const response = await api.get('/products')
  return response.data;
}

//Products
export async function epPostOrder(request: IPostOrderRequest) {
  const response = await api.post('/orders', request);
  return response.data;
}

export async function epGetOrders():Promise<IOrder[]>{
  const response = await api.get('/orders')
  return response.data;
}

export async function epDeleteProduct(id: number){
  const response = await api.delete(`/products/${id}`);
   return response.data;
}

export async function epDeleteManyProduct(ids: number[]){
   const response = await api.delete('/products/bulk-delete', {data:ids});
  return response.data;
}
