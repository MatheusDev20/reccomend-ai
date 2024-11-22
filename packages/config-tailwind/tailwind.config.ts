import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Omit<Config, "content">  = {
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['cupcake', 'dark'],
  },
};

export default config;
