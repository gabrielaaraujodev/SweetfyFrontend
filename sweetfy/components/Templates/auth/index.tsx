import { H1, H5 } from '../../../theme/fontsTheme';
import { Container, ContentContainer, MainText } from '../styles';
import { ReactNode } from 'react';
import { ScrollViewProps, StyleProp } from 'react-native';

interface IAuthTemplate {
  subtitle: string;
  children: ReactNode;
  style?: StyleProp<ScrollViewProps>;
}

const AuthTemplate = ({ subtitle, children, style }: IAuthTemplate) => {
  return (
    <Container>
      <ContentContainer style={style}>
        <MainText>
          <H1 colorKey="lightBrown">Sweetfy</H1>
          <H5
            colorKey="lightBrown"
            style={{ textAlign: 'center' }}
          >
            {subtitle}
          </H5>
        </MainText>
        {children}
      </ContentContainer>
    </Container>
  );
};

export default AuthTemplate;
