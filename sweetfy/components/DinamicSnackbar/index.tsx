import { H5, H6 } from '../../theme/fontsTheme';
import { StyledSnackbar } from './style';
import { Portal } from 'react-native-paper';

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
    <Portal>
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
          {type === 'success'
            ? 'Tudo certo!'
            : 'Confira os dados inseridos e tente novamente!'}
        </H6>
      </StyledSnackbar>
    </Portal>
  );
};

export default DinamicSnackbar;
