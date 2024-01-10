import * as bcrypt from 'bcrypt';

export function HashPassword(password: string) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    return hashedPassword;
}

export function ComparePassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}