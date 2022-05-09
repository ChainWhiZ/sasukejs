export const checkLength = (val, n = 4) => {
  return val.toString().length > n;
};

export const shortenLength = (val, n = 4) => {
  return Math.round(val * 10) / 10;
  // let valIntegerString = val.toString().split(".")[0]
  // let valDecimalString = val.toString().split(".")[1];
  // if (val.toString().length > n && valDecimalString) {
  //     return  valIntegerString+"."+valDecimalString.substring(0, 1) + "..." + valDecimalString.substring(valDecimalString.length - 1);
  // }
  // else if(val.toString().length > n && !valDecimalString)
  // {
  //     return  valIntegerString.substring(0, 2) + "..." + valIntegerString.substring(valIntegerString.length - 2);
  // }
  // else
  //     return val.toString();
};

export const getReward = (questionDetails, devusd, maticusd) => {
  if (questionDetails.questionStage === "vote") {
    if (questionDetails.currency === "DEV")
      return devusd * questionDetails.communityReward;
    else
      return maticusd * questionDetails.communityReward;
  }
  if (questionDetails.currency === "DEV")
    return devusd * questionDetails.bountyReward;
  else
    return maticusd * questionDetails.bountyReward;
}