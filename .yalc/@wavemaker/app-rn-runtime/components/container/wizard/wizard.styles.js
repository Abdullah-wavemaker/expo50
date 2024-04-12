import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-wizard';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const defaultStyles = defineStyles({
    root: {
      flexDirection: 'column',
      backgroundColor: themeVariables.wizardBackgroundColor,
      display: 'flex',
      minHeight: 240
    },
    text: {},
    activeStep: {
      backgroundColor: themeVariables.wizardStepActiveColor,
      borderColor: themeVariables.wizardStepActiveColor,
      color: themeVariables.wizardActiveStepColor
    },
    doneStep: {
      backgroundColor: themeVariables.wizardStepDoneColor,
      color: themeVariables.wizardDoneStepColor,
      borderColor: themeVariables.wizardStepDoneColor
    },
    wizardHeader: {
      padding: 8,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'center'
    },
    stepWrapper: {
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 20
    },
    headerWrapper: {
      flex: 1
    },
    wizardBody: {
      alignSelf: 'flex-start',
      paddingTop: 10,
      flex: 1,
      width: '100%',
      borderWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderColor: themeVariables.wizardBorderColor
    },
    wizardFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      padding: 12,
      width: '100%'
    },
    buttonWrapper: {
      flexDirection: 'row'
    },
    stepTitle: {
      textTransform: 'capitalize',
      fontSize: 12,
      color: themeVariables.wizardStepTitleColor
    },
    stepSubTitle: {
      color: themeVariables.wizardStepTitleColor
    },
    step: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 37,
      backgroundColor: themeVariables.wizardBackgroundColor,
      height: 37,
      borderWidth: 1,
      borderRadius: 18.5,
      color: themeVariables.wizardStepColor,
      borderColor: themeVariables.wizardStepColor
    },
    wizardActions: {
      root: {
        marginRight: 8
      },
      text: {
        textTransform: 'capitalize',
        fontSize: 14
      }
    },
    nextButton: {
      root: {
        marginRight: 0,
        paddingRight: 8,
        backgroundColor: themeVariables.wizardNextBtnColor,
        borderColor: themeVariables.wizardActiveStepColor
      },
      text: {
        color: themeVariables.wizardActiveStepColor
      }
    },
    prevButton: {
      root: {
        paddingLeft: 16
      },
      icon: {
        icon: {
          paddingRight: 0,
          paddingLeft: 0
        }
      }
    },
    cancelButton: {
      root: {
        minHeight: 46
      }
    },
    doneButton: {
      root: {
        marginRight: 0,
        backgroundColor: themeVariables.wizardDoneBtnColor,
        borderColor: themeVariables.wizardActiveStepColor
      },
      text: {
        color: themeVariables.wizardActiveStepColor
      },
      icon: {
        text: {
          fontSize: 12,
          color: themeVariables.wizardActiveStepColor
        }
      }
    },
    stepIcon: {
      root: {
        alignSelf: 'center',
        justifyContent: 'center',
        paddingLeft: 8
      },
      text: {
        color: themeVariables.wizardStepIconColor,
        fontSize: 15
      }
    },
    skipLink: {
      root: {
        padding: 8,
        alignSelf: 'flex-end'
      }
    },
    stepConnector: {
      backgroundColor: themeVariables.wizardStepConnectorColor,
      position: 'absolute',
      top: 17.5,
      zIndex: 10,
      height: 2
    },
    numberTextStepConnector: {
      display: 'none'
    },
    stepCounter: {
      fontSize: 15,
      color: themeVariables.wizardStepColor
    },
    progressCircle: {},
    popover: {},
    stepMenu: {},
    activeStepMenu: {},
    stepMenuLabel: {},
    stepMenuActiveLabel: {},
    stepMenuIcon: {},
    stepMenuActiveIcon: {}
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle('number-text-inline', '', {
    stepConnector: {
      display: 'none'
    },
    numberTextStepConnector: {
      backgroundColor: themeVariables.wizardStepConnectorColor,
      height: 2,
      display: 'flex'
    },
    stepWrapper: {
      flexDirection: 'row'
    },
    wizardHeader: {
      justifyContent: 'flex-start'
    },
    headerWrapper: {
      flex: -1
    },
    stepTitle: {
      padding: 5
    }
  });
  addStyle('progress-circle-header', '', {
    stepWrapper: {
      paddingBottom: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    wizardHeader: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: themeVariables.wizardBackgroundColor,
      height: 120,
      borderRadius: 30
    },
    stepSubTitle: {
      fontSize: 12,
      paddingHorizontal: 5
    },
    headerWrapper: {
      flex: 1
    },
    stepTitle: {
      fontSize: 16,
      paddingHorizontal: 5
    },
    progressCircle: {
      root: {
        height: 60,
        width: 60
      },
      text: {},
      progressValue: {
        height: 8
      }
    },
    popover: {
      popover: {
        width: 160,
        paddingTop: 8,
        paddingBottom: 8,
        backgroundColor: themeVariables.menuBackgroundColor,
        minHeight: 160,
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28
      },
      popoverContent: {
        root: {
          //@ts-ignore
          flex: undefined
        }
      },
      modalContent: {
        borderBottomLeftRadius: 28,
        borderBottomRightRadius: 28
      }
    },
    stepMenu: {
      flexDirection: 'row',
      padding: 14,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    activeStepMenu: {},
    stepMenuLabel: {
      text: {
        color: themeVariables.menuItemTextColor
      }
    },
    stepMenuActiveLabel: {
      text: {
        color: themeVariables.primaryColor
      }
    },
    stepMenuIcon: {
      root: {
        paddingRight: 4
      },
      text: {
        color: themeVariables.menuItemTextColor
      }
    },
    stepMenuActiveIcon: {
      root: {
        paddingRight: 4
      },
      text: {
        color: themeVariables.primaryColor
      }
    }
  });
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    wizardActions: {
      icon: {
        root: {
          transform: [{
            rotateY: '180deg'
          }]
        }
      }
    },
    nextButton: {
      root: {
        marginRight: 8
      }
    },
    doneButton: {
      root: {
        marginRight: 8
      },
      icon: {
        root: {
          transform: [{
            rotateY: '0deg'
          }]
        }
      }
    }
  });
});
//# sourceMappingURL=wizard.styles.js.map