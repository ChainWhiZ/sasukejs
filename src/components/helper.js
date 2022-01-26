export const checkLength = (val) => {
    return (val.toString()).length > 4;
}

export const shortenLength = (val) => {
    let valIntegerString = val.toString().split(".")[0]
    let valDecimalString = val.toString().split(".")[1];
    if (val.toString().length > 4) {
        return  valIntegerString+"."+valDecimalString.substring(0, 1) + "..." + valDecimalString.substring(valDecimalString.length - 1);
    }
    else
        return val.toString();
}

