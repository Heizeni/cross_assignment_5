export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light',
};

export const ACCENTS = {
  PLASMA: 'plasma',
  CYAN: 'cyan',
  VIOLET: 'violet',
  LIME: 'lime',
};

export const ACCENT_OPTIONS = [
  {
    id: ACCENTS.PLASMA,
    label: 'Plasma',
    primary: '#FF7A45',
    secondary: '#FF5FA2',
    gradient: ['#FF4F93', '#FF8A1E'],
  },
  {
    id: ACCENTS.CYAN,
    label: 'Cyber Cyan',
    primary: '#50B8FF',
    secondary: '#38D5FF',
    gradient: ['#50B8FF', '#38D5FF'],
  },
  {
    id: ACCENTS.VIOLET,
    label: 'Nebula Violet',
    primary: '#9B5CFF',
    secondary: '#D45DD6',
    gradient: ['#9B5CFF', '#D45DD6'],
  },
  {
    id: ACCENTS.LIME,
    label: 'Toxic Lime',
    primary: '#55E06B',
    secondary: '#B7FF5C',
    gradient: ['#55E06B', '#B7FF5C'],
  },
];

export const BASE_COLORS = {
  dark: {
    background: '#050713',
    card: '#090B1D',
    cardAlt: '#080A18',
    border: '#171A2E',
    text: '#F4F4FF',
    muted: '#7B819E',
    input: '#070918',
    switch: '#1A1F4A',
  },
  light: {
    background: '#F4F6FF',
    card: '#FFFFFF',
    cardAlt: '#EEF1FF',
    border: '#D7DDF5',
    text: '#15172B',
    muted: '#6D738F',
    input: '#FFFFFF',
    switch: '#D7DDF5',
  },
};