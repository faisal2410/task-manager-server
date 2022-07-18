const app=require('./app');



// port
const port = process.env.PORT || 8000;
app.get('/',(req,res)=>{
    res.send("Running task manager")
})

app.listen(port,()=>{
    console.log(`Application is listening from PORT ${port}`);
})