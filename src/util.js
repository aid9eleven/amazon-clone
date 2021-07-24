export const validateEmail = (email) => {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

export const truncateName = (name, limit) => {
  let s = name.split(" ")[0]

  if (s.length > limit) {
    s = s.slice(0, limit-3).concat("...")
  }

  return s
}

export const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (0 !== currentIndex) {

    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export const sumAtToken = (array, token) => {
  return array.reduce((sum, item) => sum + (item[token] || 0), 0)
}

export const padZeros = (num, size) => {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}