import { theme } from '@/theme/theme';
import styled from 'styled-components/native';

export const PageTitle = styled.Text`
  color: #5F3124;
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 25px;
`;

export const PageText = styled.Text`
  color: #5F3124;
  font-family: 'Montserrat';
  font-size: 22px;
`;

export const ViewDescription = styled.View`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

export const ViewRecipe = styled.View`
  
margin: 30px;

`;

export const ViewContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  background-color: ${theme.colors.lightBrown};
  padding: 20px;
  gap: 20px;
`;