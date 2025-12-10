import { theme } from '@/theme/theme';
import styled from 'styled-components/native';

export const ContainerCard = styled.TouchableOpacity<{isSelected:boolean}>`
background-color: ${({isSelected}) => isSelected ? theme.colors.lightBlue : theme.colors.inputWhite};
  border-left-width: 6px;
  border-left-color: #880741;
  border-color: #880741;
  border-width: 1px;
  border-radius: 10px;
  margin: 5px;
  padding: 12px;
  gap: 12px;
  margin-left: 10px;
  max-height: 300px;
`;

export const ViewCard = styled.View`
  display: flex;
  flex-direction: column;
  gap: 25px;
  padding: 5px;
  width: 190px;
  height: 260px;
`;

export const ContainerWithCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
  margin-vertical: 8px;
`;

export const TitleCard = styled.Text`
  color: #5f3124;
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 25px;
`;

export const TextCard = styled.Text`
  color: #5f3124;
  font-family: 'Montserrat';
  font-size: 21px;
  margin: 3px;
`;