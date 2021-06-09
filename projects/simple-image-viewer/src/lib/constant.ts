export const EVENT_ZOOM_IN = 'ZOOM_IN'; 
export const EVENT_ZOOM_OUT = 'ZOOM_OUT'; 
export const EVENT_RESET = 'RESET'; 
export const EVENT_PREV = 'PREV'; 
export const EVENT_PLAY = 'PLAY'; 
export const EVENT_NEXT = 'NEXT'; 
export const EVENT_ROTATE_LEFT = 'ROTATE_LEFT'; 
export const EVENT_ROTATE_RIGHT= 'ROTATE_RIGHT'; 
export const EVENT_FLIP_HORIZONTAL = 'FLIP_HORIZONTAL'; 
export const EVENT_FLIP_VERTICAL = 'FLIP_VERTICAL'; 

export const LIST_BUTTONS = Object.freeze([
  {
    NAME: 'zoom in',
    EVENT: EVENT_ZOOM_IN,
    ICON: 'fa fa-plus'
  },
  {
    NAME: 'zoom out',
    EVENT: EVENT_ZOOM_OUT,
    ICON: 'fa fa-minus'
  },
  {
    NAME: 'reset',
    EVENT: EVENT_RESET,
    ICON: 'fa fa-undo'
  },
  {
    NAME: 'prev',
    EVENT: EVENT_PREV,
    ICON: 'fa fa-chevron-left'
  },
  // {
  //   NAME: 'play',
  //   EVENT: EVENT_PLAY,
  //   ICON: 'fa fa-play',
  //   HIDDEN: true
  // },
  {
    NAME: 'next',
    EVENT: EVENT_NEXT,
    ICON: 'fa fa-chevron-right'
  },
  {
    NAME: 'rotate left',
    EVENT: EVENT_ROTATE_LEFT,
    ICON: 'fa fa-reply'
  },
  {
    NAME: 'rotate right',
    EVENT: EVENT_ROTATE_RIGHT,
    ICON: 'fa fa-share'
  },
  {
    NAME: 'flip horizontal',
    EVENT: EVENT_FLIP_HORIZONTAL,
    ICON: 'fa fa-arrows-v'
  },
  {
    NAME: 'flip vertical',
    EVENT: EVENT_FLIP_VERTICAL,
    ICON: 'fa fa-arrows-h'
  },
]);

export const INITIAL_SCALE = 1;
export const INITIAL_ROTATE = 0;

export const CSS_SCALE_REGEX = /(?<=scale\()(.*)(?=\))/g;
export const CSS_ROTATEX_REGEX = /(?<=rotateX\()(.*)(?=\))/g;
export const CSS_ROTATEY_REGEX = /(?<=rotateY\()(.*)(?=\))/g;
export const CSS_ROTATE_REGEX = /(?<=rotate\()(.*)(?=deg\))/g;

export const CONTAINER_ID = 'viewer_container';
export const CONTAINER_CLASS = 'viewer_container';
export const MAIN_CONTENT_CLASS = 'viewer-main-content';
export const FOOTER_ID = 'viewer_footer';

export const KEY_LEFT_ARROW = 'ArrowLeft';
export const KEY_RIGHT_ARROW = 'ArrowRight';
export const KEY_ESCAPE = 'Escape';
