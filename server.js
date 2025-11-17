import express from "express"

const app=new express(); //to create server 

app.use(express.json());//to parse req.body
app.use(express.urlencoded({ extended: false }))

//middleware to log details of each request
app.use((req,res,next)=>{
    res.on("finish", () => {
        console.log(
            `HTTP Method: ${req.method}, URL: ${req.url}, Status: ${res.statusCode}`
        );
    });
    next();
});


//middleware to check for required fields for put and post routes
function validatefields(req,res,next){
    const {firstName,lastName,hobbies}=req.body;
    if (!firstName) return res.status(400).json({ error: "firstName is required" });
    if (!lastName) return res.status(400).json({ error: "lastName is required" });
    if (!hobbies) return res.status(400).json({ error: "hobbies is required" });
    next();
}

// In-memory data
const User=[
  {
    "id":"1",
    "firstName": "John",
    "lastName": "Doe",
    "hobbies": ["reading", "hiking", "gaming"]
  },
  {
    "id":"2",
    "firstName": "Jane",
    "lastName": "Smith",
    "hobbies": ["painting", "yoga", "swimming"]
  },
  {
    "id":"3",
    "firstName": "Peter",
    "lastName": "Jones",
    "hobbies": ["coding", "running", "photography"]
  },
  {
    "id":"4",
    "firstName": "Anna",
    "lastName": "Williams",
    "hobbies": ["gardening", "baking", "cycling"]
  },
  {
    "id":"5",
    "firstName": "Michael",
    "lastName": "Brown",
    "hobbies": ["fishing", "golfing", "traveling"]
  },
  {
    "id":"6",
    "firstName": "Sarah",
    "lastName": "Davis",
    "hobbies": ["singing", "dancing", "writing"]
  },
  {
    "id":"7",
    "firstName": "David",
    "lastName": "Miller",
    "hobbies": ["woodworking", "astronomy", "cooking"]
  },
  {
    "id":"8",
    "firstName": "Laura",
    "lastName": "Wilson",
    "hobbies": ["knitting", "sewing", "reading"]
  },
  {
    "id":"9",
    "firstName": "James",
    "lastName": "Moore",
    "hobbies": ["gym", "meditation", "chess"]
  },
  {
    "id":"10",
    "firstName": "Emily",
    "lastName": "Taylor",
    "hobbies": ["pottery", "sculpting", "drawing"]
  },
  {
    "id":"11",
    "firstName": "Chris",
    "lastName": "Anderson",
    "hobbies": ["bird watching", "camping", "hiking"]
  },
  {
    "id":"12",
    "firstName": "Michelle",
    "lastName": "Thomas",
    "hobbies": ["tennis", "badminton", "running"]
  },
  {
    "id":"13",
    "firstName": "Robert",
    "lastName": "Jackson",
    "hobbies": ["collecting stamps", "coin collecting", "history"]
  },
  {
    "id":"14",
    "firstName": "Jessica",
    "lastName": "White",
    "hobbies": ["blogging", "social media", "shopping"]
  },
  {
    "id":"15",
    "firstName": "Daniel",
    "lastName": "Harris",
    "hobbies": ["surfing", "skateboarding", "snowboarding"]
  },
  {
    "id":"16",
    "firstName": "Megan",
    "lastName": "Clark",
    "hobbies": ["horse riding", "archery", "fencing"]
  },
  {
    "id":"17",
    "firstName": "Paul",
    "lastName": "Lewis",
    "hobbies": ["playing piano", "violin", "guitar"]
  },
  {
    "id":"18",
    "firstName": "Ashley",
    "lastName": "King",
    "hobbies": ["volunteering", "mentoring", "charity work"]
  },
  {
    "id":"19",
    "firstName": "Mark",
    "lastName": "Wright",
    "hobbies": ["magic tricks", "juggling", "stand-up comedy"]
  },
  {
    "id":"20",
    "firstName": "Nicole",
    "lastName": "Scott",
    "hobbies": ["photography", "filmmaking", "graphic design"]
  }
];


// GET all users
app.get("/users",(req,res)=>{
    //to send User array
    if(User.length==0) return res.status(404).json({error:"No users available"});
    res.status(200).json(User);
});

// GET user by ID
app.get("/users/:id",(req,res)=>{
    //to get id value from url 
    const userid=req.params.id;
    //to find requested id user data from array User
    const userdata=User.find((user)=>user.id==userid);
    //if data not found in User
    if(!userdata){
        return res.status(404).json({error:"User Not Found"});
    }
    //send user data for requested id
    res.status(200).json(userdata);
});

//post request on /user to create new user
app.post("/user",validatefields,(req,res)=>{
    //get fields data from request body
    const {firstName,lastName,hobbies}=req.body;
    //fill data in newUser
    const newUser={
        id: Date.now().toString(),
        firstName,
        lastName,
        hobbies
    };
    //push newUser into array User
    User.push(newUser);
    //send response
    res.status(201).json({ message: 'User data added successfully', data: newUser});
})

// PUT replace user
app.put("/user/:id",validatefields,(req,res)=>{
    const id = req.params.id;
    const index = User.findIndex(u => u.id ==id);
    if (index === -1)//if user does not exist in data
    return res.status(404).json({ error: "User not found" });
    //user newdata
    const newUser = { 
        id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        hobbies: req.body.hobbies
    };

    User[index] = newUser; // FULL REPLACEMENT

    res.status(200).json({
        message: "User replaced successfully",
        data: newUser
    });
})

//to delete user from User
app.delete("/user/:id",(req,res)=>{
    const userid=req.params.id;//to get id value from url 
    const userdata=User.find((user)=>user.id==userid);
    //if data not found in User
    if(!userdata){
        return res.status(404).json({error:"User Not Found"});
    }
    //filter all data except mentioned userid
    const filteredusers=User.filter((user)=>user.id!=userid);
     // replace array content without reassigning
    User.splice(0, User.length, ...filteredusers);
    res.status(200).json({
    message: "User deleted successfully",
    deletedUser: userdata});
});

//global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(err.status || 500).json({
        error: err.message || "Internal Server Error"
    });
});

//to run app on port 8000
app.listen(8000,()=>{
    console.log(`Server listening at http://localhost:8000`);
});

