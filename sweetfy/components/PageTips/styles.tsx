import styled from 'styled-components/native';
import { theme } from '../../theme/theme';
import { Appbar, Surface } from 'react-native-paper';

interface IPageTipsStyles {
  flexDirection?: 'row' | 'column';
  lineHeight?: number;
  lineColor?: string;
}

export const HeaderContainerStyled = styled(Surface)<IPageTipsStyles>`
  background-color: ${theme.colors.yellowLight};
  width: 100%;
  display: flex;
  flex-direction: ${({ flexDirection }) => flexDirection};
  justify-content: space-between;
  align-items: center;
  border-color: ${theme.colors.white};
`;

export const StyledAppBar = styled(Appbar)`
  background-color: ${theme.colors.yellowLight};
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  justify-content: space-around;
  elevation: 8;
`;

export const DividerWithTextContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin: 20px 0;
`;

export const HorizontalLines = styled.View`
  height: 1.5px;
  width: 100%;
  background-color: ${theme.colors.lightBrown};
`;

export const Line = styled.View<IPageTipsStyles>`
  width: 100%;
  height: ${({ lineHeight }) => lineHeight}px;
  background-color: ${({ lineColor }) =>
    lineColor ? lineColor : theme.colors.white};
  flex: 1;
`;

export const PropsContainer = styled.View`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10;
  align-items: center;
  gap: 25;
  justify-content: center;
`;
