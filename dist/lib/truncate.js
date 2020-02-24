const truncate = (input, maxLength = 10, append = '…') => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength - 1) + append;
  }

  return input;
};

export default truncate;