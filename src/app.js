const express = require('express');

//create an express instance
const app = express();

app.use((req,res) => {
    res.json({
        name:"ZhenXiao"
    })

})

app.listen(80, () => {
    console.log('server success')
});