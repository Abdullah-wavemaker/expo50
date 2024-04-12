import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
import { Dimensions } from 'react-native';
export const DEFAULT_CLASS = 'app-popover';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      padding: 8,
      alignSelf: 'flex-start'
    },
    text: {},
    title: {
      backgroundColor: themeVariables.popoverTitleBackgroundColor,
      padding: 12,
      color: themeVariables.popoverTitleColor,
      fontSize: 16,
      fontFamily: themeVariables.baseFont
    },
    link: {
      root: {},
      text: {
        paddingRight: 8
      }
    },
    popover: {
      backgroundColor: themeVariables.popoverBackgroundColor,
      maxWidth: 640,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28
    },
    popoverContent: {
      root: {
        flex: 1
      }
    },
    modal: {},
    modalContent: {
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('popover-action-sheet', '', {
    modal: {
      backgroundColor: 'rgba(0, 0, 0, 0.3)'
    },
    popover: {
      width: '100%',
      minHeight: 240,
      maxHeight: Dimensions.get('window').height - 120
    },
    modalContent: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      ...BASE_THEME.getStyle('elevate1').root,
      shadowOffset: {
        width: 0,
        height: 0
      },
      shadowOpacity: 0.6,
      shadowRadius: 10,
      justifyContent: 'flex-end'
    }
  });
  addStyle('popover-dropdown', '', {
    modal: {
      backgroundColor: 'transparent'
    },
    popover: {
      backgroundColor: themeVariables.transparent
    },
    modalContent: {
      borderRadius: 6,
      position: 'absolute',
      ...BASE_THEME.getStyle('elevate4').root,
      shadowRadius: 8
    }
  });
});
//# sourceMappingURL=popover.styles.js.map