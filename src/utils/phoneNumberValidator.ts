const regex = new RegExp(/^(+d{1,2}s)?(?d{3})?[s.-]?d{3}[s.-]?d{4}$/);
const supportedFormat = [
  "123-456-7890",
  "(123) 456-7890",
  "123 456 7890",
  "123.456.7890",
  "+91 (123) 456-7890",
];
const validatePhoneNumber = (phoneNumber: string) => {
  if (!regex.test(phoneNumber)) {
    console.log(
      `Invalid phone number format.
      Supported formats: ${supportedFormat.map(format => format.toString())}`,
    );
    return false;
  }
  return true;
};

export default validatePhoneNumber;
