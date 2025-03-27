import { central, db1, db2, db3, vault } from "./databases.js";

const dbs = { db1, db2, db3 };


export async function getUserData(id) {
  try {
    
    const dbName = await central(id);

    if (!dbs[dbName]) {
      throw new Error(`Invalid database returned from central: ${dbName}`);
    }

    
    const [userData, personalData] = await Promise.all([
      dbs[dbName](id),
      vault(id),
    ]);

 
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

// Example usage (Testing)
getUserData(20).then(console.log).catch(console.error);
