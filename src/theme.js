import { extendTheme, theme as base, Input } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const dark = 'gray.700';
const light = '#f0f2f5';
const inputSelectStyles = {
  sizes: {
    md: {
      field: {
        borderRadius: 'none',
      },
    },
  },
};

const theme = extendTheme(
  {
    styles: {
      global: props => ({
        body: {
          bg: mode(light, dark)(props),
        },
      }),
    },
    colors: {
      brand: {
        50: '#89ffd5',
        100: '#66ffc9',
        200: '#42ffbc',
        300: '#1effb0',
        400: '#00f9a2',
        500: '#00b274',
        600: `#008e5c`,
        700: `#008e5c`,
        800: `#006b45`,
        900: `#00472e`,
      },
    },
    components: {
      Input: { ...inputSelectStyles },
    },
    fonts: {
      heading: `Overpass, ${base.fonts?.heading}`,
      body: `"Exo 2", sans-serif`,
    },
  },

  (Input.defaultProps = {
    ...Input.defaultProps,
    focusBorderColor: 'brand.700',
  })
);

export default theme;
