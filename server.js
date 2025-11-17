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

//data
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
