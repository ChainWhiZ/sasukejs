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

export const getUSDReward = (questionDetails, usdValues, maticusd) => {
  console.log(usdValues)
  if (questionDetails.questionStage === "vote") {
    if (questionDetails.currency !== "MATIC")
      return usdValues[questionDetails.currency] * questionDetails.communityReward;
    else
      return maticusd * questionDetails.communityReward;
  }
  if (questionDetails.currency !== "MATIC")
    return usdValues[questionDetails.currency] * questionDetails.bountyReward;
  else
    return maticusd * questionDetails.bountyReward;
}

export const getReward = (questionDetails) => {
  if (questionDetails.questionStage === "vote") {
    return questionDetails.communityReward;
  }
  return questionDetails.bountyReward;
}

export async function copyTextToClipboard(text) {
  if ('clipboard' in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    return document.execCommand('copy', true, text);
  }
}