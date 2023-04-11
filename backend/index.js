
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string } from 'yup';

const flashCardYup = object({
    front: string().required(),
    back: string().required(),
    category: string(),
    createdOn: date().default(() => new Date()),
})
crudlify(app, {flashCard: flashCardYup})
// Use Crudlify to create a REST API for any collection
// crudlify(app)

// app.get("/test", (req, res) => {
//     res.json({result: "you did it!"});
// });

// bind to serverless runtime
export default app.init();
