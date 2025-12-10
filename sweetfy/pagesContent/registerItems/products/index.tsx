import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { UnitTypeEnum } from '../types';
import DinamicButton from '@/components/Buttons';
import { DinamicSnackbarType } from '@/components/DinamicSnackbar';
import {
  ICustomDropdownItem,
  IDropdownItem,
} from '@/components/Dropdown/types';
import InputItens from '@/components/Inputs';
import SelectedItemList from '@/components/SelectedItemsList';
import ItensRegisterTemplate from '@/components/Templates/itensRegister';
import CustomDropdownInput from '@/components/Dropdown/CustomDropdown';

import { secondaryTheme } from '../../../theme/theme';
import { useFocusEffect, router, useLocalSearchParams } from 'expo-router';
import {
  epGetIngredients,
  epGetRecipes,
  epGetProducts,
  epPostProducts,
  epGetServices,
} from '../../../api/register/registerItem';
import {
  IIngredient,
  IProduct,
  IRecipe,
  IService,
} from '../../../api/register/types';
import PricingComponent from '@/components/PricingComponent';
import { View } from 'react-native';
import { calculateProductTotals } from '../utils';
import { ActivityIndicator } from 'react-native';

export type Categoty =
  | 'ingredient'
  | 'service'
  | 'recipe'
  | 'product'
  | 'order';

export interface includedItemFields {
  id: number;
  category: Categoty;
  quantity: number;
  quantityMultiplier: number;
  unitPrice: number;
  unitType: UnitTypeEnum;
}

const RegisterProductComponent = () => {
  const { pageMode, id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [profitPercent, setProfitPercent] = useState<number>(0);
  const [preparation, setPreparation] = useState('');
  const [baseCost, setBaseCost] = useState(0);
  const [ingredientsOptions, setIngredientsOptions] = useState<IIngredient[]>(
    []
  );
  const [productsForTemplateOptions, setProductsForTemplateOptions] = useState<
    IProduct[]
  >([]);

  const [servicesOptions, setServicesOptions] = useState<IService[]>([]);
  const [recipesOptions, setRecipesOptions] = useState<IRecipe[]>([]);

  const [includedItemsDraft, setIncludedItemsDraft] = useState<
    includedItemFields[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  const hasEmpty =
    !name ||
    !profitPercent ||
    includedItemsDraft.filter((item) => item.category === 'recipe').length ===
      0;

  const getIngredients = async () => {
    try {
      setLoading(true);
      const response = await epGetIngredients();
      setIngredientsOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getServices = async () => {
    try {
      setLoading(true);
      const response = await epGetServices();
      setServicesOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getRecipes = async () => {
    try {
      setLoading(true);
      const response = await epGetRecipes();
      setRecipesOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getProductsAPI = async () => {
    try {
      setLoading(true);
      const response = await epGetProducts();
      setProductsForTemplateOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const clearFields = () => {
    setName('');
    setPreparation('');
    setProfitPercent(0);
    setIncludedItemsDraft([]);
    setBaseCost(0);
  };

  useEffect(() => {
    getIngredients();
    getRecipes();
    getServices();
    getProductsAPI();
  }, [id]);

  useEffect(() => {
    // 1. Tenta encontrar o produto se estivermos editando
    const productToEdit =
      pageMode === 'edit'
        ? productsForTemplateOptions.find((p) => p.id === Number(id))
        : null;

    const optionsLoaded =
      ingredientsOptions.length > 0 &&
      recipesOptions.length > 0 &&
      servicesOptions.length > 0;

    if (pageMode === 'edit' && productToEdit && optionsLoaded) {
      setName(productToEdit.name);
      setPreparation(productToEdit.preparation);
      setProfitPercent(productToEdit.profitPercent);

      const mappedIngredients = (productToEdit.productIngredients || [])
        .map((pi) => {
          const original = ingredientsOptions.find(
            (opt) => opt.id === pi.ingredientId
          );
          if (!original) return null;
          return {
            id: original.id,
            category: 'ingredient',
            quantity: pi.quantity,
            quantityMultiplier:
              original.unitPrice > 0 ? pi.quantity / original.unitPrice : 0,
            unitPrice: original.unitPrice,
            unitType: pi.unit,
          };
        })
        .filter(Boolean) as includedItemFields[];

      const mappedRecipes = (productToEdit.productRecipes || [])
        .map((pr) => {
          const original = recipesOptions.find((opt) => opt.id === pr.recipeId);
          if (!original) return null;
          return {
            id: original.id,
            category: 'recipe',
            quantity: pr.quantity,
            quantityMultiplier: 1,
            unitPrice: original.baseCost,
            unitType: original.yieldUnit,
          };
        })
        .filter(Boolean) as includedItemFields[];

      const mappedServices = (productToEdit.productServices || [])
        .map((ps) => {
          const original = servicesOptions.find(
            (opt) => opt.id === ps.serviceId
          );
          if (!original) return null;
          return {
            id: original.id,
            category: 'service',
            quantity: ps.quantity,
            quantityMultiplier: 1,
            unitPrice: original.unitPrice,
            unitType: original.unit,
          };
        })
        .filter(Boolean) as includedItemFields[];

      setIncludedItemsDraft([
        ...mappedIngredients,
        ...mappedRecipes,
        ...mappedServices,
      ]);
    } else if (pageMode !== 'edit') {
      clearFields();
    }
  }, [
    pageMode,
    id,
    productsForTemplateOptions,
    ingredientsOptions,
    recipesOptions,
    servicesOptions,
  ]);

  const ingredientsOptionsLabel: ICustomDropdownItem[] = useMemo(() => {
    return ingredientsOptions
      .filter(
        (ingredientOption) =>
          ingredientOption.name && ingredientOption.name.trim() !== ''
      )
      .map((ingredientObject) => ({
        label: ingredientObject.name,
        value: ingredientObject.id,
        itemInitialQuantity: ingredientObject.quantity,
        quantityUnit: ingredientObject.unit,
        unitPrice: ingredientObject.unitPrice,
        category: 'ingredient',
      }));
  }, [ingredientsOptions]);

  const recipesOptionsLabel: ICustomDropdownItem[] = useMemo(() => {
    return recipesOptions
      .filter(
        (recipeOption) => recipeOption.name && recipeOption.name.trim() !== ''
      )
      .map((recipeObject) => ({
        label: recipeObject.name,
        value: recipeObject.id,
        itemInitialQuantity: recipeObject.yieldQuantity,
        quantityUnit: recipeObject.yieldUnit,
        unitPrice: recipeObject.baseCost,
        category: 'recipe',
      }));
  }, [recipesOptions]);

  const servicesOptionsLabel: ICustomDropdownItem[] = useMemo(() => {
    return servicesOptions
      .filter(
        (serviceOption) =>
          serviceOption.name && serviceOption.name.trim() !== ''
      )
      .map((serviceObject) => ({
        label: serviceObject.name,
        value: serviceObject.id,
        itemInitialQuantity: 1,
        quantityUnit: serviceObject.unit,
        unitPrice: serviceObject.unitPrice,
        category: 'service',
      }));
  }, [servicesOptions]);

  const templateOptions: IDropdownItem[] = useMemo(() => {
    return productsForTemplateOptions
      .filter(
        (productForTemplate) =>
          productForTemplate.name && productForTemplate.name.trim() !== ''
      )
      .map((productObject) => ({
        label: productObject.name,
        value: productObject.id,
      }));
  }, [productsForTemplateOptions]);

  const handleDropdownChange = (
    newItemsFromDropdown: includedItemFields[],
    categoryToUpdate: Categoty
  ) => {
    setIncludedItemsDraft((prevState) => {
      const itemsFromOtherCategories = prevState.filter(
        (item) => item.category !== categoryToUpdate
      );
      return [...itemsFromOtherCategories, ...newItemsFromDropdown];
    });
  };

  useEffect(() => {
    setBaseCost(
      includedItemsDraft.reduce(
        (somaAtual, itemSomado: includedItemFields) =>
          somaAtual + itemSomado.unitPrice * itemSomado.quantityMultiplier,
        0
      )
    );
  }, [includedItemsDraft]);

  const pricingData = useMemo(() => {
    return calculateProductTotals(
      includedItemsDraft,
      profitPercent,
      ingredientsOptionsLabel,
      recipesOptionsLabel,
      servicesOptionsLabel
    );
  }, [
    includedItemsDraft,
    profitPercent,
    ingredientsOptionsLabel,
    recipesOptionsLabel,
    servicesOptionsLabel,
  ]);

  const postProductItem = async () => {
    try {
      setLoading(true);
      await epPostProducts({
        name,
        preparation,
        salePrice: pricingData.salePrice,
        profitPercent,
        productIngredients: includedItemsDraft
          .filter(
            (includedIngredient) => includedIngredient.category === 'ingredient'
          )
          .map((ingredient) => ({
            ingredientId: ingredient.id,
            quantity: ingredient.quantity,
            unit: ingredient.unitType,
          })),
        productRecipes: includedItemsDraft
          .filter((includedRecipe) => includedRecipe.category === 'recipe')
          .map((recipe) => ({
            recipeId: recipe.id,
            quantity: recipe.quantity,
          })),
        productServices: includedItemsDraft
          .filter((includedService) => includedService.category === 'service')
          .map((service) => ({
            serviceId: service.id,
            quantity: service.quantity,
          })),
      });
      setResponseStatusMessage('success');
      setShowConfirmModal(true);
    } catch (e) {
      console.error(e);
      setResponseStatusMessage('error');
    } finally {
      setLoading(false);
      setShowResponseStatus(true);
    }
  };

  return (
    <ItensRegisterTemplate
      registerItemName="Novo produto"
      showSnackbar={showResponseStatus}
      templateOptions={templateOptions}
      snackbarType={responseStatusMessage}
      showConfirmModal={showConfirmModal}
      OnDismissSnackbar={() => setShowResponseStatus(false)}
      onConfirmModal={() => {
        clearFields();
        setShowConfirmModal(false);
      }}
      onDismissModal={() => {
        setShowConfirmModal(false);
        router.push('/home');
      }}
    >
      {loading ? ( // [ALTERADO] Adicionei um loading visual para evitar tela branca durante fetch
        <ActivityIndicator size="large" />
      ) : (
        <>
          {' '}
          <InputItens
            title="Nome do produto"
            placeholder="ex.: Cento de brigadeiro, Bolo de chocolate..."
            inputMode="text"
            onChangeText={setName}
            requiredField
            keyboardType="default"
            value={name}
            theme={secondaryTheme}
            outlinedInput
          />
          <InputItens
            title="Modo de preparo"
            placeholder="ex.: Deixar descansar, horas no forno..."
            inputMode="text"
            onChangeText={setPreparation}
            value={preparation}
            theme={secondaryTheme}
            keyboardType="default"
            outlinedInput
            multiline
            style={{ minHeight: 60 }}
          />
          <View
            style={{
              zIndex: 10,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >
            <CustomDropdownInput
              options={ingredientsOptionsLabel}
              currentSelectedItems={includedItemsDraft.filter(
                (item) => item.category === 'ingredient'
              )}
              placeholder="Selecione os ingredientes"
              title="Insumos adicionais utilizados"
              setSelectedOptions={(items) =>
                handleDropdownChange(items, 'ingredient')
              }
              searchPlaceholder="Busque aqui"
              searchable
            />
            {includedItemsDraft.filter((item) => item.category === 'ingredient')
              .length > 0 && (
              <SelectedItemList
                selectedItemsList={includedItemsDraft.filter(
                  (item) => item.category === 'ingredient'
                )}
                setUpdatedSelectedItemsList={(items) =>
                  handleDropdownChange(items, 'ingredient')
                }
                selectedItemsOptions={ingredientsOptionsLabel}
              />
            )}
          </View>
          <View
            style={{
              zIndex: 9,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >
            <CustomDropdownInput
              options={servicesOptionsLabel}
              currentSelectedItems={includedItemsDraft.filter(
                (item) => item.category === 'service'
              )}
              placeholder="Selecione os serviços"
              title="Serviços adicionais utilizados"
              setSelectedOptions={(items) =>
                handleDropdownChange(items, 'service')
              }
              searchPlaceholder="Busque aqui"
              searchable
            />
            {includedItemsDraft.filter((item) => item.category === 'service')
              .length > 0 && (
              <SelectedItemList
                selectedItemsList={includedItemsDraft.filter(
                  (item) => item.category === 'service'
                )}
                setUpdatedSelectedItemsList={(items) =>
                  handleDropdownChange(items, 'service')
                }
                selectedItemsOptions={servicesOptionsLabel}
              />
            )}
          </View>
          <View
            style={{
              zIndex: 8,
              display: 'flex',
              flexDirection: 'column',
              gap: 15,
            }}
          >
            <CustomDropdownInput
              options={recipesOptionsLabel}
              currentSelectedItems={includedItemsDraft.filter(
                (item) => item.category === 'recipe'
              )}
              placeholder="Selecione as receitas"
              title="Receitas utilizados"
              setSelectedOptions={(items) =>
                handleDropdownChange(items, 'recipe')
              }
              requiredField
              searchPlaceholder="Busque aqui"
              searchable
            />
            {includedItemsDraft.filter((item) => item.category === 'recipe')
              .length > 0 && (
              <SelectedItemList
                selectedItemsList={includedItemsDraft.filter(
                  (item) => item.category === 'recipe'
                )}
                setUpdatedSelectedItemsList={(items) =>
                  handleDropdownChange(items, 'recipe')
                }
                selectedItemsOptions={recipesOptionsLabel}
              />
            )}
          </View>
          <PricingComponent
            includedItemsDraft={includedItemsDraft}
            totalCost={pricingData.totalBaseCost}
            setFinalProfit={setProfitPercent}
          />
          <DinamicButton
            buttonText="Criar produto"
            onPress={postProductItem}
            type="yellow"
            disabled={loading || hasEmpty || pricingData.totalBaseCost <= 0}
          />
        </>
      )}
    </ItensRegisterTemplate>
  );
};

export default RegisterProductComponent;
