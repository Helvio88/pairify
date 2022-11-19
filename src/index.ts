export class Calculator {
  sum(input: string = ''){

    // Return 0 for no input
    if(!input) {
      return 0;
    }

    // Delimiter can be a string or array of string. Default value is ","
    let delimiters: string | string[] = ",";
    // If a character sequence for delimiter(s) is found, process it
    if(input.indexOf("//") === 0) {
      // Get single delimiter or "TI-84" sequence for multiples (format: [delim1][delim2][delim3])
      delimiters = input.substring(2, input.indexOf('\n'));
      // If multiple delimiters are detected, parse them properly
      if(delimiters.indexOf('[') !== -1 && delimiters.indexOf(']') !== -1) {
        // Transform a "TI-84" string of delimiters into a vallid JSON array
        delimiters = JSON.parse(delimiters.replaceAll('[', '["').replaceAll(']', '"]').replaceAll('][', ','))
      }
      // input becomes the value after the line break that ends the delimiters section
      input = input.split("\n")[1];
    }

    // If multiple delimiters, transform them all into line breaks (because of next step)
    if(delimiters instanceof Array) {
      delimiters.forEach(delimiter => {
        input = input.replaceAll(delimiter, '\n')
      })
    }

    // Transform all line breaks into first delimiter and split by it
    const splitValues = input.replaceAll('\n', delimiters[0]).split(delimiters[0])
    
    // Math time!
    let sum = 0;
    const negatives = []
    splitValues.forEach(value => {
      // Only sum positives inputs up to 1000
      if(+value > 0 && +value < 1000) {
        sum += +value
      }
      // Negatives are not allowed, add them to an exception list
      else if(+value < 0) {
        negatives.push(+value)
      }
    });
    // Throw if negatives are found
    if (negatives.length) {
      throw new Error(`negatives not allowed: ${negatives.join(', ')}`)
    }
    return sum
  }
}