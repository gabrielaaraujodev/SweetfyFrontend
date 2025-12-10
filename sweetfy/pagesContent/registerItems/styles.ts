import { theme } from "../../theme/theme";
import styled from "styled-components/native";

export const PageContainer = styled.View`
    flex: 1;
    backgroundColor: ${theme.colors.darkBrown};
    marginBottom: 50px;
`

export const ContentContainer = styled.ScrollView.attrs({
    contentContainerStyle:{
    justifyContent: 'center',
    padding: 16,
    marginTop: 10
    }
})``;

export const TitleContainer = styled.View`
    display: flex;
    flexDirection: row;
    alignItems: center;
    justifyContent: space-between;
`;

export const IconsContainer = styled.View`
    display: flex;
    flexDirection: row;
`;

export const FormContainer = styled.View`
    display: flex;  
    flexDirection: column;
    gap: 20;
    padding: 8px;
`;

export const QuantityInputsContainer = styled.View`
    display: flex;
    flexDirection: row;
    gap: 10;
    zIndex: 100000;
    elevation: 100000;
`;



