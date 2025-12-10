import { theme } from "../../theme/theme";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity<{selectedBackgroundColor: boolean}>`
    backgroundColor: ${({selectedBackgroundColor}) => selectedBackgroundColor ? theme.colors.lightBlue : theme.colors.yellowLight};
    max-height: 48px;
    border-radius: 8px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    width: 100%;   
`;

export const CalculationButtonBox = styled.View`
    flexDirection: row;
    borderRadius: 4px;
    height: 20;
    min-width: 20%;
    max-width: 30%;
    padding: 2px;
    alignItems: center;
    borderColor: ${theme.colors.pinkRed};
    borderWidth: 1;
    justify-content: space-between;
`;

export const ButtonBox = styled.TouchableOpacity`
    flex: 1;
    height: 100%;
    alignItems: center;
    justifyContent: center;
`
export const VerticalLine = styled.View`
    width: 1;
    height: 90%;
    backgroundColor: ${theme.colors.pinkRed};
    marginHorizontal: 2;
`

