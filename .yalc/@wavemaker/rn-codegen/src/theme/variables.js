"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ColorProp {
    constructor(dValue, md, mdValue) {
        this.dValue = dValue;
        this.md = md;
        this.mdValue = mdValue;
        this.mdValue = this.mdValue || this.md;
    }
}
const variables = new Map();
variables.set('primaryColor', new ColorProp('#4263eb', '--md-ref-palette-primary40'));
variables.set('primaryColor1', new ColorProp('fade(@primaryColor, 80%)', '--md-ref-palette-primary80'));
variables.set('primaryColor2', new ColorProp('fade(@primaryColor, 60%)', '--md-ref-palette-primary60'));
variables.set('primaryColor3', new ColorProp('fade(@primaryColor, 30%)', '--md-ref-palette-primary30'));
variables.set('primaryContrastColor', new ColorProp('#ffffff', '--md-ref-palette-primary100'));
variables.set('secondaryColor', new ColorProp('#6c757d', '--md-ref-palette-secondary80'));
variables.set('secondaryContrastColor', new ColorProp('#ffffff', '--md-ref-palette-secondary100'));
variables.set('successColor', new ColorProp('#28a745'));
variables.set('successContrastColor', new ColorProp('#ffffff'));
variables.set('infoColor', new ColorProp('#17a2b8'));
variables.set('infoContrastColor', new ColorProp('#ffffff'));
variables.set('warningColor', new ColorProp('#ffc107'));
variables.set('warningContrastColor', new ColorProp('#ffffff'));
variables.set('dangerColor', new ColorProp('#dc3545', '--md-ref-palette-error40'));
variables.set('dangerContrastColor', new ColorProp('#ffffff', '--md-ref-palette-error100'));
variables.set('defaultColor', new ColorProp('#000000', '--md-ref-palette-neutral0'));
variables.set('defaultColor1', new ColorProp('#111111', '--md-ref-palette-neutral05'));
variables.set('defaultColor2', new ColorProp('#222222', '--md-ref-palette-neutral10'));
variables.set('defaultColor3', new ColorProp('#333333', '--md-ref-palette-neutral15'));
variables.set('defaultColor4', new ColorProp('#444444', '--md-ref-palette-neutral20'));
variables.set('defaultColor5', new ColorProp('#555555', '--md-ref-palette-neutral25'));
variables.set('defaultColor6', new ColorProp('#666666', '--md-ref-palette-neutral30'));
variables.set('defaultColor7', new ColorProp('#777777', '--md-ref-palette-neutral40'));
variables.set('defaultColor8', new ColorProp('#888888', '--md-ref-palette-neutral45'));
variables.set('defaultColor9', new ColorProp('#999999', '--md-ref-palette-neutral60'));
variables.set('defaultColorA', new ColorProp('#aaaaaa'));
variables.set('defaultColorB', new ColorProp('#bbbbbb', '--md-ref-palette-neutral80'));
variables.set('defaultColorC', new ColorProp('#cccccc', '--md-ref-palette-neutral85'));
variables.set('defaultColorD', new ColorProp('#dddddd', '--md-ref-palette-neutral90'));
variables.set('defaultColorE', new ColorProp('#eeeeee', '--md-ref-palette-neutral100'));
variables.set('defaultColorF', new ColorProp('#ffffff'));
variables.set('defaultBgColor', new ColorProp('@defaultColorF'));
variables.set('defaultTextColor', new ColorProp('#151420'));
variables.set('lightColor', new ColorProp('@defaultColorF', '--md-sys-color-primary-light'));
variables.set('darkColor', new ColorProp('@defaultColor', '--md-sys-color-primary-dark'));
variables.set('muteColor', new ColorProp('@defaultColorA'));
variables.set('heading1FontSize', new ColorProp(36, '--md-sys-typescale-headline-large-font-size'));
variables.set('heading2FontSize', new ColorProp(30, '--md-sys-typescale-headline-medium-font-size'));
variables.set('heading3FontSize', new ColorProp(24, '--md-sys-typescale-headline-small-font-size'));
variables.set('heading4FontSize', new ColorProp(18));
variables.set('heading5FontSize', new ColorProp(14));
variables.set('heading6FontSize', new ColorProp(12));
variables.set('transparent', new ColorProp('transparent'));
variables.set('badgeColor', new ColorProp('#6c757d', '--md-ref-palette-error40'));
variables.set('badgeContrastColor', new ColorProp('#ffffff'));
//rippleColor
variables.set('rippleColor', new ColorProp('fade(@primaryColor, 70%)', '--md-ref-palette-primary40', 'fade(--md-ref-palette-primary40, 70%)'));
// Page
variables.set('pageContentBgColor', new ColorProp('@defaultColorE', '--md-ref-palette-neutral80'));
// Common Widget Colors
variables.set('widgetHeaderBgColor', new ColorProp('@defaultColorF'));
variables.set('widgetHeaderTextColor', new ColorProp('@defaultColor3', '--md-ref-palette-neutral-variant30'));
variables.set('widgetActiveHeaderBgColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('widgetActiveHeaderTextColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-neutral10'));
variables.set('widgetBorderColor', new ColorProp('@defaultColorC', '--md-ref-palette-neutral-variant90'));
variables.set('widgetBgColor', new ColorProp('@defaultColorF'));
//App Navbar
variables.set('titleBadgeTextColor', new ColorProp('#151420', '--md-ref-palette-neutral-variant30'));
variables.set('titleBadgeBackgroundColor', new ColorProp('fade(@titleBadgeTextColor, 20%)'));
// Navbar variables
variables.set('navbarBackgroundColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('navbarBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant50'));
variables.set('navbarTextColor', new ColorProp('#151420', '--md-ref-palette-neutral-variant30'));
variables.set('navbarIconSize', new ColorProp(24));
variables.set('navbarFontSize', new ColorProp(24));
variables.set('navbarImageSize', new ColorProp(32));
variables.set('navbarCaretColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('navitemChildBackgroundColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-neutral98'));
variables.set('navitemChildTextColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('navitemChildIconColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('navitemActiveBackgroundColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary90'));
variables.set('navitemActiveTextColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-secondary10'));
variables.set('navitemActiveIconColor', new ColorProp('@navitemActiveTextColor', '--md-ref-palette-secondary10'));
// Anchor variables
variables.set('linkDefaultColor', new ColorProp('@defaultTextColor'));
variables.set('linkPrimaryColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('linkSecondaryColor', new ColorProp('@secondaryColor', '--md-ref-palette-secondary80'));
variables.set('linkSuccessColor', new ColorProp('@successColor'));
variables.set('linkInfoColor', new ColorProp('@infoColor'));
variables.set('linkWarningColor', new ColorProp('@warningColor'));
variables.set('linkDangerColor', new ColorProp('@dangerColor', '--md-ref-palette-error40'));
variables.set('linkLightColor', new ColorProp('@lightColor', '--md-sys-color-primary-light'));
variables.set('linkDarkColor', new ColorProp('@darkColor', '--md-sys-color-primary-dark'));
variables.set('anchorTextPadding', new ColorProp(2));
// Grid Layout variables
variables.set('layoutGridBgColor', new ColorProp('@widgetBgColor'));
variables.set('layoutGridBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('layoutGridStripColor1', new ColorProp('fade(@primaryColor, 10%)'));
variables.set('layoutGridHeaderBgColor', new ColorProp('@widgetHeaderBgColor'));
variables.set('layoutGridHeaderTextColor', new ColorProp('@widgetHeaderTextColor'));
variables.set('layoutGridStripColor2', new ColorProp('@transparent'));
variables.set('gridColumnBorderColor', new ColorProp('@widgetBorderColor'));
// Spinner Variables
variables.set('spinnerIconColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
// Tabbar variables
variables.set('tabbarBackgroundColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-neutral98'));
variables.set('tabbarTextColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('tabbarIconColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('tabShadowColor', new ColorProp('@defaultColor', '--md-ref-palette-nuetral10'));
variables.set('tabActiveBackgroundColor', new ColorProp('@secondaryColor', '--md-ref-palette-secondary90'));
variables.set('tabActiveIconColor', new ColorProp('@secondaryColor', '--md-ref-palette-secondary10'));
variables.set('tabLabelTextColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral-variant30'));
variables.set('centerHubItemColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('centerHubIconColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral100'));
variables.set('centerHubLabelColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral100'));
// Tab variables
variables.set('tabHeaderBgColor', new ColorProp('@widgetBgColor', '--md-ref-palette-neutral98'));
variables.set('tabHeaderTextColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('tabHeaderIconColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('tabActiveHeaderBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('tabActiveHeaderTextColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral10'));
variables.set('tabActiveIndicatorBgColor', new ColorProp('@primaryColor'));
variables.set('tabActiveHeaderIconColor', new ColorProp('@primaryColor', '--md-ref-palette-neutral10'));
variables.set('tabBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant90'));
variables.set('tabContentBgColor', new ColorProp('@widgetBgColor'));
variables.set('tabArrowIndicatorBgColor', new ColorProp('@tabContentBgColor', '--md-ref-palette-primary40'));
variables.set('tabArrowIndicatorDotColor', new ColorProp('@primaryColor'));
// Label Variables
variables.set('labelHeaderColor', new ColorProp('#151420'));
variables.set('labelDefaultColor', new ColorProp('@defaultColor8'));
variables.set('labelDefaultContrastColor', new ColorProp('@defaultColorF'));
variables.set('labelDangerColor', new ColorProp('@dangerColor', '--md-ref-palette-error40'));
variables.set('labelDangerContrastColor', new ColorProp('@dangerContrastColor', '--md-ref-palette-error100'));
variables.set('labelInfoColor', new ColorProp('@infoColor'));
variables.set('labelInfoContrastColor', new ColorProp('@infoContrastColor'));
variables.set('labelPrimaryColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('labelPrimaryContrastColor', new ColorProp('@primaryContrastColor', '--md-sys-color-surface-light'));
variables.set('labelSuccessColor', new ColorProp('@successColor'));
variables.set('labelSuccessContrastColor', new ColorProp('@successContrastColor'));
variables.set('labelWarningColor', new ColorProp('@warningColor'));
variables.set('labelWarningContrastColor', new ColorProp('@warningContrastColor'));
variables.set('labelTextSuccessColor', new ColorProp('@successColor'));
variables.set('labelTextDangerColor', new ColorProp('@dangerColor', '-md-ref-palette-error40'));
variables.set('labelTextInfoColor', new ColorProp('@infoColor'));
variables.set('labelTextMutedColor', new ColorProp('@muteColor'));
variables.set('labelTextPrimaryColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('labelTextWarningColor', new ColorProp('@warningColor'));
variables.set('labelAsteriskColor', new ColorProp('@dangerColor'));
// List
variables.set('listHeaderBgColor', new ColorProp('@widgetHeaderBgColor', '--md-ref-palette-neutral98'));
variables.set('listTitleColor', new ColorProp('@widgetHeaderTextColor', '--md-ref-palette-neutral10'));
variables.set('listSubTitleColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral-variant30'));
variables.set('listDividerColor', new ColorProp('@widgetBorderColor'));
variables.set('itemBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('selectedItemBorderColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
// Button Variables
variables.set('buttonBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant50'));
variables.set('buttonBadgeBackgroundColor', new ColorProp('@badgeColor'));
variables.set('buttonBadgeTextColor', new ColorProp('@badgeContrastColor'));
variables.set('buttonTextPadding', new ColorProp('2px'));
variables.set('buttonSuccessColor', new ColorProp('@successColor'));
variables.set('buttonDefaultColor', new ColorProp('@defaultColorF'));
variables.set('buttonPrimaryColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('buttonSecondaryColor', new ColorProp('@defaultColorF', '--md-ref-palette-secondary90'));
variables.set('buttonDangerColor', new ColorProp('@dangerColor'));
variables.set('buttonWarningColor', new ColorProp('@warningColor'));
variables.set('buttonInfoColor', new ColorProp('@infoColor'));
variables.set('buttonSuccessTextColor', new ColorProp('@successContrastColor'));
variables.set('buttonDefaultTextColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('buttonPrimaryTextColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-primary100'));
variables.set('buttonSecondaryTextColor', new ColorProp('@secondaryColor', '--md-ref-palette-secondary10'));
variables.set('buttonDangerTextColor', new ColorProp('@dangerContrastColor'));
variables.set('buttonWarningTextColor', new ColorProp('@warningContrastColor'));
variables.set('buttonInfoTextColor', new ColorProp('@infoContrastColor'));
variables.set('buttonLinkColor', new ColorProp('transparent'));
variables.set('buttonLinkTextColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('buttonDarkColor', new ColorProp('@darkColor'));
variables.set('buttonDarkTextColor', new ColorProp('@lightColor'));
variables.set('buttonLightColor', new ColorProp('@lightColor'));
variables.set('buttonLightTextColor', new ColorProp('@darkColor'));
variables.set('buttonGrpBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant50'));
variables.set('buttonGrpBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
// Picture Variables
variables.set('pictureThumbBgColor', new ColorProp('@defaultColorF'));
variables.set('pictureThumbBorderColor', new ColorProp('@defaultColorD'));
// Input Variables
variables.set('inputTextColor', new ColorProp('@defaultTextColor'));
variables.set('inputBorderColor', new ColorProp('@defaultColorD'));
variables.set('inputBackgroundColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('inputFocusBorderColor', new ColorProp('@primaryColor'));
variables.set('inputInvalidBorderColor', new ColorProp('@dangerColor'));
variables.set('inputPlaceholderColor', new ColorProp('@defaultColorB', '--md-ref-palette-neutral10'));
//floating label
variables.set('floatingLabelColor', new ColorProp('@inputPlaceholderColor'));
variables.set('activeFloatingLabelColor', new ColorProp('@primaryColor'));
// Slider Variables
variables.set('minimumTrackTintColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('maximumTrackTintColor', new ColorProp('@widgetHeaderBgColor', '--md-ref-palette-neutral90'));
variables.set('thumbTintColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
// Rating Color
variables.set('ratingIconColor', new ColorProp('@defaultColorA'));
variables.set('ratingSelectedIconColor', new ColorProp('#eb8600'));
// Toggle Variables
variables.set('toggleOnColor', new ColorProp('fade(@primaryColor, 40%)', '--md-ref-palette-primary40'));
variables.set('toggleOffColor', new ColorProp('@defaultColorB', '--md-ref-palette-neutral90'));
variables.set('toggleHandleColor', new ColorProp('@primaryColor', '--md-ref-palette-primary100'));
variables.set('toggleHandleDisableColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral50'));
variables.set('toggleOffBorderColor', new ColorProp('@defaultColorB', '--md-ref-palette-neutral-variant50'));
// Radioset and Checkboxset Variables
variables.set('groupHeadingBgColor', new ColorProp('@transparent'));
variables.set('checkedColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('checkedDisabledColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('checkedEnabledColor', new ColorProp('@defaultColorF'));
variables.set('checkboxBorderColor', new ColorProp('@defaultColor9'));
variables.set('checkedBgColor', new ColorProp('@checkedColor'));
variables.set('uncheckedBgColor', new ColorProp('@transparent'));
variables.set('checkedIconColor', new ColorProp('@defaultColorF'));
variables.set('checkedBorderColor', new ColorProp('@primaryColor'));
variables.set('uncheckedBorderColor', new ColorProp('@defaultColor9'));
// Form
variables.set('formBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('formTitleColor', new ColorProp('@defaultTextColor'));
variables.set('formSubTitleColor', new ColorProp('@defaultColor6'));
// Dialog
variables.set('dialogBackgroundColor', new ColorProp('@widgetBgColor', '--md-ref-palette-neutral90'));
variables.set('dialogBorderColor', new ColorProp('@widgetBorderColor', '--md-sys-color-outline-variant-light'));
variables.set('dialogCloseIconColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral10'));
variables.set('dialogLabelColor', new ColorProp('@defaultColor3', '--md-ref-palette-neutral10'));
variables.set('dialogIconColor', new ColorProp('@defaultColor4', '--md-ref-palette-neutral-variant30'));
variables.set('dialogSupportingTextColor', new ColorProp('@defaultColor1', '--md-ref-palette-neutral-variant30'));
// Alert Dialog
variables.set('alertMessageColor', new ColorProp('@defaultColor8'));
// Badge Text Color
variables.set('badgeTextColor', new ColorProp('@defaultColorF'));
// Popover
variables.set('popoverBackgroundColor', new ColorProp('@defaultColorF'));
variables.set('popoverTitleBackgroundColor', new ColorProp('@defaultColorD'));
variables.set('popoverTitleColor', new ColorProp('@defaultColor1'));
// Menu
variables.set('menuIconColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral-variant30'));
variables.set('menuTextColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral10'));
variables.set('menuBackgroundColor', new ColorProp('@popoverBackgroundColor', '--md-ref-palette-neutral98'));
variables.set('menuItemBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant90'));
variables.set('menuItemIconColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral-variant30'));
variables.set('menuItemTextColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral10'));
// Tile Variables
variables.set('tileDangerColor', new ColorProp('@dangerColor'));
variables.set('tileInfoColor', new ColorProp('@infoColor'));
variables.set('tilePrimaryColor', new ColorProp('@primaryColor'));
variables.set('tileSuccessColor', new ColorProp('@successColor'));
variables.set('tileWarningColor', new ColorProp('@warningColor'));
variables.set('tileWellbgColor', new ColorProp('@defaultColorF'));
variables.set('tileWellBorderColor', new ColorProp('@defaultColorE'));
variables.set('tilePrimaryTextColor', new ColorProp('@primaryContrastColor'));
// Switch
variables.set('switchBgColor', new ColorProp('@widgetBgColor'));
variables.set('switchTextColor', new ColorProp('@defaultTextColor', '--md-ref-palette-neutral10'));
variables.set('switchActiveBgColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary90'));
variables.set('switchActiveTextColor', new ColorProp('@primaryContrastColor', '--md-ref-palette-secondary10'));
variables.set('switchBorderColor', new ColorProp('@widgetBorderColor', '--md-ref-palette-neutral-variant50'));
// Message
variables.set('messageSuccessColor', new ColorProp('@successColor'));
variables.set('messageErrorColor', new ColorProp('@dangerColor'));
variables.set('messageWarningColor', new ColorProp('@warningColor'));
variables.set('messageInfoColor', new ColorProp('@infoColor'));
variables.set('messageLoadingColor', new ColorProp('@infoColor'));
// Panel
variables.set('panelBgColor', new ColorProp('@widgetBgColor', '--md-ref-palette-neutral98'));
variables.set('panelHeaderBgColor', new ColorProp('@widgetHeaderBgColor', '--md-ref-palette-secondary90'));
variables.set('panelHeaderTextColor', new ColorProp('@widgetHeaderTextColor'));
variables.set('panelFooterColor', new ColorProp('@defaultColorD', '--md-ref-palette-secondary90'));
variables.set('panelBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('panelDangerColor', new ColorProp('@dangerColor'));
variables.set('panelDefaultColor', new ColorProp('@defaultColor'));
variables.set('panelInfoColor', new ColorProp('@infoColor'));
variables.set('panelPrimaryColor', new ColorProp('@primaryColor'));
variables.set('panelSuccessColor', new ColorProp('@successColor'));
variables.set('panelWarningColor', new ColorProp('@warningColor'));
variables.set('panelTextColor', new ColorProp('@defaultColorF'));
// Card
variables.set('cardHeaderBgColor', new ColorProp('@defaultColorD', '--md-ref-palette-neutral98'));
variables.set('cardBgColor', new ColorProp('@widgetBgColor', '--md-ref-palette-neutral98'));
variables.set('cardTitleColor', new ColorProp('@listTitleColor', '--md-ref-palette-neutral10'));
variables.set('cardShadowColor', new ColorProp('@defaultColor', '--md-ref-palette-neutral40'));
variables.set('cardSubTitleColor', new ColorProp('@listSubTitleColor', '--md-ref-palette-neutral-variant30'));
variables.set('cardBorderColor', new ColorProp('@defaultColorD'));
variables.set('cardContentBgColor', new ColorProp('@defaultColorF'));
variables.set('cardFooterBgColor', new ColorProp('@defaultColorF'));
variables.set('cardFooterBorderColor', new ColorProp('@defaultColorD'));
// Progress Bar
variables.set('progressBarDefaultColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('progressBarSuccessColor', new ColorProp('@successColor'));
variables.set('progressBarDangerColor', new ColorProp('@dangerColor', '--md-ref-palette-error40'));
variables.set('progressBarInfoColor', new ColorProp('@infoColor'));
variables.set('progressBarWarningColor', new ColorProp('@warningColor'));
variables.set('progressBarTrackColor', new ColorProp('@defaultColorD', '--md-ref-palette-neutral90'));
// Progress Circle
variables.set('progressCircleDefaultColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('progressCircleSuccessColor', new ColorProp('@successColor'));
variables.set('progressCircleDangerColor', new ColorProp('@dangerColor', '--md-ref-palette-error40'));
variables.set('progressCircleInfoColor', new ColorProp('@infoColor'));
variables.set('progressCircleWarningColor', new ColorProp('@warningColor'));
// Container
variables.set('containerOutlineColor', new ColorProp('@defaultColorC'));
// Accordion
variables.set('accordionBgColor', new ColorProp('@widgetBgColor', '--md-ref-palette-neutral98'));
variables.set('accordionTitleColor', new ColorProp('@widgetHeaderTextColor', '--md-ref-palette-neutral-variant30'));
variables.set('accordionHeaderBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('accordionIconColor', new ColorProp('@defaultColorB', '--md-ref-palette-neutral-variant30'));
variables.set('accordionActiveIconColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral10'));
variables.set('accordionActiveHeaderBgColor', new ColorProp('@widgetActiveHeaderBgColor', '--md-ref-palette-neutral98'));
variables.set('accordionActiveHeaderTextColor', new ColorProp('@widgetActiveHeaderTextColor', '--md-ref-palette-neutral10'));
variables.set('accordionBorderColor', new ColorProp('@defaultColorE', '--md-ref-palette-neutral-variant90'));
variables.set('accordionPaneBgColor', new ColorProp('@defaultColorF'));
// Carousel
variables.set('carouselPrevBtnColor', new ColorProp('@defaultColorF'));
variables.set('carouselPrevBgColor', new ColorProp('fade(@defaultColorF, 40%)'));
variables.set('carouselNextBtnColor', new ColorProp('@defaultColorF', ''));
variables.set('carouselNextBgColor', new ColorProp('fade(@defaultColorF, 40%)'));
variables.set('carouselDotWrapperBgColor', new ColorProp('@transparent'));
variables.set('carouselDotColor', new ColorProp('@defaultColorF'));
variables.set('carouselActiveDotColor', new ColorProp('@defaultColorF'));
// Calendar
variables.set('calendarBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral90'));
variables.set('calendarHeaderBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral90'));
variables.set('calendarHeaderTextColor', new ColorProp('@defaultTextColor'));
variables.set('calendarWeekDayTextColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral10'));
variables.set('calendarDateColor', new ColorProp('@defaultColor', '--md-ref-palette-neutral10'));
variables.set('calendarNotCurrentMonthDateColor', new ColorProp('@defaultColor6', '--md-ref-palette-neutral-variant30'));
variables.set('calendarHeaderColor', new ColorProp('@defaultColorF'));
variables.set('calendarPrevYearIconColor', new ColorProp('@defaultColorA'));
variables.set('calendarNextYearIconColor', new ColorProp('@defaultColorA'));
variables.set('calendarPrevMonthIconColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('calendarNextMonthIconColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('calendarDayBgColor', new ColorProp('@defaultColor'));
variables.set('calendarSelectedDayBgColor', new ColorProp('@primaryColor', '--md-ref-palette-primary40'));
variables.set('calendarSelectedDayTextColor', new ColorProp('@defaultColorF', '--md-ref-palette-primary100'));
variables.set('calendarTodayBgColor', new ColorProp('@defaultColorF'));
variables.set('calendarEventDay1Color', new ColorProp('@primaryColor1'));
variables.set('calendarEventDay2Color', new ColorProp('@primaryColor2'));
variables.set('calendarEventDay3Color', new ColorProp('@primaryColor3'));
// Date Picker
variables.set('datepickerBgColor', new ColorProp('@defaultColorF'));
// Wizard
variables.set('wizardBackgroundColor', new ColorProp('@widgetBgColor'));
variables.set('wizardStepActiveColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary90'));
variables.set('wizardStepDoneColor', new ColorProp('@successColor', '--md-ref-palette-secondary90'));
variables.set('wizardStepIconColor', new ColorProp('@defaultColor9', '--md-ref-palette-neutral-variant30'));
variables.set('wizardStepColor', new ColorProp('@defaultColor9', '--md-ref-palette-neutral-variant30'));
variables.set('wizardActiveStepColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral10'));
variables.set('wizardDoneStepColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral-variant30'));
variables.set('wizardStepTitleColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('wizardNextBtnColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary90'));
variables.set('wizardDoneBtnColor', new ColorProp('@successColor', '--md-ref-palette-secondary90'));
variables.set('wizardStepConnectorColor', new ColorProp('@defaultColorE'));
variables.set('wizardStepCounerColor', new ColorProp('@defaultColor9'));
variables.set('wizardBorderColor', new ColorProp('@widgetBorderColor'));
// Search
variables.set('searchBorderColor', new ColorProp('@defaultColorD'));
variables.set('searchButtonColor', new ColorProp('@primaryColor'));
variables.set('searchButtonTextColor', new ColorProp('@primaryContrastColor'));
variables.set('searchItemBorderColor', new ColorProp('@defaultColorD'));
variables.set('searchItemTextColor', new ColorProp('@defaultColor6'));
variables.set('searchDropdownBackgroundColor', new ColorProp('@defaultColorF'));
variables.set('searchDataCompleteItemBgColor', new ColorProp('@defaultColorE'));
variables.set('searchBgContainerColor', new ColorProp('@defaultColorD', '--md-ref-palette-neutral98'));
// Chip
variables.set('chipIconColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary10'));
variables.set('chipActiveTextColor', new ColorProp('@defaultColorF', '--md-ref-palette-secondary10'));
variables.set('chipDefaultTextColor', new ColorProp('@defaultColorA', '--md-ref-palette-neutral-variant30'));
variables.set('chipborderColor', new ColorProp('@defaultColorD', '--md-ref-palette-neutral-variant50'));
variables.set('chipSelectedContainerColor', new ColorProp('@primaryColor', '--md-ref-palette-secondary90'));
variables.set('chipContainerColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral90'));
variables.set('chipSelectedOutlineColor', new ColorProp('@defaultColor6', '--md-ref-palette-secondary90'));
// Login
variables.set('loginErrorMsgColor', new ColorProp('@dangerContrastColor'));
variables.set('loginErrorMsgBgColor', new ColorProp('@dangerColor'));
variables.set('loginErrorMsgBorderColor', new ColorProp('@dangerColor'));
// Camera
variables.set('cameraBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('cameraBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('cameraTextColor', new ColorProp('@defaultTextColor', '--md-ref-palette-neutral10'));
// Barcode Scanner
variables.set('barcodeScannerBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('barcodeScannerBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('barcodeScannerTextColor', new ColorProp('@defaultTextColor', '--md-ref-palette-neutral10'));
// File Upload
variables.set('fileuploadBgColor', new ColorProp('@defaultColorF', '--md-ref-palette-neutral98'));
variables.set('fileuploadBorderColor', new ColorProp('@widgetBorderColor'));
variables.set('fileuploadTextColor', new ColorProp('@defaultTextColor'));
// Charts
variables.set('chartLabelColor', new ColorProp('@defaultTextColor'));
variables.set('chartGraphLinesColor', new ColorProp('@defaultColorC'));
variables.set('chartLineColor', new ColorProp('@defaultColor8'));
variables.set('chartLegendBorder', new ColorProp('@defaultColor7'));
variables.set('chartAxisColor', new ColorProp('@defaultColor5'));
variables.set('chartAxisPointColor', new ColorProp('@defaultColor9'));
variables.set('chartTitleColor', new ColorProp('@widgetHeaderTextColor'));
variables.set('chartSubTitleColor', new ColorProp('@defaultColor6'));
// Network Toast
variables.set('networkToastBgColor', new ColorProp('@defaultColor3'));
variables.set('networkToastTextColor', new ColorProp('@defaultColorF'));
variables.set('networkToastActionTextColor', new ColorProp('@primaryColor'));
variables.set('networkToastActionSeparatorColor', new ColorProp('@networkToastTextColor'));
// Skeleton
variables.set('skeletonBgColor', new ColorProp('@defaultColorE'));
variables.set('skeletonAnimatedBgColor', new ColorProp('@defaultColorE'));
variables.set('skeletonGradientBgColor', new ColorProp('@defaultColorF'));
variables.set('skeletonGradientShadowColor', new ColorProp('@defaultColorF'));
variables.set('skeletonGradientForegroundColor', new ColorProp('transparent'));
// Audio
variables.set('audioPlayerBgColor', new ColorProp('@defaultColorF'));
variables.set('audioPlayerFgColor', new ColorProp('@defaultColor3'));
//Tool tip
variables.set('tooltipBgColor', new ColorProp('fade(#fff, 40%)'));
variables.set('tooltipBorderColor', new ColorProp('#404040'));
const result = {};
variables.forEach((v, k) => {
    result[k] = variables.get(k);
});
exports.default = result;
//# sourceMappingURL=variables.js.map