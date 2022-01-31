/* interfaces */
/* ratio options to scale the webchat's size. */
const ratioOptions: any = {
  /* calculated in 4:3 ratio. */
  small: {
    // header.
    fontSize: '1rem',
    padding: '0.8rem 1.4rem',

    // generics
    height: '26rem',
    width: '20rem',
  },

  medium: {
    // header.
    fontSize: '1.25rem',
    padding: '0.9rem 1.7rem',

    // generics.
    height: '31rem',
    width: '23rem',
  },

  large: {
    // header.
    fontSize: '1.5rem',
    padding: '1rem 2rem',

    // generics.
    height: '33rem',
    width: '25rem',
  },
}

/* Containers. */
const radiusOptions: any = {
  small: '6px',
  medium: '10px',
  large: '14px',
}

export { ratioOptions, radiusOptions }
