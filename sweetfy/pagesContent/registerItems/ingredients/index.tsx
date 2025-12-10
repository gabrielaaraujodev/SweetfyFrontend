import React, { useState } from 'react';
import { secondaryTheme } from '../../../theme/theme';
import { QuantityInputsContainer } from '../styles';
import { epPostIngredient } from '../../../api/register/registerItem';
import {
  UnitTypeEnum,
  ingredientRegisterUnitOptions,
  pageType,
} from '../types';
import { router } from 'expo-router';
import DinamicButton from '@/components/Buttons';
import { DinamicSnackbarType } from '@/components/DinamicSnackbar';
import DropdownInput from '@/components/Dropdown';
import InputItens from '@/components/Inputs';
import SpecificFormatInput from '@/components/Inputs/SpecificFormatInput';
import ItensRegisterTemplate from '@/components/Templates/itensRegister';

interface PageProps {
  type: pageType;
}

const RegisterIngredientsComponent = ({ type }: PageProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [quantity, setQuantity] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<UnitTypeEnum>();
  const [price, setPrice] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  const handleRegisterIngredients = async () => {
    try {
      setLoading(true);
      await epPostIngredient({
        name,
        description,
        brand,
        quantity: Number(quantity),
        unit: quantityUnit ?? 1,
        unitPrice: price ?? 0,
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

  const hasEmpty = !name || !brand || !quantity || !quantityUnit || !price;

  const clearFields = () => {
    setName('');
    setBrand('');
    setDescription('');
    setPrice(undefined);
    setQuantity('');
    setQuantityUnit(undefined);
  };

  return (
    <ItensRegisterTemplate
      type={type}
      registerItemName="Novo ingrediente"
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
    >
      <InputItens
        title="Nome do insumo"
        placeholder="ex.: Leite condensado"
        inputMode="text"
        onChangeText={setName}
        keyboardType="default"
        value={name}
        theme={secondaryTheme}
        requiredField
        outlinedInput
      />
      <InputItens
        title="Descrição"
        placeholder="ex.: Leite condensado para coberturas, para doces,..."
        inputMode="text"
        onChangeText={setDescription}
        keyboardType="default"
        value={description}
        theme={secondaryTheme}
        outlinedInput
      />
      <InputItens
        title="Marca"
        placeholder="ex.: Cemil, Itambé, Piracanjuba,..."
        inputMode="text"
        onChangeText={setBrand}
        keyboardType="default"
        value={brand}
        theme={secondaryTheme}
        requiredField
        outlinedInput
      />
      <QuantityInputsContainer>
        <InputItens
          title="Quantidade"
          placeholder="ex.: 395, 1"
          inputMode="numeric"
          onChangeText={setQuantity}
          keyboardType="number-pad"
          value={quantity}
          theme={secondaryTheme}
          containerStyle={{ flex: 1 }}
          requiredField
          outlinedInput
        />
        <DropdownInput
          options={ingredientRegisterUnitOptions}
          placeholder="Selecione"
          requiredField
          title="Medida"
          selectedOptions={quantityUnit}
          setSelectedOptions={setQuantityUnit}
        />
      </QuantityInputsContainer>
      <SpecificFormatInput
        onChangeValue={setPrice}
        value={Number(price)}
        placeholder="ex.: R$5,90"
        title="Preço"
        type="monetary"
      />
      <DinamicButton
        buttonText="Criar insumo"
        onPress={handleRegisterIngredients}
        type="yellow"
        disabled={loading || hasEmpty}
      />
    </ItensRegisterTemplate>
  );
};

export default RegisterIngredientsComponent;
