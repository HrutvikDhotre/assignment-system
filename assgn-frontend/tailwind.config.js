module.exports = {
  mode: 'jit',
  darkMode: 'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '0.5': '0.5px',
      },
      width: {
        '98': '26rem',
        '[20%]': '20%',
        '[60%]': '60%',
        '[80%]': '80%',
        '[90%]': '90%',
        '[95%]': '95.5%',
      },
      zIndex: {
        '100': '100',
        '10000': '10000',
        '10001': '10001',
        '10002': '10002',
        '10003': '10003'
      },
      margin: {
        '[60px]': '100px',
        '0': '0',
        '[20%]': '20%',
        '[90%]': '90%'
      },
      height: {
        'screen': '100vh',
        '84': '22rem',
        '6/7': '93%'
      },
      boxShadow: {
        'nav-shadow': 'rgba(0, 0, 0, 0.05) 0px 1px 2px 0px',
        'sidebar-shadow': '0 7px 30px 0 hsla(210,7%,48%,.11)',
        'login-shadow': 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        'form-shadow': '0 0 10px rgba(0, 0, 0, 0.1)',
        'main-shadow' : 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;'
      },
      backgroundColor: { 
        'main' : 'rgb(248,247,250,1)',
      }

    },
  },
  plugins: [
    function ({ addVariant, e }) {
      addVariant('shadow-skin', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.shadow-skin .${e(`shadow-skin${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant('vertical', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.vertical .${e(`vertical${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant('horizontal', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.horizontal .${e(`horizontal${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant('collapsed', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.collapsed .${e(`collapsed${separator}${className}`)}`;
        });
      });
    },
    function ({ addVariant, e }) {
      addVariant('dark-menu', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.dark-menu .${e(`dark-menu${separator}${className}`)}`;
        });
      });
    },
  ],
}