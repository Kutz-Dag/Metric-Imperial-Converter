function splitNumStrings(input) {
    let [number = "1"] = input.match(/[.\d\/]+/g) || [];
    let [string] = input.match(/[a-zA-Z]+/g);
    return [number, string];
}

function checkDiv(possibleFraction) {
  const [numerator, denominator, ...rest] = possibleFraction.split("/");
  if (rest.length > 0) {
    return false;
  }
  return [numerator, denominator];
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = splitNumStrings(input)[0];
    let num = checkDiv(result);
    if (!num) {
      return undefined;
    }
    let num1 = parseFloat(num[0]);
    let num2 = parseFloat(num[1] || "1");
    if (isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return num1 / num2;
  };
  
  this.getUnit = function(input) {
    const unitMap = { km: "km", gal: "gal", lbs: "lbs", mi: "mi", l: "L", kg: "kg" };
    let result = splitNumStrings(input)[1].toLowerCase();
    return unitMap[result] || undefined;
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnitMap = { km: "mi", gal: "L", lbs: "kg", mi: "km", l: "gal", kg: "lbs" };
    let result = initUnit.toLowerCase();
    return returnUnitMap[result] || undefined;
  };

  this.spellOutUnit = function(unit) {
    const unitMap = { km: "kilometers", gal: "gallons", lbs: "pounds", mi: "miles", l: "liters", kg: "kilograms" };
    let result = unit.toLowerCase();
    return unitMap[result] || "unknown unit";
   };
  
  this.convert = function(initNum, initUnit) {
    const conversionFactors = { km: 1 / 1.60934, gal: 3.78541, lbs: 0.453592, mi: 1.60934, l: 1 / 3.78541, kg: 1 / 0.453592 };
    let unit = initUnit.toLowerCase();
    let factor = conversionFactors[unit];
    if (factor === undefined) {
      return undefined;
    }
    let result = initNum * factor;
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    return result;
  };
  
}

module.exports = ConvertHandler;
