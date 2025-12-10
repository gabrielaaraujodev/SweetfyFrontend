import { ButtonProps, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { ThemeProp } from 'react-native-paper/lib/typescript/types';

export const fontSize = {
    h1_display: 68,
    h2_largeTitle: 40,
    h3_title: 28,
    h4_subtitle: 24,
    h5_bodyLarge: 20,
    h6_body: 16,
    p: 14,
    label: 12,
};

export const fontWeight = {
    bold: 700,
    semi: 600,
    medium: 500,
    regular: 400
};

export const fontFamily = 'Montserrat';

const typography= {
        h1_display: {
            fontSize: fontSize.h1_display,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
        h2_largeTitle: {
            fontSize: fontSize.h2_largeTitle,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
        h3_title: {
            fontSize: fontSize.h3_title,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
        h4_subtitle: {
            fontSize: fontSize.h4_subtitle,
            fontWeight: fontWeight.semi,
            fontFamily: fontFamily,
        },
        h5_bodyLarge: {
            fontSize: fontSize.h5_bodyLarge,
            fontWeight: fontWeight.semi,
            fontFamily: fontFamily,
        },
        h5_bodyLarge_bold: {
            fontSize: fontSize.h5_bodyLarge,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
        h6_body: {
            fontSize: fontSize.h6_body,
            fontWeight: fontWeight.regular,
            fontFamily: fontFamily,
        },
        h6_body_bold: {
            fontSize: fontSize.h6_body,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
            h6_body_medium: {
                fontSize: fontSize.h6_body,
                fontWeight: fontWeight.medium,
                fontFamily: fontFamily,
            },
        p: {
            fontSize: fontSize.p,
            fontWeight: fontWeight.regular,
            fontFamily: fontFamily,
        },
        p_medium: {
            fontSize: fontSize.p,
            fontWeight: fontWeight.medium,
            fontFamily: fontFamily,
        },
        p_semi: {
            fontSize: fontSize.p,
            fontWeight: fontWeight.semi,
            fontFamily: fontFamily,
        },
        p_bold: {
            fontSize: fontSize.p,
            fontWeight: fontWeight.bold,
            fontFamily: fontFamily,
        },
        label: {
            fontSize: fontSize.label,
            fontWeight: fontWeight.regular,
            fontFamily: fontFamily,
        }
    
    }

const colors ={
    brown: '#9C503B',
    darkBrown: '#5f3124',
    lightBrown: '#F5EEEB',
    yellow: '#FBEAA4',
    yellowLight: '#FFFFFD',
    inputWhite: '#FFFFFF',
    pinkRed: '#880741',
    red:'#F33141',
    green: '#69B460',
    white: '#F5F0F0',
    lightBlue: '#E9E9EF',
    rippleColor: '#E2D8D826',
    backColor: '#E2D8D8'
}

export type ButtonVariantTypes = 'brownLight' | 'outlined' | 'yellow';

type ButtonVariantFn = (isDisabled?: boolean) => Partial<ButtonProps>;

export const buttonVariants: Record<ButtonVariantTypes, ButtonVariantFn> = {
  brownLight: (isDisabled) => ({
    mode: 'contained',
    buttonColor: isDisabled ? colors.lightBrown + '80' : colors.lightBrown,
    textColor: isDisabled ? colors.brown + '80' : colors.brown,
  }),

  outlined: (isDisabled) => ({
    mode: 'outlined',
    textColor: isDisabled ? colors.lightBlue + '80' : colors.lightBlue,
    style: {
      borderWidth: 1,
      borderColor: isDisabled ? colors.lightBlue + '80' : colors.lightBlue,
      backgroundColor: 'transparent',
    },
  }),

  yellow: (isDisabled) => ({
    mode: 'contained',
    buttonColor: isDisabled ? colors.yellow + '80' : colors.yellow,
    textColor: isDisabled ? colors.darkBrown + '80' : colors.darkBrown,
  }),
};

export const theme = {
    colors,
    typography,
    buttonVariants,
};

//Usar em telas com componente de input amarelo preenchido 
export const primaryTheme: ThemeProp = { 
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        ...colors,
        surfaceVariant: colors.yellow,
        background: colors.yellow,
        primary: colors.darkBrown,
        onSurfaceVariant:colors.brown,
    }
};

//Usar em telas com componente de input "vazio" de borda amarelo 
export const secondaryTheme: ThemeProp = {
    ...DefaultTheme,
    roundness: 8,
    colors: {
        ...DefaultTheme.colors,
        ...colors,
        background: 'transparent',
        primary: colors.white,
        onSurfaceVariant:colors.yellow,
        onBackground: colors.yellow,
        onSurface: colors.yellowLight,
        outline: colors.yellow,
    }
};

export const transparentStepperTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    onSurface: colors.pinkRed,
    outline: colors.pinkRed,  
    background: 'transparent',          
    surfaceVariant: 'transparent',      
    primary: colors.pinkRed,   
  },}