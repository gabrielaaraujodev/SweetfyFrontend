import { H5, H6 } from '@/theme/fontsTheme';
import { StyledSnackbar } from './style';

export type DinamicSnackbarType = 'success' | 'error';

interface IDinamicSnackbar {
  isVisible: boolean;
  OnDismissFunction(): void;
  type: DinamicSnackbarType;
}

const DinamicSnackbar = ({
  isVisible,
  OnDismissFunction,
  type,
}: IDinamicSnackbar) => {
  return (
    <StyledSnackbar
      visible={isVisible}
      onDismiss={OnDismissFunction}
    >
      <H5
        colorKey="brown"
        style={{ marginBottom: 8 }}
      >
        {type === 'success' ? 'Sucesso :)' : 'Algo deu errado :('}
      </H5>
      <H6 colorKey="brown">
        {' '}
        {type === 'success' ? 'Tudo certo!' : 'Tudo aconteceu como o esperado!'}
      </H6>
    </StyledSnackbar>
  );
};

export default DinamicSnackbar;
