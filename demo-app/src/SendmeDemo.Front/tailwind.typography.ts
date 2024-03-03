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
    'hh4': [
        '42px',
        {
            lineHeight: '115%',
            fontWeight: '500',
            letterSpacing: '-0.6px',
        },
    ],
    'hh5': [
        '32px',
        {
            lineHeight: '120%',
            fontWeight: '500',
            letterSpacing: '-0.5px',
        },
    ],
    'hh6': [
        '24px',
        {
            lineHeight: '110%',
            fontWeight: '500',
            letterSpacing: '-0.5px',
        },
    ],
    'paragraph': [
        '18px',
        {
            lineHeight: '180%',
            fontWeight: '400',
        }
    ],
    small: [
        '14px',
        {
            lineHeight: '120%',
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
