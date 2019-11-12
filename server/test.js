const auth = require('./auth');
const db = require('./db/userManager');
/*
let token = auth.createToken({
    data: { email: 'valera@gmail.com', id: 'valera' }
})

async function main(){
    let decodedToken = (await auth.verifyToken(token)).data;
    console.log(decodedToken);
    let user = await db.getOneById(decodedToken.id);
    console.log(user);
}

main();
*/
auth.verifyToken("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoidmFsZXJhQGdtYWlsLmNvbSIsImlkIjoidmFsZXJhIn0sImlhdCI6MTU3MzQ5NDYyNCwiZXhwIjoxNTczNDk4MjI0fQ.3kK7w125TgsTmfyrsYFbrbDMs6eIpXIPAyXydlOXys8").then(t => console.log(t));