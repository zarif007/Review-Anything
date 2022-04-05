

export const selectStyle = {
    valueContainer: (base: any) => ({
      ...base,
      background: `black`,
    }),
    control: (base: any, state: any) => ({
      ...base,
      border: `black`,
      background: `black`,
    }),
    menuList: (styles: any) => ({
      ...styles,
      background: `black`
    }),
    placeholder: (defaultStyles: any) => {
      return {
          ...defaultStyles,
          color: `white`,
      }
    }
}