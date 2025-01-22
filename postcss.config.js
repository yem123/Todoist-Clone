export default {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 16,
      propList: ["*"],
      replace: true,
      mediaQuery: true,
      selectorBlackList: ["react-datepicker"],
    },
  },
};
