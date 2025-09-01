
export function isValidBDPhone(number) {
  const regex = /^(?:\+8801[3-9]\d{8}|01[3-9]\d{8})$/;
  return regex.test(number);
}
