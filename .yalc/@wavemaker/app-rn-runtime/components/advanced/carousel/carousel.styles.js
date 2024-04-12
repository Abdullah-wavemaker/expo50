import BASE_THEME from '@wavemaker/app-rn-runtime/styles/theme';
import { defineStyles } from '@wavemaker/app-rn-runtime/core/base.component';
export const DEFAULT_CLASS = 'app-carousel';
BASE_THEME.registerStyle((themeVariables, addStyle) => {
  const btn = {
    height: 48,
    width: 48,
    borderRadius: 48,
    borderColor: themeVariables.transparent,
    borderWidth: 1,
    justifyContent: 'center'
  };
  const defaultStyles = defineStyles({
    root: {
      position: 'relative',
      rippleColor: themeVariables.transparent
    },
    text: {},
    slide: {
      width: '100%',
      overflow: 'hidden',
      paddingHorizontal: 16,
      transform: [{
        scale: 0.8
      }]
    },
    firstSlide: {},
    lastSlide: {},
    activeSlide: {},
    btnPanel: {
      position: 'absolute',
      top: '50%',
      marginTop: -64,
      height: 64,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%'
    },
    prevBtn: {
      root: {
        marginLeft: 12,
        ...btn,
        backgroundColor: themeVariables.carouselPrevBgColor,
        rippleColor: themeVariables.transparent
      },
      text: {
        fontSize: 32
      },
      icon: {
        color: themeVariables.carouselPrevBtnColor
      }
    },
    nextBtn: {
      root: {
        marginRight: 12,
        ...btn,
        backgroundColor: themeVariables.carouselPrevBgColor,
        rippleColor: themeVariables.transparent
      },
      text: {
        fontSize: 32
      },
      icon: {
        color: themeVariables.carouselNextBtnColor
      }
    },
    dotsWrapperStyle: {
      opacity: 1,
      backgroundColor: themeVariables.carouselDotWrapperBgColor,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 4,
      paddingBottom: 4
    },
    activeDotStyle: {
      position: 'absolute',
      backgroundColor: themeVariables.carouselActiveDotColor,
      opacity: 1,
      padding: 4
    },
    dotStyle: {
      width: 8,
      height: 8,
      borderRadius: 10,
      opacity: 0.2,
      marginLeft: 2,
      marginRight: 2,
      backgroundColor: themeVariables.carouselDotColor
    }
  });
  addStyle(DEFAULT_CLASS, '', defaultStyles);
  addStyle(DEFAULT_CLASS + '-rtl', '', {
    prevBtn: {
      root: {
        transform: [{
          rotateY: '180deg'
        }]
      }
    },
    nextBtn: {
      root: {
        transform: [{
          rotateY: '180deg'
        }]
      }
    }
  });
  addStyle('app-carousel-1', '', {
    btnPanel: {
      top: '100%'
    },
    prevBtn: {
      root: {
        borderRadius: 6
      }
    },
    nextBtn: {
      root: {
        borderRadius: 6
      }
    }
  });
  addStyle('app-carousel-2', '', {
    btnPanel: {
      backgroundColor: themeVariables.defaultColorF,
      width: '100%',
      top: '100%',
      right: 0,
      padding: 8,
      justifyContent: 'flex-end'
    },
    dotsWrapperStyle: {
      alignSelf: 'flex-start',
      justifyContent: 'flex-start'
    },
    activeDotStyle: {
      backgroundColor: themeVariables.primaryColor
    },
    dotStyle: {
      backgroundColor: themeVariables.primaryColor
    },
    prevBtn: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: themeVariables.primaryColor
      },
      icon: {
        color: themeVariables.primaryColor
      }
    },
    nextBtn: {
      root: {
        marginLeft: 8,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderColor: themeVariables.primaryColor
      },
      icon: {
        color: themeVariables.primaryColor
      }
    }
  });
});
//# sourceMappingURL=carousel.styles.js.map