import * as bcrypt from "bcrypt";
const hashedPassword = async (password: string) => {
  return bcrypt.hash(password, 10);
};
export default hashedPassword;
