const { connect, connection } = require('mongoose')
const { hash }  =  require('bcrypt');
const User  = require('./models/usersModel');

async function insert() {
    require('dotenv').config()

    await connect(process.env.MONGODB_CONNECT_URL)
    console.log('Connected to messengerDB!')              

    //hash and salt the password
    const saltRounds = 10;

    demoUsers = demoUsers.map(async (user) => {
        const password = await hash(user.password, saltRounds)
        user.password = password
        return user
    })    

    demoUsers = await Promise.all(demoUsers)

    //save
    for (const user of demoUsers) {
        const u = new User(user);
        await u.save();        
    }
    
    await connection.close()
    console.log('close connection to messengerDB!')

}

let demoUsers = [
{"name":"Mr Christoffer Johansen","username":"lazyfish925","password":"callisto","blokesList":[],"lastUpdateDate":"2016-09-04T07:56:50.034Z","img":"https://randomuser.me/api/portraits/men/9.jpg"},
{"name":"Miss Adeci da Cunha","username":"goldenleopard277","password":"pooky","blokesList":[],"lastUpdateDate":"2008-04-27T14:02:07.093Z","img":"https://randomuser.me/api/portraits/women/28.jpg"},
{"name":"Mr Austin Lee","username":"whitecat357","password":"crusty","blokesList":[],"lastUpdateDate":"2020-07-15T04:30:58.538Z","img":"https://randomuser.me/api/portraits/men/27.jpg"},
{"name":"Ms Pinja Tikkanen","username":"happyduck556","password":"ernest","blokesList":[],"lastUpdateDate":"2020-12-02T00:59:19.082Z","img":"https://randomuser.me/api/portraits/women/92.jpg"},
{"name":"Miss Kaylee Beck","username":"goldenwolf841","password":"mortgage","blokesList":[],"lastUpdateDate":"2010-11-05T17:05:02.257Z","img":"https://randomuser.me/api/portraits/women/69.jpg"},
{"name":"Miss Lumi Lakso","username":"organiccat607","password":"harlem","blokesList":[],"lastUpdateDate":"2012-01-24T17:27:04.411Z","img":"https://randomuser.me/api/portraits/women/75.jpg"},
{"name":"Ms Kübra Kıraç","username":"lazykoala147","password":"12345a","blokesList":[],"lastUpdateDate":"2013-09-24T23:41:10.844Z","img":"https://randomuser.me/api/portraits/women/59.jpg"},
{"name":"Mr Angelo Haufe","username":"smallfish895","password":"seng","blokesList":[],"lastUpdateDate":"2013-10-10T06:12:06.689Z","img":"https://randomuser.me/api/portraits/men/99.jpg"},
{"name":"Mr Alberto Cruz","username":"greenswan136","password":"beast1","blokesList":[],"lastUpdateDate":"2002-11-12T05:55:47.304Z","img":"https://randomuser.me/api/portraits/men/9.jpg"},
{"name":"Mr Fernando Fernández","username":"heavygoose267","password":"gonzales","blokesList":[],"lastUpdateDate":"2003-06-27T04:47:05.216Z","img":"https://randomuser.me/api/portraits/men/35.jpg"}]

insert()