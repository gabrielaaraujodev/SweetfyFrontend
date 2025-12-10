import { theme } from '@/theme/theme';
import styled from 'styled-components/native';

export const ContainerCardOrder = styled.TouchableOpacity<{isSelected:boolean}>`
background-color: ${({isSelected}) => isSelected ? theme.colors.lightBlue : theme.colors.inputWhite};
  border-left-width: 6px;
  border-left-color: #880741;
  border-color: #880741;
  border-width: 1px;
  border-radius: 10px;
  margin: 5px;
  padding: 12px;
  gap: 10px;
  margin-left: 10px;
  min-height: 200px;
  width: 320px;

`;

export const ViewCard = styled.View`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 5px;
`;

export const ViewPrice = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10;
  padding: 5px;
`;

export const ContainerWithCheckBox = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-horizontal: 5px;
  margin-vertical: 8px;
`;

export const ContainerPrice = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  
`;

export const TitleCard = styled.Text`
  color: #5F3124;
  font-weight: bold;
  font-family: 'Montserrat';
  font-size: 25px;
`;

export const TextCard = styled.Text`
    color: #5F3124;
    font-family: 'Montserrat';
    font-size: 21px;
`;

export const TextProfit = styled.Text`
    color: #43A139;
    font-family: 'Montserrat';
    font-size: 21px;
    font-weight: bold;
`;

export const TextCost = styled.Text`
    color: #880741;
    font-family: 'Montserrat';
    font-size: 21px;
    font-weight: bold;
`;