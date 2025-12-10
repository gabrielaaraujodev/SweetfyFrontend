import React, { useState } from 'react';
import DropdownInput from '../../../components/Dropdown';
import InputItens from '../../../components/Inputs';
import { secondaryTheme } from '../../../theme/theme';
import { QuantityInputsContainer } from '../styles';
import { epPostService } from '../../../api/register/registerItem';
import { UnitTypeEnum, pageType, serviceRegisterUnitOptions } from '../types';
import { router } from 'expo-router';
import DinamicButton from '../../../components/Buttons';
import { DinamicSnackbarType } from '../../../components/DinamicSnackbar';
import ItensRegisterTemplate from '../../../components/Templates/itensRegister';
import SpecificFormatInput from '../../../components/Inputs/SpecificFormatInput';

interface PageProps {
  type: pageType;
}

const RegisterServicesComponent = ({ type }: PageProps) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [providerName, setProviderName] = useState('');
  const [quantityUnit, setQuantityUnit] = useState<
    UnitTypeEnum.Unidade | UnitTypeEnum.Hora
  >();
  const [price, setPrice] = useState<number | null>();
  const [loading, setLoading] = useState(false);
  const [showResponseStatus, setShowResponseStatus] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [responseStatusMessage, setResponseStatusMessage] =
    useState<DinamicSnackbarType>('error');

  const handleRegisterServices = async () => {
    try {
      setLoading(true);
      await epPostService({
        name,
        description,
        providerName,
        unit: quantityUnit ?? UnitTypeEnum.Unidade,
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

  const hasEmpty = !name || !providerName || !quantityUnit || !price;

  const clearFields = () => {
    setName('');
    setProviderName('');
    setDescription('');
    setPrice(undefined);
    setQuantityUnit(undefined);
  };

  return (
    <ItensRegisterTemplate
      type={type}
      registerItemName="Novo serviço"
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
        title="Nome do serviço"
        placeholder="ex.: Ajudante de confeitaria"
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
        placeholder="ex.: Mão de obra para momentos pontuais"
        inputMode="text"
        onChangeText={setDescription}
        value={description}
        keyboardType="default"
        theme={secondaryTheme}
        outlinedInput
      />
      <InputItens
        title="Prestador do serviço"
        placeholder="ex.: Nome do ajudante, Nome da loja/fábrica "
        inputMode="text"
        keyboardType="default"
        onChangeText={setProviderName}
        value={providerName}
        theme={secondaryTheme}
        requiredField
        outlinedInput
      />
      <QuantityInputsContainer>
        <SpecificFormatInput
          onChangeValue={setPrice}
          value={Number(price)}
          placeholder="ex.: R$60,00"
          title="Preço"
          type="monetary"
        />
        <DropdownInput
          options={serviceRegisterUnitOptions}
          placeholder="ex.: Selecione"
          requiredField
          title="Medida"
          selectedOptions={quantityUnit}
          setSelectedOptions={setQuantityUnit}
        />
      </QuantityInputsContainer>

      <DinamicButton
        buttonText="Criar serviço"
        onPress={handleRegisterServices}
        type="yellow"
        disabled={loading || hasEmpty}
      />
    </ItensRegisterTemplate>
  );
};

export default RegisterServicesComponent;
