import { theme } from '../../theme/theme';
import { Snackbar } from 'react-native-paper';
import styled from 'styled-components/native';

export const StyledSnackbar = styled(Snackbar)`
  background-color: ${theme.colors.lightBrown};
  align-items: center;
  width: 85%;
  align-self: center;
  padding: 4px;
  margin: 10px;
`;
