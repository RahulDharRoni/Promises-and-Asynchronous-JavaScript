import { central, db1, db2, db3, vault } from "./databases.js";

async function getUserData(id) {
  const dbs = { db1, db2, db3 };

  try {
    // Determine which database contains the user's data
    const dbName = await central(id);

    if (!dbs[dbName]) {
      return Promise.reject(
        new Error(`Invalid database returned from central: ${dbName}`)
      );
    }

    // Fetch user data from the identified database
    const userData = await dbs[dbName](id);

    // Fetch personal data from the vault
    const personalData = await vault(id);

    // Combine the retrieved data into the required format
    return {
      id,
      name: personalData.name,
      username: userData.username,
      email: personalData.email,
      address: personalData.address,
      phone: personalData.phone,
      website: userData.website,
      company: userData.company,
    };
  } catch (error) {
    return Promise.reject(
      new Error(`Failed to retrieve data: ${error.message}`)
    );
  }
}

export { getUserData };
