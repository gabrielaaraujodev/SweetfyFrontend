import React, { useEffect, useMemo, useState } from 'react';
import { secondaryTheme } from '../../../theme/theme';
import { QuantityInputsContainer } from '../styles';
import {
  epGetIngredients,
  epGetRecipes,
  epPostRecipe,
} from '../../../api/register/registerItem';
import {
  ICustomDropdownItem,
  IDropdownItem,
} from '@/components/Dropdown/types';
import SpecificFormatInput from '@/components/Inputs/SpecificFormatInput';
import CustomDropdownInput from '@/components/Dropdown/CustomDropdown';
import { router, useLocalSearchParams } from 'expo-router';
import SelectedItemList from '@/components/SelectedItemsList';
import {
  IIngredient,
  includedIngredients,
  IRecipe,
} from '../../../api/register/types';
import DropdownInput from '@/components/Dropdown';
import { ingredientRegisterUnitOptions, UnitTypeEnum } from '../types';
import DinamicButton from '@/components/Buttons';
import { DinamicSnackbarType } from '@/components/DinamicSnackbar';
import ItensRegisterTemplate from '@/components/Templates/itensRegister';
import InputItens from '@/components/Inputs';
import { Categoty, includedItemFields } from '../products';
import { ActivityIndicator } from 'react-native';

const RegisterRecipesComponent = () => {
  const { pageMode, id } = useLocalSearchParams();

  const [recipesForTemplateOptions, setRecipesForTemplateOptions] = useState<
    IRecipe[]
  >([]);

  const [name, setName] = useState('');
  const [yieldQuantity, setYieldQuantity] = useState('');
  const [preparation, setPreparation] = useState('');
  const [additionalCostPercent, setAdditionalCostPercent] = useState<
    number | null
  >();
  const [yieldUnit, setYieldUnit] = useState<UnitTypeEnum>();
  const [includedIngredientsItemsDraft, setIncludedIngredientsItemsDraft] =
    useState<includedItemFields[]>([]);

  const [ingredientsOptions, setIngredientsOptions] = useState<IIngredient[]>(
    []
  );

  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  useEffect(() => {
    const initialData =
      pageMode === 'edit'
        ? recipesForTemplateOptions.find((recipe) => recipe.id === Number(id))
        : null;

    if (pageMode === 'edit' && initialData && ingredientsOptions.length > 0) {
      setName(initialData.name);
      setYieldQuantity(initialData.yieldQuantity.toString());
      setPreparation(initialData.preparation);
      setAdditionalCostPercent(initialData.additionalCostPercent);
      setYieldUnit(initialData.yieldUnit);

      if (initialData.recipeIngredients) {
        const mappedIngredients = initialData.recipeIngredients
          .map((recipeItem) => {
            const originalIngredient = ingredientsOptions.find(
              (opt) => opt.id === recipeItem.ingredientId
            );

            if (!originalIngredient) return null;

            return {
              id: originalIngredient.id,
              category: 'ingredient',
              label: originalIngredient.name,
              value: originalIngredient.id,
              quantity: recipeItem.quantity,
              quantityMultiplier:
                originalIngredient.unitPrice > 0
                  ? recipeItem.quantity / originalIngredient.unitPrice
                  : 0,
              unitPrice: originalIngredient.unitPrice,
              unitType: recipeItem.unit,
            };
          })
          .filter((item) => item !== null) as includedItemFields[];

        setIncludedIngredientsItemsDraft(mappedIngredients);
      }
    } else if (pageMode !== 'edit') {
      clearFields();
    }
  }, [recipesForTemplateOptions, ingredientsOptions, id, pageMode]);

  const hasEmpty =
    !name ||
    !yieldQuantity ||
    includedIngredientsItemsDraft.length === 0 ||
    !additionalCostPercent;

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
  const getRecipesForTemplate = async () => {
    try {
      setLoading(true);
      const response = await epGetRecipes();
      setRecipesForTemplateOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const postRecipe = async () => {
    const finalIngredientsList: includedIngredients[] = [];
    ingredientsOptions
      .filter((ingredients) =>
        includedIngredientsItemsDraft.some(
          (includedItems) => includedItems.id === ingredients.id
        )
      )
      .map((ingredient) =>
        finalIngredientsList.push({
          ingredientId: ingredient.id,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })
      );
    try {
      setLoading(true);
      await epPostRecipe({
        name,
        preparation,
        additionalCostPercent: additionalCostPercent ?? 0,
        recipeIngredients: finalIngredientsList,
        recipeServices: [],
        yieldQuantity: Number(yieldQuantity),
        yieldUnit: Number(yieldUnit),
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

  const clearFields = () => {
    setName('');
    setAdditionalCostPercent(undefined);
    setPreparation('');
    setYieldQuantity('');
    setYieldUnit(undefined);
    setIncludedIngredientsItemsDraft([]);
  };

  useEffect(() => {
    getIngredients();
    getRecipesForTemplate();
  }, [id]);

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

  const recipesOptionsLabel: IDropdownItem[] = useMemo(() => {
    return recipesForTemplateOptions
      .filter(
        (recipeOption) => recipeOption.name && recipeOption.name.trim() !== ''
      )
      .map((recipeObject) => ({
        label: recipeObject.name,
        value: recipeObject.id,
      }));
  }, [recipesForTemplateOptions]);

  const handleDropdownChange = (
    newItemsFromDropdown: includedItemFields[],
    categoryToUpdate: Categoty
  ) => {
    setIncludedIngredientsItemsDraft((prevState) => {
      const itemsFromOtherCategories = prevState.filter(
        (item) => item.category !== categoryToUpdate
      );

      return [...itemsFromOtherCategories, ...newItemsFromDropdown];
    });
  };

  return (
    <ItensRegisterTemplate
      registerItemName="Nova receita"
      showSnackbar={showResponseStatus}
      templateOptions={recipesOptionsLabel}
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
      {loading ? (
        <ActivityIndicator size="large"></ActivityIndicator>
      ) : (
        <>
          {' '}
          <InputItens
            title="Nome da receita"
            placeholder="ex.: Massa de brigadeiro, Massa de bolo de chocolate..."
            inputMode="text"
            onChangeText={setName}
            requiredField
            keyboardType="default"
            value={name}
            theme={secondaryTheme}
            outlinedInput
          />
          <QuantityInputsContainer>
            <InputItens
              title="Rendimento da receita"
              placeholder="ex.: 30, 1,..."
              inputMode="numeric"
              onChangeText={setYieldQuantity}
              value={yieldQuantity}
              theme={secondaryTheme}
              containerStyle={{ flex: 1 }}
              keyboardType="number-pad"
              requiredField
              outlinedInput
            />
            <DropdownInput
              options={ingredientRegisterUnitOptions}
              placeholder="Selecione"
              requiredField
              title="Medida de rendimento"
              selectedOptions={yieldUnit}
              setSelectedOptions={setYieldUnit}
            />
          </QuantityInputsContainer>
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
          <SpecificFormatInput
            onChangeValue={setAdditionalCostPercent}
            value={Number(additionalCostPercent)}
            placeholder="ex.: 20%, 34.5%..."
            title="Custos incalculáveis"
            type="percentage"
          />
          <CustomDropdownInput
            options={ingredientsOptionsLabel}
            currentSelectedItems={includedIngredientsItemsDraft}
            setSelectedOptions={(items) => {
              handleDropdownChange(items, 'ingredient');
            }}
            placeholder="Selecione os ingredientes"
            title="Insumos utilizados"
            requiredField
            searchPlaceholder="Busque aqui"
            searchable
          />
          {includedIngredientsItemsDraft.length > 0 && (
            <SelectedItemList
              selectedItemsList={includedIngredientsItemsDraft}
              selectedItemsOptions={ingredientsOptionsLabel}
              setUpdatedSelectedItemsList={(items) => {
                handleDropdownChange(items, 'ingredient');
              }}
            />
          )}
          <DinamicButton
            buttonText="Criar receita"
            onPress={postRecipe}
            type="yellow"
            disabled={loading || hasEmpty}
          />
        </>
      )}
    </ItensRegisterTemplate>
  );
};

export default RegisterRecipesComponent;
