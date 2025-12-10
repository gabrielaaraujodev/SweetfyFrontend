import React, { useEffect, useMemo, useState } from 'react';
import InputItens from '../../../components/Inputs';
import { secondaryTheme, theme } from '../../../theme/theme';
import {
  epGetOrders,
  epGetProducts,
  epPostOrder,
} from '../../../api/register/registerItem';
import { UnitTypeEnum, pageType } from '../types';
import { router, useLocalSearchParams } from 'expo-router';
import DinamicButton from '../../../components/Buttons';
import { DinamicSnackbarType } from '../../../components/DinamicSnackbar';
import ItensRegisterTemplate from '../../../components/Templates/itensRegister';
import CustomDropdownInput from '@/components/Dropdown/CustomDropdown';

import { Categoty, includedItemFields } from '../products';
import { IOrder, IProduct } from '@/api/register/types';
import {
  ICustomDropdownItem,
  IDropdownItem,
} from '@/components/Dropdown/types';
import SelectedItemList from '@/components/SelectedItemsList';
import { H5, H6_medium } from '@/theme/fontsTheme';
import { ActivityIndicator } from 'react-native';
interface PageProps {
  type: pageType;
}

const RegisterOrdersComponent = ({ type }: PageProps) => {
  const { pageMode, id } = useLocalSearchParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedBaseCost, setEstimatedBaseCost] = useState<number>();
  const [includedProductsItemsDraft, setIncludedProductsItemsDraft] = useState<
    includedItemFields[]
  >([]);

  const [productsOptions, setProductsOptions] = useState<IProduct[]>([]);
  const [ordersForTemplateOptions, setOrdersForTemplateOptions] = useState<
    IOrder[]
  >([]);

  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  const handlePostOrder = async () => {
    try {
      setLoading(true);
      await epPostOrder({
        name,
        description,
        orderProducts: includedProductsItemsDraft.map((productItem) => ({
          productId: productItem.id,
          quantity: productItem.quantity,
        })),
        orderRecipes: [],
        status: 'Draft',
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

  const getProductsAPI = async () => {
    try {
      setLoading(true);
      const response = await epGetProducts();
      setProductsOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const getOrdersAPI = async () => {
    try {
      setLoading(true);
      const response = await epGetOrders();
      setOrdersForTemplateOptions(response);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const productsOptionsLabel: ICustomDropdownItem[] = useMemo(() => {
    return productsOptions
      .filter(
        (productOption) =>
          productOption.name && productOption.name.trim() !== ''
      )
      .map((productObject) => ({
        label: productObject.name,
        value: productObject.id,
        itemInitialQuantity: 1,
        quantityUnit: UnitTypeEnum.Unidade,
        unitPrice: productObject.baseCost,
        category: 'product',
      }));
  }, [productsOptions]);

  const templateOptions: IDropdownItem[] = useMemo(() => {
    return ordersForTemplateOptions
      .filter(
        (orderForTemplate) =>
          orderForTemplate.name && orderForTemplate.name.trim() !== ''
      )
      .map((orderObject) => ({
        label: orderObject.name,
        value: orderObject.id,
      }));
  }, [ordersForTemplateOptions]);

  const hasEmpty = !name || includedProductsItemsDraft.length === 0;

  const clearFields = () => {
    setName('');
    setDescription('');
    setIncludedProductsItemsDraft([]);
  };

  useEffect(() => {
    getProductsAPI();
    getOrdersAPI();
  }, [id]);

  useEffect(() => {
    setEstimatedBaseCost(
      includedProductsItemsDraft.reduce(
        (somaAtual, itemSomado: includedItemFields) =>
          somaAtual + itemSomado.unitPrice * itemSomado.quantityMultiplier,
        0
      )
    );
  }, [includedProductsItemsDraft]);

  useEffect(() => {
    const orderToEdit =
      pageMode === 'edit'
        ? ordersForTemplateOptions.find((o) => o.id === Number(id))
        : null;

    const optionsLoaded = productsOptions.length > 0;

    if (pageMode === 'edit' && orderToEdit && optionsLoaded) {
      setName(orderToEdit.name);
      setDescription(orderToEdit.description || '');

      const mappedProducts = (orderToEdit.orderProducts || [])
        .map((op) => {
          const originalProduct = productsOptions.find(
            (p) => p.id === op.productId
          );

          if (!originalProduct) return null;

          return {
            id: originalProduct.id,
            category: 'product',
            quantity: op.quantity,
            quantityMultiplier: 1,
            unitPrice: originalProduct.baseCost,
            unitType: UnitTypeEnum.Unidade,
          };
        })
        .filter((item) => item !== null) as includedItemFields[];

      setIncludedProductsItemsDraft(mappedProducts);
    } else if (pageMode !== 'edit') {
      clearFields();
    }
  }, [pageMode, id, ordersForTemplateOptions, productsOptions]);

  const handleDropdownChange = (
    newItemsFromDropdown: includedItemFields[],
    categoryToUpdate: Categoty
  ) => {
    setIncludedProductsItemsDraft((prevState) => {
      const itemsFromOtherCategories = prevState.filter(
        (item) => item.category !== categoryToUpdate
      );
      return [...itemsFromOtherCategories, ...newItemsFromDropdown];
    });
  };

  return (
    <ItensRegisterTemplate
      registerItemName="Nova encomenda"
      showSnackbar={showResponseStatus}
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
      templateOptions={templateOptions}
    >
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <>
          <InputItens
            title="Nome da encomenda"
            placeholder="ex.: 300 doces (Ninho e Tradicional)"
            inputMode="text"
            keyboardType="default"
            onChangeText={setName}
            value={name}
            theme={secondaryTheme}
            requiredField
            outlinedInput
          />
          <InputItens
            title="Descrição"
            placeholder="ex.: Encomenda padrão"
            inputMode="text"
            onChangeText={setDescription}
            value={description}
            keyboardType="default"
            theme={secondaryTheme}
            outlinedInput
          />

          <CustomDropdownInput
            options={productsOptionsLabel}
            currentSelectedItems={includedProductsItemsDraft}
            setSelectedOptions={(items) => {
              handleDropdownChange(items, 'product');
            }}
            placeholder="Selecione os produtos"
            title="Produtos agrupados"
            requiredField
            searchPlaceholder="Busque aqui"
            searchable
          />
          {includedProductsItemsDraft.length > 0 && (
            <SelectedItemList
              selectedItemsList={includedProductsItemsDraft}
              selectedItemsOptions={productsOptionsLabel}
              setUpdatedSelectedItemsList={(items) => {
                handleDropdownChange(items, 'product');
              }}
            />
          )}

          {estimatedBaseCost > 0 && (
            <H5 style={{ marginVertical: 8 }}>
              Custo estimado:{' '}
              <H6_medium
                style={{
                  backgroundColor: theme.colors.rippleColor,
                  padding: 6,
                  borderRadius: 4,
                }}
              >
                R${estimatedBaseCost.toFixed(2)}
              </H6_medium>
            </H5>
          )}

          <DinamicButton
            buttonText="Criar encomenda"
            onPress={handlePostOrder}
            type="yellow"
            disabled={loading || hasEmpty}
          />
        </>
      )}
    </ItensRegisterTemplate>
  );
};

export default RegisterOrdersComponent;
