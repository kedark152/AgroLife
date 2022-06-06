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
        50: '#ACDCFF',
        100: '#90D1FF',
        200: '#74C5FF',
        300: '#58B9FF',
        400: '#3CAEFF',
        500: '#0597FF',
        600: `#0087E8`,
        700: `#0077CB`,
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
