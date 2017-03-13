export const style = {
  overlay : {
    position        : 'fixed',
    top             : 0,
    left            : 0,
    right           : 0,
    bottom          : 0,
    backgroundColor : 'rgba(255, 255, 255, 0.75)',
    zIndex          : 10
  },
  content : {
    position        : 'absolute',
    top             : '50%',
    left            : '50%',
    transform       : 'translate(-50%, -50%)',
    border          : '2px solid red',
    padding         : '30px',
    zIndex          : 11,
    width           : '425px',
    height          : '425px',
  }
};
