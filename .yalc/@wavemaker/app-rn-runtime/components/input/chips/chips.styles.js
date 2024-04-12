import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-chips';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexWrap: 'wrap'
    },
    text: {},
    chipsWrapper: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    chip: {
      margin: 2,
      backgroundColor: themeVariables.chipContainerColor,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: 4,
      paddingHorizontal: 4,
      minWidth: 80,
      minHeight: 32,
      borderWidth: 1,
      borderColor: themeVariables.chipborderColor,
      elevation: 1
    },
    chipLabel: {
      fontSize: 14,
      paddingLeft: 8,
      fontFamily: themeVariables.baseFont,
      fontWeight: '500',
      paddingRight: 12,
      color: themeVariables.chipDefaultTextColor,
      borderColor: themeVariables.chipborderColor
    },
    activeChip: {
      backgroundColor: themeVariables.chipSelectedContainerColor,
      borderColor: themeVariables.chipSelectedOutlineColor,
      borderWidth: 0
    },
    activeChipLabel: {
      color: themeVariables.chipActiveTextColor
    },
    searchContainer: {
      width: '100%',
      flexDirection: 'column'
    },
    search: {
      root: {
        marginBottom: 8
      },
      text: {
        borderRightWidth: 1,
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4
      }
    },
    doneIcon: {
      icon: {
        paddingLeft: 8,
        fontSize: 18,
        color: themeVariables.chipIconColor
      }
    },
    clearIcon: {
      icon: {
        color: themeVariables.chipIconColor,
        paddingRight: 8,
        fontSize: 18
      }
    },
    imageStyles: {
      root: {
        width: 32,
        height: 32
      }
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-disabled', '', {
    chip: {
      opacity: 0.5
    },
    search: {
      root: {
        backgroundColor: themeVariables.inputDisabledBgColor
      }
    }
  });
});
//# sourceMappingURL=chips.styles.js.map