import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Omit<Config, "content">  = {
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: [{
      "dark": {
        ...require("daisyui/src/theming/themes")["dark"],
        ".black-tone-6": {
          backgroundColor: "#0E1113"
        },
        ".border-reddit-gray-main": { 
          borderColor: "#FFFFFF33",
        }
      }
    }],
  },
  darkMode: ['selector', '[data-theme="dark"]']
};

export default config;
