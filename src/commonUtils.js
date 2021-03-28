/* Custom Utils - put common functions here */

export const rowWinArray = function(gameScale) {
  console.log("In rowWinArray")
  let rowArr = _.range(0, gameScale).map((index)=>{
    return _.range((index*gameScale),(index+1)*gameScale)
  })
  return rowArr
}

const colWinArray = function(gameScale) {
  console.log("In colWinArray")
  let colArr = _.range(0, gameScale).map((item) => {
    return _.range(item, item + gameScale * (gameScale - 1) + 1, gameScale)
  })
  return colArr
}

const forwardSlashWinArray = function(gameScale,gameCondition){
  console.log("In forwardSlashArray",gameScale,gameCondition)
  let firstArr = _.range(0, gameScale).map((item,index) => {
    return _.range(item, (index * gameScale) + 1, gameScale - 1)
  })
  let secondArr = _.range((2*gameScale) - 1, gameScale*gameScale, gameScale ).map((item,index) => {
    return _.range(item, gameScale*gameScale-(gameScale-index-1)+1, gameScale - 1)
  })
  let finalArr = [...firstArr, ...secondArr]
  let result = finalArr.filter(arr => arr.length >= gameCondition);
  console.log("In forwardSlashWinArray", result)
  return result
}

const backSlashWinArray = function(gameScale,gameCondition){
  console.log("In backSlashArray",gameScale,gameCondition)
  let firstArr = _.range(0, gameScale).map((item,index) => {
    console.log(item, gameScale*gameScale-(index * gameScale), gameScale + 1)
    return _.range(item, gameScale*gameScale-(index * gameScale), gameScale + 1)
  })
  let secondArr = _.range(gameScale, gameScale*gameScale, gameScale).map((item,index) => {
    return _.range(item, gameScale*gameScale-(index+1), gameScale + 1)
  })
  let finalArr = [...firstArr, ...secondArr]
  let result = finalArr.filter(arr => arr.length >= gameCondition);

  return result
}

export const CreatewinArray = function(gameScale,condition) {
  let rowArray = rowWinArray(gameScale)
  let colArray = colWinArray(gameScale)
  let forwardSlashArray = forwardSlashWinArray(gameScale,condition)
  let backSlashArray = backSlashWinArray(gameScale,condition)
  let totalArray = [...rowArray, ...colArray, ...forwardSlashArray, ...backSlashArray]
  let finalArr = []

  if(gameScale === condition) return totalArray
  totalArray.forEach((subArray)=> {
    if (subArray.length == condition) {
      finalArr.push(subArray)
    }
    else{
      for (let index = 0; index <= (subArray.length-condition); index++) {
        finalArr.push(subArray.slice(index,index+(condition)))
      }
    }
  });
  return finalArr
}