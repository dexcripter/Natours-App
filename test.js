function truncateString(str, num) {
  let check = str.split(" ");
  if (str.length > num) {
    console.log(str);
  } else return str;
}

truncateString("A-tisket a-tasket A green and yellow basket", 8);
