import { Surface } from 'react-native-paper';
import { theme } from "../../theme/theme";
import styled from "styled-components/native";

export const Container = styled(Surface)`
    flex: 1;
    backgroundColor: ${theme.colors.darkBrown};
    paddingBottom: 12;
`

export const ContentContainer = styled.ScrollView.attrs({
    contentContainerStyle:{
    alignItems: 'center',
    height: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
    marginTop: 24,
    width: '100%'
    }
})``

export const MainText = styled.View`
    display: flex;
    alignItems: center;
    justifyContent: center;
    gap: 24;
    paddingVertical: 24;
    max-width: 85%;
`

export const InputsContent= styled.View`
    width: 80%;
    gap: 24;
    marginBottom: 32;
`