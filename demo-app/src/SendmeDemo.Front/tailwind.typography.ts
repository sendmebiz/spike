import { ThemeConfig } from "tailwindcss/types/config";

export const fontSize: ThemeConfig['fontSize'] = {
    'hh1': [
        '80px',
        {
            lineHeight: '106%',
            fontWeight: '500',
            letterSpacing: '-1.4px',
        },
    ],
    'hh2': [
        '66px',
        {
            lineHeight: '106%',
            fontWeight: '500',
            letterSpacing: '-1x',
        },
    ],
    'hh3': [
        '52px',
        {
            lineHeight: '110%',
            fontWeight: '500',
            letterSpacing: '-0.8px',
        },
    ],
    'paragraph': [
        '18px',
        {
            lineHeight: '180%',
            fontWeight: '400',
        }
    ],
    button: [
        '18px',
        {
            lineHeight: '140%',
            fontWeight: '400',
        }
    ],
};

export const fontFamily: ThemeConfig['fontFamily'] = {
    main: ['Inter', 'sans-serif'],
};
