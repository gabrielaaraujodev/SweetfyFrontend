import ConfirmModal from '@/components/ConfirmationModal';
import DinamicSnackbar, {
  DinamicSnackbarType,
} from '@/components/DinamicSnackbar';
import { IDropdownItem } from '@/components/Dropdown/types';
import TemplateComponent from '@/components/ItemsTemplate';
import DinamicHeader from '@/components/PageTips/DinamicHeader';
import {
  ContentContainer,
  FormContainer,
  IconsContainer,
  PageContainer,
  TitleContainer,
} from '../../../pagesContent/registerItems/styles';
import { pageType } from '../../../pagesContent/registerItems/types';
import { H4 } from '../../../theme/fontsTheme';
import { theme } from '../../../theme/theme';
import { ReactNode } from 'react';
import { IconButton } from 'react-native-paper';

interface IItensRegisterTemplate {
  registerItemName: string;
  children: ReactNode;
  showSnackbar: boolean;
  snackbarType: DinamicSnackbarType;
  showConfirmModal: boolean;
  OnDismissSnackbar(): void;
  onDismissModal(): void;
  onConfirmModal(): void;
  templateOptions?: IDropdownItem[];
}

const ItensRegisterTemplate = ({
  registerItemName,
  children,
  showSnackbar,
  snackbarType,
  showConfirmModal,
  OnDismissSnackbar,
  templateOptions,
  onDismissModal,
  onConfirmModal,
}: IItensRegisterTemplate) => {
  const words = registerItemName.split(' ');
  const lastLetter = () => {
    const stringLenght = words.length;
    return registerItemName[stringLenght - 1];
  };
  return (
    <PageContainer>
      <DinamicHeader returnable />
      <ContentContainer>
        <H4>{registerItemName}</H4>

        {/* {templateOptions && templateOptions.length > 0 && (
          <TemplateComponent
            options={templateOptions}
            placeholder={`Template de ${words[1]}s`}
            searchPlaceholder={`Busque ${words[1]}s salv${
              lastLetter() === 'a' ? 'a' : 'o'
            }s`}
          />
        )} */}
        <FormContainer>{children}</FormContainer>
      </ContentContainer>
      <DinamicSnackbar
        isVisible={showSnackbar}
        OnDismissFunction={OnDismissSnackbar}
        type={snackbarType}
      />
      <ConfirmModal
        onConfirm={onConfirmModal}
        onDismiss={onDismissModal}
        visible={showConfirmModal}
        cancelText="Mais tarde ;)"
        confirmText="Sim :)"
        message={`Já salvamos esse aqui! Deseja incluir mais um${
          lastLetter() === 'a' ? 'a' : ''
        } ${registerItemName.toLowerCase()} ou prefere voltar para o página inicial?`}
        title="Quer adicionar outro?"
      />
    </PageContainer>
  );
};

export default ItensRegisterTemplate;
