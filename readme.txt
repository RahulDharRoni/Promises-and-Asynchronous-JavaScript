Part 1: The Scenario
=============================================
You are a developer in a very large corporation that splits its data across multiple databases. 
Your job is to assemble this information using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data.
The object must contain the following information, which will be gathered from the databases:
{
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
      geo: {
        lat: string,
        lng: string
      }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string
    }
}

The databases are defined as follows:
central: There are too many users to store in a single database, so the central database identifies which database the users are stored within. 
The central database will return a string that identifies which database to access for that particular user's information. You can access the central database like so:
const returnedValue = await central(id);
// or
central(id).then((returnedValue) => { ... });

While we are pretending that there is a massive database of users, in reality there are only ten unique user values. Accordingly, you should test your function using id values between 1 and 10 (inclusive). Use values outside of this range to test for error cases.
db1, db2, and db3: These databases contain the user's basic information, including username, website, and company. Accessing these databases will return an object with these properties. If one of these databases encounters an error, your function should return a rejected promise indicating which database failed. 
You can access these databases like so:
const returnedValue = await db1(id);
// or
db1(id).then((returnedValue) => { ... });

This is where the dbs object in the starter code can become useful. Using this object, you can access each database directly using the string returned from central by using square bracket notation, e.g.:
dbs[valueReturnedFromCentral](id)
This can help circumvent some conditional logic that would otherwise be required.
vault: The personal data for each user is contained within the vault database since its access and usage is restricted by law. The vault will return an object with the user's name, email, address, and phone, and can be accessed like so:
const returnedValue = await vault(id);
// or
vault(id).then((returnedValue) => { ... });




Part 2: The Implementation
=======================================================================
Your task is to assemble this information using a single function that takes an id parameter and returns a Promise that resolves to an object containing specific data associated with the user with the given id, as described above.
To accomplish this, you may choose to use either Promise chaining via then() statements, or use async/await syntax. Either is a valid approach. As an added challenge, attempt to refactor your code into the opposite solution if you have enough time, and save both versions.
As an additional requirement, note that each database request takes 100ms to respond. However, your function must complete in 200ms or less. Since there are three different databases, you must query; one might assume that the minimum time to do so would be 300ms, but that is not the case.
Remember that asynchronous code is intended to run in parallel – two requests can occur simultaneously. Make use of Promise.all to handle requests concurrently where applicable. Promises only need to be sequential if they depend on the previous Promise’s result!
Using this technique in application development can significantly increase the speed at which tasks are accomplished, and improve the overall user experience.
When complete, test your code by passing it many different values for id, including:
    ==> Valid numbers – 1 through 10 (inclusive).
    ==> Invalid numbers – less than 1 or higher than 10.
    ==> Invalid data types – strings, Booleans, etc.