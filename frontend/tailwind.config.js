module.exports = {
  content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        messages: {
          messageHeader: '#C2EABA',
          messagesBg: '#E6EFE9',
          messages: '#A7C4A0',
          messageHeaderHover: '#8F8389',
        },
      },
    },
  },
  plugins: [],
  variants: {
    extend: {
      outline: ["focus"],
      ring: ["focus"],
    },

  }
}
