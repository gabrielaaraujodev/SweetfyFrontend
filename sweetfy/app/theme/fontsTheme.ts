import { Text } from 'react-native-paper';
import { theme } from './theme';
import styled from 'styled-components/native';

type AppColors = typeof theme.colors;
export type ColorKey = keyof AppColors;

interface StyledTextProps {
  colorKey?: ColorKey | string; 
}

export const getTextColor = ({ colorKey }: StyledTextProps) => {
  if (!colorKey) return theme.colors.inputWhite;

  const isThemeKey = Object.keys(theme.colors).includes(colorKey);

  if (isThemeKey) return theme.colors[colorKey as ColorKey];
  
  return colorKey;
};

export const H1 = styled(Text)<StyledTextProps>`
${theme.typography.h1_display}
color: ${getTextColor};
`;

export const H2 = styled(Text)<StyledTextProps>`
${theme.typography.h2_largeTitle}
color: ${getTextColor};
`;

export const H3 = styled(Text)<StyledTextProps>`
${theme.typography.h3_title}
color: ${getTextColor};
`;

export const H4 = styled(Text)<StyledTextProps>`
${theme.typography.h4_subtitle}
color: ${getTextColor};
`;

export const H5 = styled(Text)<StyledTextProps>`
${theme.typography.h5_bodyLarge}
color: ${getTextColor};
`;

export const H6 = styled(Text)<StyledTextProps>`
${theme.typography.h6_body}
color: ${getTextColor};
`;

export const H6_medium = styled(Text)<StyledTextProps>`
${theme.typography.h6_body_medium}
color: ${getTextColor};
`;

export const Label = styled(Text)<StyledTextProps>`
${theme.typography.label}
color: ${getTextColor};
`;

export const P = styled(Text)<StyledTextProps>`
${theme.typography.p}
color: ${getTextColor};
`;

export const P_medium = styled(Text)<StyledTextProps>`
${theme.typography.p_medium}
color: ${getTextColor};
`;