
const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");

const validateNum = (num, res, sign, value) => {
    console.log(3435435)
    if (
        (num === "0" && value === "0") || //avoid 034
        (num.toString().includes(".") && value === ".") || //avoid 0..34
        (res && !num && value === ".") //avoid adding commas in results

    ) return num

    if (!sign) {
        res = 0; //reset after equal press
    }

    if (removeSpaces(num).length < 16) {
        return !num && value === "." // format to 0. if . pressed first
            ? "0."
            : num && value === "." // add comma for number
                ? num + "."
                : toLocaleString(
                    (!num || num === "0" ? value : (num += value))
                        .toString()
                        .replace(/\s/g, "")
                );
    }


}

export default validateNum;