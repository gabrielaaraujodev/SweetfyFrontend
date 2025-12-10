import styled from 'styled-components/native';

export const ContainerListOFCards = styled.View`
  display: flex;
  flex-direction: column;
  background-color: #f3e9e7ff;
`;

// Componente para o título, aceita as propriedades de fonte
export const TitleText = styled.Text`
  font-size: 30px;
  font-weight: bold;
  color: #5f3124;
`;

// Contêiner para o layout do título e botão
export const ViewButtonTitle = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
   font-size: 30px;
   font-weight: bold;
   font-color: #5f3124;
   margin: 5px;

`;
