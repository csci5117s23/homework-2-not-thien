
/*
* Auto generated Codehooks (c) example
* Install: npm i codehooks-js codehooks-crudlify
*/
import {app} from 'codehooks-js'
import {crudlify} from 'codehooks-crudlify'
import { date, object, string, boolean } from 'yup';

app.get("/test", (req, res) => {
    res.json({result: "you did it!"});
});

const todoYup = object({
    task: string().required(),
    done: boolean().default(false), 
    createdOn: date().default(() => new Date()),
})


// Use Crudlify to create a REST API for any collection
crudlify(app, {todoItem: todoYup})

// bind to serverless runtime
export default app.init();