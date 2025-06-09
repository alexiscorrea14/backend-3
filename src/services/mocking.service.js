import bcrypt from "bcrypt";

function getRandomRole() {
  return Math.random() < 0.5 ? "user" : "admin";
}

export async function generateUsersMock(quantity = 50) {
  const users = [];

  for (let i = 0; i < quantity; i++) {
    const passwordHash = await bcrypt.hash("coder123", 10);

    users.push({
      _id: i + 1, 
      first_name: `Nombre${i + 1}`,
      last_name: `Apellido${i + 1}`,
      email: `user${i + 1}@mock.com`,
      password: passwordHash,
      role: getRandomRole(),
      pets: [],
    });
  }

  return users;
}
