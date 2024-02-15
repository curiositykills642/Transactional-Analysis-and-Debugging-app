export function dictionaryToString(dictionary){
    let statesEntered = "";
  
    for (let state in dictionary) {
      statesEntered = statesEntered + state;
  
      if (dictionary[state] > 1) {
        statesEntered = statesEntered + " : ";
        statesEntered = statesEntered + dictionary[state];
      }
      statesEntered = statesEntered + " , ";
    }
  
    return statesEntered.substring(0, statesEntered.length - 3);
}