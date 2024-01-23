import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function loginService(credentials) {
  try {
    const user = await apiModels.users.findOne({ where: { username: credentials.username } });
    
    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id, username: user.username, roles: user.roles }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  } catch (e) {
    throw e;
  }
}

export async function verifyTokenService(token) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    throw e;
  }
}

export async function registerUserService(registrationData) {
  try {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const role = await apiModels.roles.findOne({ where: { role_name: registrationData.role } });
    if (!role) {
      throw new Error('Invalid role');
    }

    const newUser = await apiModels.users.create({
      username: registrationData.username,
      password: hashedPassword
    });

    await apiModels.user_roles.create({
      user_id: newUser.id,
      role_id: role.id
    });

    return newUser;
  } catch (e) {
    throw e;
  }
}

