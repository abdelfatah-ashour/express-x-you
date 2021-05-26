export function handleDisplay(state, action) {
  switch (action.type) {
    case 'SHOW':
      return (state = action.payload);
    case 'HIDE':
      return (state = action.payload);
    default:
      return state;
  }
}

export function handleChangeQTY(state, action) {
  switch (action.type) {
    case 'INC':
      return state + action.payload;
    case 'DEC':
      return state - action.payload;
    case 'RESET':
      return (state = 0);
    default:
      return state;
  }
}
