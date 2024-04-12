var _class;
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import Color from "color";
import { Dimensions, StatusBar } from "react-native";
export default class ThemeVariables {
  constructor() {
    _defineProperty(this, "primaryColor", '#4263eb');
    _defineProperty(this, "primaryColor1", Color(this.primaryColor).lighten(0.2).rgb().toString());
    _defineProperty(this, "primaryColor2", Color(this.primaryColor).lighten(0.4).rgb().toString());
    _defineProperty(this, "primaryColor3", Color(this.primaryColor).lighten(0.6).rgb().toString());
    _defineProperty(this, "primaryContrastColor", '#ffffff');
    _defineProperty(this, "secondaryColor", '#6c757d');
    _defineProperty(this, "secondaryContrastColor", '#ffffff');
    _defineProperty(this, "successColor", '#28a745');
    _defineProperty(this, "successContrastColor", '#ffffff');
    _defineProperty(this, "infoColor", '#17a2b8');
    _defineProperty(this, "infoContrastColor", '#ffffff');
    _defineProperty(this, "warningColor", '#ffc107');
    _defineProperty(this, "warningContrastColor", '#ffffff');
    _defineProperty(this, "dangerColor", '#dc3545');
    _defineProperty(this, "dangerContrastColor", '#ffffff');
    _defineProperty(this, "defaultColor", '#000000');
    _defineProperty(this, "defaultColor1", '#111111');
    _defineProperty(this, "defaultColor2", '#222222');
    _defineProperty(this, "defaultColor3", '#333333');
    _defineProperty(this, "defaultColor4", '#444444');
    _defineProperty(this, "defaultColor5", '#555555');
    _defineProperty(this, "defaultColor6", '#666666');
    _defineProperty(this, "defaultColor7", '#777777');
    _defineProperty(this, "defaultColor8", '#888888');
    _defineProperty(this, "defaultColor9", '#999999');
    _defineProperty(this, "defaultColorA", '#aaaaaa');
    _defineProperty(this, "defaultColorB", '#bbbbbb');
    _defineProperty(this, "defaultColorC", '#cccccc');
    _defineProperty(this, "defaultColorD", '#dddddd');
    _defineProperty(this, "defaultColorE", '#eeeeee');
    _defineProperty(this, "defaultColorF", '#ffffff');
    _defineProperty(this, "defaultBgColor", this.defaultColorF);
    _defineProperty(this, "defaultTextColor", '#151420');
    _defineProperty(this, "lightColor", this.defaultColorF);
    _defineProperty(this, "darkColor", this.defaultColor);
    _defineProperty(this, "muteColor", this.defaultColorA);
    _defineProperty(this, "heading1FontSize", 36);
    _defineProperty(this, "heading2FontSize", 30);
    _defineProperty(this, "heading3FontSize", 24);
    _defineProperty(this, "heading4FontSize", 18);
    _defineProperty(this, "heading5FontSize", 14);
    _defineProperty(this, "heading6FontSize", 12);
    _defineProperty(this, "transparent", 'transparent');
    _defineProperty(this, "badgeColor", '#6c757d');
    _defineProperty(this, "badgeContrastColor", '#ffffff');
    _defineProperty(this, "baseFont", 'Roboto');
    _defineProperty(this, "tabbarInactiveColor", '#d8d8d8');
    _defineProperty(this, "maxModalHeight", Dimensions.get('window').height - 64 - (StatusBar.currentHeight || 0));
    _defineProperty(this, "maxWidth", Dimensions.get("window").width);
    //rippleColor
    _defineProperty(this, "rippleColor", this.transparent);
    // page
    _defineProperty(this, "pageContentBgColor", this.defaultColorE);
    // common widget color
    _defineProperty(this, "widgetHeaderBgColor", this.defaultColorF);
    _defineProperty(this, "widgetHeaderTextColor", this.defaultColor3);
    _defineProperty(this, "widgetActiveHeaderBgColor", this.primaryColor);
    _defineProperty(this, "widgetActiveHeaderTextColor", this.primaryContrastColor);
    _defineProperty(this, "widgetBorderColor", this.defaultColorC);
    _defineProperty(this, "widgetBgColor", this.defaultColorF);
    //App Navbar
    _defineProperty(this, "titleBadgeBackgroundColor", Color('#151420').fade(0.8).rgb().toString());
    _defineProperty(this, "titleBadgeTextColor", '#151420');
    // Navbar variables
    _defineProperty(this, "navbarBackgroundColor", this.defaultColorF);
    _defineProperty(this, "navbarBorderColor", this.widgetBorderColor);
    _defineProperty(this, "navbarTextColor", '#151420');
    _defineProperty(this, "navbarIconSize", 32);
    _defineProperty(this, "navbarFontSize", 24);
    _defineProperty(this, "navbarImageSize", 32);
    _defineProperty(this, "navbarCaretColor", this.primaryColor);
    _defineProperty(this, "navitemChildBackgroundColor", this.primaryContrastColor);
    _defineProperty(this, "navitemChildTextColor", this.primaryColor);
    _defineProperty(this, "navitemChildIconColor", this.primaryColor);
    _defineProperty(this, "navitemActiveBackgroundColor", this.primaryColor);
    _defineProperty(this, "navitemActiveTextColor", this.primaryContrastColor);
    _defineProperty(this, "navitemActiveIconColor", this.navitemActiveTextColor);
    //Anchor variables
    _defineProperty(this, "linkDefaultColor", this.defaultTextColor);
    _defineProperty(this, "linkPrimaryColor", this.primaryColor);
    _defineProperty(this, "linkSecondaryColor", this.secondaryColor);
    _defineProperty(this, "linkSuccessColor", this.successColor);
    _defineProperty(this, "linkInfoColor", this.infoColor);
    _defineProperty(this, "linkWarningColor", this.warningColor);
    _defineProperty(this, "linkDangerColor", this.dangerColor);
    _defineProperty(this, "linkLightColor", this.lightColor);
    _defineProperty(this, "linkDarkColor", this.darkColor);
    _defineProperty(this, "anchorTextPadding", 2);
    //Grid Layout variables
    _defineProperty(this, "layoutGridBgColor", this.widgetBgColor);
    _defineProperty(this, "layoutGridBorderColor", this.widgetBorderColor);
    _defineProperty(this, "layoutGridStripColor1", Color(this.primaryColor).lighten(0.9).rgb().toString());
    _defineProperty(this, "layoutGridHeaderBgColor", this.widgetHeaderBgColor);
    _defineProperty(this, "layoutGridHeaderTextColor", this.widgetHeaderTextColor);
    _defineProperty(this, "layoutGridStripColor2", this.transparent);
    _defineProperty(this, "gridColumnBorderColor", this.widgetBorderColor);
    //Spinner Variables
    _defineProperty(this, "spinnerIconColor", this.primaryColor);
    //tabbar variables
    _defineProperty(this, "tabbarBackgroundColor", this.primaryContrastColor);
    _defineProperty(this, "tabbarTextColor", 'var(--tabbarInactiveColor)');
    _defineProperty(this, "tabbarIconColor", 'var(--tabbarInactiveColor)');
    _defineProperty(this, "tabShadowColor", this.defaultColor);
    _defineProperty(this, "tabActiveBackgroundColor", this.primaryColor3);
    _defineProperty(this, "tabActiveIconColor", this.primaryColor);
    _defineProperty(this, "tabLabelTextColor", this.primaryColor);
    _defineProperty(this, "centerHubItemColor", 'var(--primaryColor)');
    _defineProperty(this, "centerHubIconColor", 'var(--defaultColorF)');
    _defineProperty(this, "centerHubLabelColor", 'var(--defaultColorF)');
    // tab variables
    _defineProperty(this, "tabHeaderBgColor", this.widgetBgColor);
    _defineProperty(this, "tabHeaderTextColor", this.defaultColorA);
    _defineProperty(this, "tabHeaderIconColor", this.defaultColorA);
    _defineProperty(this, "tabActiveHeaderBgColor", this.defaultColorF);
    _defineProperty(this, "tabActiveHeaderTextColor", this.primaryColor);
    _defineProperty(this, "tabActiveIndicatorBgColor", this.primaryColor);
    _defineProperty(this, "tabActiveHeaderIconColor", this.primaryColor);
    _defineProperty(this, "tabBorderColor", this.widgetBorderColor);
    _defineProperty(this, "tabContentBgColor", this.widgetBgColor);
    _defineProperty(this, "tabArrowIndicatorBgColor", this.tabContentBgColor);
    _defineProperty(this, "tabArrowIndicatorDotColor", this.primaryColor);
    //label Variables
    _defineProperty(this, "labelHeaderColor", '#151420');
    _defineProperty(this, "labelDefaultColor", this.defaultColor8);
    _defineProperty(this, "labelDefaultContrastColor", this.defaultColorF);
    _defineProperty(this, "labelDangerColor", this.dangerColor);
    _defineProperty(this, "labelDangerContrastColor", this.dangerContrastColor);
    _defineProperty(this, "labelInfoColor", this.infoColor);
    _defineProperty(this, "labelInfoContrastColor", this.infoContrastColor);
    _defineProperty(this, "labelPrimaryColor", this.primaryColor);
    _defineProperty(this, "labelPrimaryContrastColor", this.primaryContrastColor);
    _defineProperty(this, "labelSuccessColor", this.successColor);
    _defineProperty(this, "labelSuccessContrastColor", this.successContrastColor);
    _defineProperty(this, "labelWarningColor", this.warningColor);
    _defineProperty(this, "labelWarningContrastColor", this.warningContrastColor);
    _defineProperty(this, "labelTextSuccessColor", this.successColor);
    _defineProperty(this, "labelTextDangerColor", this.dangerColor);
    _defineProperty(this, "labelTextInfoColor", this.infoColor);
    _defineProperty(this, "labelTextMutedColor", this.muteColor);
    _defineProperty(this, "labelTextPrimaryColor", this.primaryColor);
    _defineProperty(this, "labelTextWarningColor", this.warningColor);
    _defineProperty(this, "labelAsteriskColor", this.dangerColor);
    //List
    _defineProperty(this, "listHeaderBgColor", this.widgetHeaderBgColor);
    _defineProperty(this, "listTitleColor", this.widgetHeaderTextColor);
    _defineProperty(this, "listSubTitleColor", this.defaultColor6);
    _defineProperty(this, "listDividerColor", this.widgetBorderColor);
    _defineProperty(this, "itemBgColor", this.defaultColorF);
    _defineProperty(this, "selectedItemBorderColor", this.primaryColor);
    //button Variables
    _defineProperty(this, "buttonBorderColor", this.widgetBorderColor);
    _defineProperty(this, "buttonBadgeBackgroundColor", this.badgeColor);
    _defineProperty(this, "buttonBadgeTextColor", this.badgeContrastColor);
    _defineProperty(this, "buttonTextPadding", 2);
    _defineProperty(this, "buttonSuccessColor", this.successColor);
    _defineProperty(this, "buttonDefaultColor", this.defaultColorF);
    _defineProperty(this, "buttonPrimaryColor", this.primaryColor);
    _defineProperty(this, "buttonSecondaryColor", this.defaultColorF);
    _defineProperty(this, "buttonDangerColor", this.dangerColor);
    _defineProperty(this, "buttonWarningColor", this.warningColor);
    _defineProperty(this, "buttonInfoColor", this.infoColor);
    _defineProperty(this, "buttonSuccessTextColor", this.successContrastColor);
    _defineProperty(this, "buttonDefaultTextColor", this.defaultTextColor);
    _defineProperty(this, "buttonPrimaryTextColor", this.primaryContrastColor);
    _defineProperty(this, "buttonSecondaryTextColor", this.primaryColor);
    _defineProperty(this, "buttonDangerTextColor", this.dangerContrastColor);
    _defineProperty(this, "buttonWarningTextColor", this.warningContrastColor);
    _defineProperty(this, "buttonInfoTextColor", this.infoContrastColor);
    _defineProperty(this, "buttonLinkColor", this.transparent);
    _defineProperty(this, "buttonLinkTextColor", this.primaryColor);
    _defineProperty(this, "buttonDarkColor", this.darkColor);
    _defineProperty(this, "buttonDarkTextColor", this.lightColor);
    _defineProperty(this, "buttonLightColor", this.lightColor);
    _defineProperty(this, "buttonLightTextColor", this.darkColor);
    _defineProperty(this, "buttonGrpBorderColor", this.widgetBorderColor);
    _defineProperty(this, "buttonGrpBgColor", this.defaultColorF);
    //picture variables
    _defineProperty(this, "pictureThumbBgColor", this.defaultColorF);
    _defineProperty(this, "pictureThumbBorderColor", this.defaultColorD);
    //input variables
    _defineProperty(this, "inputTextColor", this.defaultTextColor);
    _defineProperty(this, "inputBorderColor", this.defaultColorD);
    _defineProperty(this, "inputBackgroundColor", this.defaultColorF);
    _defineProperty(this, "inputDisabledBgColor", '#f6f6f6');
    _defineProperty(this, "inputFocusBorderColor", this.primaryColor);
    _defineProperty(this, "inputInvalidBorderColor", this.dangerColor);
    _defineProperty(this, "inputPlaceholderColor", this.defaultColorB);
    //floating label
    _defineProperty(this, "floatingLabelColor", 'var(--inputPlaceholderColor)');
    _defineProperty(this, "activeFloatingLabelColor", 'var(--primaryColor)');
    //slider variables
    _defineProperty(this, "minimumTrackTintColor", this.primaryColor);
    _defineProperty(this, "maximumTrackTintColor", this.widgetHeaderBgColor);
    _defineProperty(this, "thumbTintColor", this.primaryColor);
    //rating color
    _defineProperty(this, "ratingIconColor", this.defaultColorA);
    _defineProperty(this, "ratingSelectedIconColor", '#eb8600');
    //toggle variables
    _defineProperty(this, "toggleOnColor", Color(this.primaryColor).lighten(0.4).rgb().toString());
    _defineProperty(this, "toggleOffColor", this.defaultColorB);
    _defineProperty(this, "toggleHandleColor", this.primaryColor);
    _defineProperty(this, "toggleHandleDisableColor", this.defaultColorA);
    _defineProperty(this, "toggleOffBorderColor", this.defaultColorB);
    _defineProperty(this, "toggleUnselectedTrackbgColor", this.defaultColorC);
    // radioset, checkboxset variables
    _defineProperty(this, "groupHeadingBgColor", 'var(--transparent)');
    _defineProperty(this, "checkedColor", 'var(--primaryColor)');
    _defineProperty(this, "checkedDisabledColor", 'var(--defaultColorA)');
    _defineProperty(this, "checkedEnabledColor", 'var(--defaultColorF)');
    _defineProperty(this, "checkboxBorderColor", 'var(--defaultColor9)');
    _defineProperty(this, "checkedBgColor", 'var(--primaryColor)');
    _defineProperty(this, "uncheckedBgColor", 'var(--transparent)');
    _defineProperty(this, "checkedIconColor", 'var(--defaultColorF)');
    _defineProperty(this, "checkedBorderColor", 'var(--primaryColor)');
    _defineProperty(this, "uncheckedBorderColor", 'var(--defaultColor9)');
    //form
    _defineProperty(this, "formBorderColor", this.widgetBorderColor);
    _defineProperty(this, "formTitleColor", this.defaultTextColor);
    _defineProperty(this, "formSubTitleColor", this.defaultColor6);
    //dialog
    _defineProperty(this, "dialogBackgroundColor", this.widgetBgColor);
    _defineProperty(this, "dialogBorderColor", this.widgetBorderColor);
    _defineProperty(this, "dialogCloseIconColor", this.defaultColorA);
    _defineProperty(this, "dialogLabelColor", this.defaultColor3);
    _defineProperty(this, "dialogIconColor", this.defaultColor4);
    _defineProperty(this, "dialogSupportingTextColor", this.defaultColor1);
    //alert dialog
    _defineProperty(this, "alertMessageColor", this.defaultColor8);
    _defineProperty(this, "badgeTextColor", this.defaultColorF);
    //popover
    _defineProperty(this, "popoverBackgroundColor", this.defaultColorF);
    _defineProperty(this, "popoverTitleBackgroundColor", this.defaultColorD);
    _defineProperty(this, "popoverTitleColor", this.defaultColor1);
    //menu
    _defineProperty(this, "menuIconColor", this.defaultColor6);
    _defineProperty(this, "menuTextColor", this.defaultColor6);
    _defineProperty(this, "menuBackgroundColor", this.popoverBackgroundColor);
    _defineProperty(this, "menuItemBorderColor", this.widgetBorderColor);
    _defineProperty(this, "menuItemIconColor", this.defaultColor6);
    _defineProperty(this, "menuItemTextColor", this.defaultColor6);
    //tile Variables
    _defineProperty(this, "tileDangerColor", this.dangerColor);
    _defineProperty(this, "tileInfoColor", this.infoColor);
    _defineProperty(this, "tilePrimaryColor", this.primaryColor);
    _defineProperty(this, "tileSuccessColor", this.successColor);
    _defineProperty(this, "tileWarningColor", this.warningColor);
    _defineProperty(this, "tileWellbgColor", this.defaultColorF);
    _defineProperty(this, "tileWellBorderColor", this.defaultColorE);
    _defineProperty(this, "tilePrimaryTextColor", this.primaryContrastColor);
    //switch
    _defineProperty(this, "switchBgColor", this.widgetBgColor);
    _defineProperty(this, "switchTextColor", this.defaultTextColor);
    _defineProperty(this, "switchActiveBgColor", this.primaryColor);
    _defineProperty(this, "switchActiveTextColor", this.primaryContrastColor);
    _defineProperty(this, "switchBorderColor", this.widgetBorderColor);
    //message
    _defineProperty(this, "messageSuccessColor", this.successColor);
    _defineProperty(this, "messageErrorColor", this.dangerColor);
    _defineProperty(this, "messageWarningColor", this.warningColor);
    _defineProperty(this, "messageInfoColor", this.infoColor);
    _defineProperty(this, "messageLoadingColor", this.infoColor);
    //panel
    _defineProperty(this, "panelBgColor", this.widgetBgColor);
    _defineProperty(this, "panelHeaderBgColor", this.widgetHeaderBgColor);
    _defineProperty(this, "panelHeaderTextColor", this.widgetHeaderTextColor);
    _defineProperty(this, "panelFooterColor", this.defaultColorD);
    _defineProperty(this, "panelBorderColor", this.widgetBorderColor);
    _defineProperty(this, "panelDangerColor", this.dangerColor);
    _defineProperty(this, "panelDefaultColor", this.defaultColor);
    _defineProperty(this, "panelInfoColor", this.infoColor);
    _defineProperty(this, "panelPrimaryColor", this.primaryColor);
    _defineProperty(this, "panelSuccessColor", this.successColor);
    _defineProperty(this, "panelWarningColor", this.warningColor);
    _defineProperty(this, "panelTextColor", this.defaultColorF);
    //card
    _defineProperty(this, "cardHeaderBgColor", this.defaultColorD);
    _defineProperty(this, "cardBgColor", this.widgetBgColor);
    _defineProperty(this, "cardTitleColor", this.listTitleColor);
    _defineProperty(this, "cardShadowColor", this.defaultColor);
    _defineProperty(this, "cardSubTitleColor", this.listSubTitleColor);
    _defineProperty(this, "cardBorderColor", this.defaultColorD);
    _defineProperty(this, "cardContentBgColor", this.defaultColorF);
    _defineProperty(this, "cardFooterBgColor", this.defaultColorF);
    _defineProperty(this, "cardFooterBorderColor", this.defaultColorD);
    //progress bar
    _defineProperty(this, "progressBarDefaultColor", this.primaryColor);
    _defineProperty(this, "progressBarTrackColor", this.defaultColorD);
    _defineProperty(this, "progressBarSuccessColor", this.successColor);
    _defineProperty(this, "progressBarDangerColor", this.dangerColor);
    _defineProperty(this, "progressBarInfoColor", this.infoColor);
    _defineProperty(this, "progressBarWarningColor", this.warningColor);
    //progress circle
    _defineProperty(this, "progressCircleDefaultColor", this.primaryColor);
    _defineProperty(this, "progressCircleSuccessColor", this.successColor);
    _defineProperty(this, "progressCircleDangerColor", this.dangerColor);
    _defineProperty(this, "progressCircleInfoColor", this.infoColor);
    _defineProperty(this, "progressCircleWarningColor", this.warningColor);
    //container
    _defineProperty(this, "containerOutlineColor", this.defaultColorC);
    //accordion
    _defineProperty(this, "accordionBgColor", this.widgetBgColor);
    _defineProperty(this, "accordionTitleColor", this.widgetHeaderTextColor);
    _defineProperty(this, "accordionHeaderBgColor", this.defaultColorF);
    _defineProperty(this, "accordionIconColor", this.defaultColorB);
    _defineProperty(this, "accordionActiveIconColor", this.defaultColorF);
    _defineProperty(this, "accordionActiveHeaderBgColor", this.widgetActiveHeaderBgColor);
    _defineProperty(this, "accordionActiveHeaderTextColor", this.widgetActiveHeaderTextColor);
    _defineProperty(this, "accordionBorderColor", this.defaultColorE);
    _defineProperty(this, "accordionPaneBgColor", this.defaultColorF);
    //carousel
    _defineProperty(this, "carouselPrevBtnColor", this.defaultColorF);
    _defineProperty(this, "carouselPrevBgColor", Color(this.defaultColorF).fade(0.6).rgb().toString());
    _defineProperty(this, "carouselNextBtnColor", this.defaultColorF);
    _defineProperty(this, "carouselNextBgColor", Color(this.defaultColorF).fade(0.6).rgb().toString());
    _defineProperty(this, "carouselDotWrapperBgColor", this.transparent);
    _defineProperty(this, "carouselDotColor", this.defaultColorF);
    _defineProperty(this, "carouselActiveDotColor", this.defaultColorF);
    //calendar
    _defineProperty(this, "calendarBgColor", this.defaultColorF);
    _defineProperty(this, "calendarHeaderBgColor", this.defaultColorF);
    _defineProperty(this, "calendarHeaderTextColor", this.defaultTextColor);
    _defineProperty(this, "calendarWeekDayTextColor", this.defaultColorA);
    _defineProperty(this, "calendarDateColor", this.defaultColor);
    _defineProperty(this, "calendarNotCurrentMonthDateColor", this.defaultColor6);
    _defineProperty(this, "calendarHeaderColor", this.defaultColorF);
    _defineProperty(this, "calendarPrevYearIconColor", this.defaultColorA);
    _defineProperty(this, "calendarNextYearIconColor", this.defaultColorA);
    _defineProperty(this, "calendarPrevMonthIconColor", this.defaultColorA);
    _defineProperty(this, "calendarNextMonthIconColor", this.defaultColorA);
    _defineProperty(this, "calendarDayBgColor", this.defaultColor);
    _defineProperty(this, "calendarSelectedDayBgColor", this.primaryColor);
    _defineProperty(this, "calendarSelectedDayTextColor", this.defaultColorF);
    _defineProperty(this, "calendarTodayBgColor", this.defaultColorE);
    _defineProperty(this, "calendarEventDay1Color", this.primaryColor1);
    _defineProperty(this, "calendarEventDay2Color", this.primaryColor2);
    _defineProperty(this, "calendarEventDay3Color", this.primaryColor3);
    //date picker
    _defineProperty(this, "datepickerBgColor", this.defaultColorF);
    //wizard
    _defineProperty(this, "wizardBackgroundColor", this.widgetBgColor);
    _defineProperty(this, "wizardStepActiveColor", this.primaryColor);
    _defineProperty(this, "wizardStepDoneColor", this.successColor);
    _defineProperty(this, "wizardStepDoneTextColor", this.defaultColorF);
    _defineProperty(this, "wizardStepIconColor", this.defaultColor9);
    _defineProperty(this, "wizardStepColor", this.defaultColor9);
    _defineProperty(this, "wizardActiveStepColor", this.defaultColorF);
    _defineProperty(this, "wizardDoneStepColor", this.defaultColorF);
    _defineProperty(this, "wizardStepTitleColor", this.defaultColorA);
    _defineProperty(this, "wizardNextBtnColor", this.primaryColor);
    _defineProperty(this, "wizardDoneBtnColor", this.successColor);
    _defineProperty(this, "wizardStepConnectorColor", this.defaultColorE);
    _defineProperty(this, "wizardStepCounerColor", this.defaultColor9);
    _defineProperty(this, "wizardBorderColor", this.widgetBorderColor);
    //Search
    _defineProperty(this, "searchBorderColor", this.defaultColorD);
    _defineProperty(this, "searchButtonColor", this.primaryColor);
    _defineProperty(this, "searchButtonTextColor", this.primaryContrastColor);
    _defineProperty(this, "searchItemBorderColor", this.defaultColorD);
    _defineProperty(this, "searchItemTextColor", this.defaultColor6);
    _defineProperty(this, "searchDropdownBackgroundColor", this.defaultColorF);
    _defineProperty(this, "searchDataCompleteItemBgColor", this.defaultColorE);
    _defineProperty(this, "searchBgContainerColor", this.defaultColorD);
    //Select
    _defineProperty(this, "selectBorderColor", this.defaultColorD);
    _defineProperty(this, "selecttemBorderColor", this.defaultColorD);
    _defineProperty(this, "selectItemTextColor", this.defaultColor6);
    _defineProperty(this, "selectDropdownBackgroundColor", this.defaultColorF);
    //Chip
    _defineProperty(this, "chipActiveTextColor", this.defaultColorF);
    _defineProperty(this, "chipDefaultTextColor", this.defaultColorA);
    _defineProperty(this, "chipborderColor", this.defaultColorD);
    _defineProperty(this, "chipContainerColor", this.defaultColorF);
    _defineProperty(this, "chipIconColor", this.primaryColor);
    _defineProperty(this, "chipSelectedOutlineColor", this.defaultColor6);
    _defineProperty(this, "chipSelectedContainerColor", this.defaultColor7);
    //Login
    _defineProperty(this, "loginErrorMsgColor", this.dangerContrastColor);
    _defineProperty(this, "loginErrorMsgBgColor", this.dangerColor);
    _defineProperty(this, "loginErrorMsgBorderColor", this.dangerColor);
    //camera
    _defineProperty(this, "cameraBgColor", this.defaultColorF);
    _defineProperty(this, "cameraBorderColor", this.widgetBorderColor);
    _defineProperty(this, "cameraTextColor", this.defaultTextColor);
    //barcode-scanner
    _defineProperty(this, "barcodeScannerBgColor", this.defaultColorF);
    _defineProperty(this, "barcodeScannerBorderColor", this.widgetBorderColor);
    _defineProperty(this, "barcodeScannerTextColor", this.defaultTextColor);
    //fileupload
    _defineProperty(this, "fileuploadBgColor", this.defaultColorF);
    _defineProperty(this, "fileuploadBorderColor", this.widgetBorderColor);
    _defineProperty(this, "fileuploadTextColor", this.defaultTextColor);
    //charts
    _defineProperty(this, "chartLabelColor", this.defaultTextColor);
    _defineProperty(this, "chartGraphLinesColor", this.defaultColorC);
    _defineProperty(this, "chartLineColor", this.defaultColor8);
    _defineProperty(this, "chartLegendBorder", this.defaultColor7);
    _defineProperty(this, "chartAxisColor", this.defaultColor5);
    _defineProperty(this, "chartAxisPointColor", this.defaultColor9);
    _defineProperty(this, "chartTitleColor", this.widgetHeaderTextColor);
    _defineProperty(this, "chartSubTitleColor", this.defaultColor6);
    // Network Toast
    _defineProperty(this, "networkToastBgColor", this.defaultColor3);
    _defineProperty(this, "networkToastTextColor", this.defaultColorF);
    _defineProperty(this, "networkToastActionTextColor", this.primaryColor);
    _defineProperty(this, "networkToastActionSeparatorColor", this.networkToastTextColor);
    // Skeleton
    _defineProperty(this, "skeletonBgColor", this.defaultColorE);
    _defineProperty(this, "skeletonAnimatedBgColor", this.defaultColorE);
    _defineProperty(this, "skeletonGradientBgColor", this.defaultColorF);
    _defineProperty(this, "skeletonGradientShadowColor", this.defaultColorF);
    _defineProperty(this, "skeletonGradientForegroundColor", this.transparent);
    // Audio
    _defineProperty(this, "audioPlayerBgColor", this.defaultColorF);
    _defineProperty(this, "audioPlayerFgColor", this.defaultColor3);
    //Tool tip
    _defineProperty(this, "tooltipBgColor", Color("#fff").fade(0.6).rgb().toString());
    _defineProperty(this, "tooltipBorderColor", '#404040');
  }
}
_class = ThemeVariables;
_defineProperty(ThemeVariables, "INSTANCE", new _class());
//# sourceMappingURL=theme.variables.js.map