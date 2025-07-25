import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import User from '../models/User.js';
import connectToDatabase from '../config/db.js';

const users = [
  { fullName: 'Alice Johnson', userName: 'alicej', email: 'alice@example.com', password: 'password123', role: 'user' },
  { fullName: 'Bob Smith', userName: 'bobsmith', email: 'bob@example.com', password: 'password123', role: 'user' },
  { fullName: 'Charlie Brown', userName: 'charlieb', email: 'charlie@example.com', password: 'password123', role: 'user' },
  { fullName: 'Diana Prince', userName: 'dianap', email: 'diana@example.com', password: 'password123', role: 'user' },
  { fullName: 'Eve Adams', userName: 'evea', email: 'eve@example.com', password: 'password123', role: 'user' },
  { fullName: 'Frank Miller', userName: 'frankm', email: 'frank@example.com', password: 'password123', role: 'user' },
  { fullName: 'Grace Hopper', userName: 'graceh', email: 'grace@example.com', password: 'password123', role: 'user' },
  { fullName: 'Henry Ford', userName: 'henryf', email: 'henry@example.com', password: 'password123', role: 'user' },
  { fullName: 'Ivy Lee', userName: 'ivyl', email: 'ivy@example.com', password: 'password123', role: 'user' },
  { fullName: 'Jack Black', userName: 'jackb', email: 'jack@example.com', password: 'password123', role: 'user' },
  { fullName: 'Karen White', userName: 'karenw', email: 'karen@example.com', password: 'password123', role: 'user' },
  { fullName: 'Leo King', userName: 'leok', email: 'leo@example.com', password: 'password123', role: 'user' },
  { fullName: 'Mona Lisa', userName: 'monal', email: 'mona@example.com', password: 'password123', role: 'user' },
  { fullName: 'Nina Simone', userName: 'ninas', email: 'nina@example.com', password: 'password123', role: 'user' },
  { fullName: 'Oscar Wilde', userName: 'oscarw', email: 'oscar@example.com', password: 'password123', role: 'user' },
  { fullName: 'Pratyush Sinha', userName: 'prat', email: 'prat@sinha.com', password: 'Prat@123', role: 'admin' },
];

async function seed() {
  await connectToDatabase();
  await User.deleteMany({});
  for (const user of users) {
    const hashed = await bcrypt.hash(user.password, 10);
    await User.create({ ...user, password: hashed });
  }
  console.log('Seeded users!');
  mongoose.connection.close();
}

seed(); 