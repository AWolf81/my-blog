import {COLORS} from "../constants";

const darkGray = COLORS.darkGray[90];
const veryLightGray = COLORS.snow[100];
const lightGray = COLORS.lightGray[100];
const mint = COLORS.mintGreen[100];

export default {
  colors: {
    highlight_bg: darkGray,
    highlight: COLORS.mintGreen[60],
    gray: 'gray',
    darkGray,
    lightGray,
    veryLightGray,
    body: COLORS.black[100],
    text: lightGray,
    mainPane_bg: darkGray,
    searchResults_bg: COLORS.darkGray[100]
  },
  timing: {
      shortTrans: '0.2s'
  },
  styles: {
      smallBorderRadius: '3px'
  }
}
