import express from "express"

const app=new express(); //to create server 
app.use(express.json());//to parse req.body
app.use(express.urlencoded({ extended: false }))
//to run app on port 3000
app.listen(8000,()=>{
    console.log(`Server listening at http://localhost:8000`);
});
//middleware to log details of each request
app.use((req,res,next)=>{
    console.log(`HTTP Method used is "${req.method}" on url "${req.url}" and status of code is "${res.statusCode}"`);
    next();
});

