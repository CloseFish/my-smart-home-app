import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/free-solid-svg-icons';

// Create a custom curtains icon (using window icon as base)
export const faCurtains = {
  prefix: 'fas',
  iconName: 'curtains',
  icon: [
    512, // width
    512, // height
    [], // ligatures
    null, // unicode
    "M192 243.2V136c0-15.1 5.4-30.1 16-42c13.3-14.9 33.9-22 54.3-18.2l.7 .1V243.2l-71 71zM448 415.9V172.7c0-10-4.1-19.6-11.3-26.5c-7.8-7.4-18.4-10.9-29-9.6l-28.9 3.5V398l69.2-66.2c0 28.1 0 56.2 0 84.2zm-128-87.8V35.3L231.5 80.3c-15.7 7.9-28.7 20.4-37.1 35.6C183.2 136.5 176 160 176 184v95.8l-80 80c5.9 5.5 13.8 8.1 21.8 7.2c8.7-1 16.9-5.3 22.9-12.2L176 316.2V480l80-78V166.1l71-71c-4.2 .2-8.4-.3-12.5-1.4c-4.3-1.1-8.3-3-11.8-5.5l-54.8 54.7V402.1l80 76.9c16.5-14 6.8-5.1 19.5-15.6V95.3l-26.9 3.3v229.5zm80 79.7l-72 69.2l72-69.2z"
  ]
};

// Add the icon to the library
library.add(faCurtains);

export default faCurtains;