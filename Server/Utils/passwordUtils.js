import { hash as _hash, compare } from 'bcrypt';
const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const hash = await _hash(password, saltRounds);
        return hash;
    } catch (error) {
        throw new Error('Error hashing password: ' + error.message);
    }
};

const comparePassword = async (password, hashedPassword) => {
    try {
        const match = await compare(password, hashedPassword);
        return match;
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};

export default { hashPassword, comparePassword };
