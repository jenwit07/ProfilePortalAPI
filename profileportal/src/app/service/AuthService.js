import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

export async function loginService(credentials) {
  try {
    const user = await authDb.users.findOne( { where: { username: credentials.username } } );
    const roles = await authDb.user_roles.findOne( { where: { user_id: user.id } } );
    const role = await authDb.roles.findOne( { where: { id: roles.role_id } } );
    
    if (!user || !await bcrypt.compare(credentials.password, user.password)) {
      throw new Error('Invalid username or password');
    }

    const token = jwt.sign({ userId: user.id, username: user.username, role: role.role_name }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  } catch (e) {
    throw e;
  }
}

export async function verifyTokenService(token) {
  try {
    //verify token and return user roles
    const decoded = jwt.verify( token, JWT_SECRET );
    // console.log( decoded );
    return decoded;
  } catch (e) {
    throw e;
  }
}

export async function registerUserService(registrationData) {
  try {
    const hashedPassword = await bcrypt.hash(registrationData.password, 10);
    const role = await authDb.roles.findOne({ where: { role_name: registrationData.role } });
    if (!role) {
      throw new Error('Invalid role');
    }

    // check duplicate username
    const user = await authDb.users.findOne( { where: { username: registrationData.username } } );
    if (user) {
      throw new Error('Username already exists');
    }

    const newUser = await authDb.users.create({
      username: registrationData.username,
      password: hashedPassword
    });

    await authDb.user_roles.create({
      user_id: newUser.id,
      role_id: role.id
    });

    return newUser;
  } catch (e) {
    throw e;
  }
}

