import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { DividerWithTextContainer, Line } from '../PageTips/styles';
import { P } from '../../theme/fontsTheme';
import { theme } from '../../theme/theme';

interface Props {
  text: string;
  style?: StyleProp<ViewStyle>;
}

const DividerWithText = ({ text, style }: Props) => {
  return (
    <DividerWithTextContainer style={style}>
      <Line
        lineHeight={0.5}
        lineColor={theme.colors.lightBrown}
      />
      <P
        colorKey="lightBrown"
        style={{ marginHorizontal: 16, maxWidth: '50%', textAlign: 'center' }}
      >
        {text}
      </P>
      <Line
        lineHeight={0.5}
        lineColor={theme.colors.lightBrown}
      />
    </DividerWithTextContainer>
  );
};

export default DividerWithText;
