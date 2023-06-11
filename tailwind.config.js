/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/*.{html,js}", "./*.{html,js}"],
  theme: {
    extend: {
      fontSize:{
        'very-small':'9px',
        'very-very-small':'5px'
      },

      width:{
        'hundred':'100px',
        'dummy':'433px',
        '150':'150px'
      },
      height:{
        '40':'43px'
      },
      margin:{
        '132':'132px',
        '21':'21px',
        '45':'45px'
      }
    },
  },
  plugins: [],
}

