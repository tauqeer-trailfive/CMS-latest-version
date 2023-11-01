import { defaultTheme } from 'react-admin';

export const darkTheme = {
   typography: {
      fontFamily: 'Inter',
   },
   palette: {
      primary: {
         main: '#fb5eb5',
      },
      secondary: {
         main: '#FBBA72',
      },
      mode: 'dark' as 'dark', // Switching the dark mode on is a single property value change.
   },
   shape: {
      borderRadius: 10,
   },
   sidebar: {
      width: 200,
   },
   components: {
      ...defaultTheme.components,
      RaMenuItemLink: {
         styleOverrides: {
            root: {
               '&.RaMenuItemLink-active': {
                  borderLeft: '5px solid #fb5eb5',
               },
            },
         },
      },
      MuiPaper: {
         styleOverrides: {
            elevation1: {
               boxShadow: 'none',
            },
         },
      },
      MuiAppBar: {
         styleOverrides: {
            colorSecondary: {
               color: '#fff',
               filter: '20px',
               backgroundColor: 'rgba(0,0,0,0.9)',
               border: 'none',
            },
         },
      },
      MuiLinearProgress: {
         styleOverrides: {
            colorPrimary: {
               backgroundColor: '#fb5eb5',
            },
            barColorPrimary: {
               backgroundColor: '#d7d7d7',
            },
         },
      },
      MuiTableRow: {
         styleOverrides: {
            root: {
               '&:last-child td': { border: 0 },
            },
         },
      },
   },
};

export const lightTheme = {
   typography: {
      fontFamily: 'Inter',
   },
   palette: {
      primary: {
         main: '#fb5eb5',
      },
      secondary: {
         light: '#5f5fc4',
         main: '#283593',
         dark: '#001064',
         contrastText: '#fff',
      },
      background: {
         default: '#fcfcfe',
      },
      mode: 'light' as 'light',
   },
   shape: {
      borderRadius: 10,
   },
   sidebar: {
      width: 200,
   },
   components: {
      ...defaultTheme.components,
      RaMenuItemLink: {
         styleOverrides: {
            root: {
               borderLeft: '3px solid #fff',
               '&.RaMenuItemLink-active': {
                  borderLeft: '5px solid #fb5eb5',
               },
            },
         },
      },
      MuiPaper: {
         styleOverrides: {
            elevation1: {
               boxShadow: 'none',
            },
            root: {
               border: '1px solid #e0e0e3',
               backgroundClip: 'padding-box',
            },
         },
      },
      MuiAppBar: {
         styleOverrides: {
            colorSecondary: {
               color: '#444',
               backgroundColor: '#fff',
            },
         },
      },
      MuiLinearProgress: {
         styleOverrides: {
            colorPrimary: {
               backgroundColor: '#fb5eb5',
            },
            barColorPrimary: {
               backgroundColor: '#d7d7d7',
            },
         },
      },
      MuiTableRow: {
         styleOverrides: {
            root: {
               '&:last-child td': { border: 0 },
            },
         },
      },
   },
};
