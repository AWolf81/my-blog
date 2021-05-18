import {COLORS} from "../constants";

const veryLightGray = COLORS.snow[100];
const lightGray = COLORS.lightGray[100];
const mint = COLORS.mintGreen[100];

export default {
  colors: {
    highlight_bg: veryLightGray,
    highlight: mint,
    gray: 'gray',
    darkGray: 'gray',
    lightGray,
    veryLightGray,
    body: lightGray,
    text: COLORS.black[100],
    mainPane_bg: veryLightGray,
    searchResults_bg: lightGray,
    searchIcon: COLORS.black[100],
    searchText: COLORS.blue[100]
  },
  timing: {
    shortTrans: '0.2s',
  },
  styles: {
    smallBorderRadius: '3px'
  }
}
