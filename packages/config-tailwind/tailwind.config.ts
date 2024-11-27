import type { Config } from 'tailwindcss';

const config: Omit<Config, "content"> = {
  theme: {},
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["cupcake", "dark"]
  },
  darkMode: ['selector', '[data-theme="dark"]']
};

export default config;
