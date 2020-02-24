const truncate = (input: string, maxLength: number = 10, append: string = '…') => {
  if (input.length > maxLength) {
    return input.substring(0, maxLength - 1) + append;
  }
  return input;
};

export default truncate;
