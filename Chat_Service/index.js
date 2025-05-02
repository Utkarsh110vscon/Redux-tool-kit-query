import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
const Port = 3001;

const token= `jaskjakh838192`;
const userName= 'utkarsh kumar';
const password='uk10234567';
let userData = [
    ['Emma Johansson', 'Emma', 'Johansson', 'React Developer', 'TechNordic', 'action'],
    ["Liam O'Connor", 'Liam', "O'Connor", 'Full Stack Developer', 'CodeCrafters', 'action'],
    ['Sofia Rossi', 'Sofia', 'Rossi', 'Backend Developer', 'InnovaTech', 'action'],
    ['Noah Müller', 'Noah', 'Müller', 'Frontend Developer', 'PixelWorks', 'action'],
    ['Chloe Dubois', 'Chloe', 'Dubois', 'Vue Developer', 'DevSphere', 'action'],
    ['Mateo Garcia', 'Mateo', 'Garcia', 'Node.js Developer', 'NextGen Solutions', 'action'],
    ['Hana Takahashi', 'Hana', 'Takahashi', 'JavaScript Engineer', 'NeoSoft Japan', 'action'],
    ['Lucas Schmidt', 'Lucas', 'Schmidt', 'DevOps Engineer', 'CloudForge', 'action'],
    ['Isla MacLeod', 'Isla', 'MacLeod', 'Angular Developer', 'BrightApps', 'action'],
    ['Oliver Novak', 'Oliver', 'Novak', 'TypeScript Developer', 'GlobalStack', 'action']
];

app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello form server with ip address 127.0.0.1 and port 3001'
    })
});

app.get('/getUserData', (req, res) => {
    try {
        res.json({
            message: 'User data successfully retrived.',
            data: userData
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error retrieving users'
        });
    }
})

app.post('/postData', (req, res) => {
    try{
        console.log(req.body)
        const { body }= req;
        userData.push([body.name, body.nickName, body.familyName, body.jobName, body.companyName, 'action']);
        res.status(201).json({
            message: 'user data posted successfully',
            data: userData
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error posting user data'
        });
    }
})

app.put('/updateExistingData', (req, res) => {
    try{
        const data= req.body;
        const dataIndex= Number(req.query.index);
        console.log(data, dataIndex);
        const newData= userData.map(
            (user, index) => {
                if(index === dataIndex){
                    return [data.name, data.nickName, data.familyName, data.jobName, data.companyName, 'action']
                } else{
                    return user
                }
            }

        );
        console.log(newData);
        userData= [ ...newData ]
        res.json({
            message: 'User data successfully updated.',
            data: userData
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error in updating user data'
        });
    }
})

app.delete('/deletePost', (req, res) => {
    try{
        const  dataIndex  =  Number(req.query.dataIndex);
        console.log(dataIndex)
        const newData= userData.filter((value, index) => dataIndex !== index);
        console.log(newData);
        userData= [ ...newData ];
        res.status(200).json({
            message: 'user data deleted successfully',
            data: userData
        });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error deleting user data'
        });
    }
});

app.post('/login', (req, res) => {
    try{
        const data= req.body;
    if(data.username.toLowerCase() === userName.toLowerCase()  && data.password === password){
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,     
            sameSite: 'Lax',
            maxAge: 5 * 60 * 1000
        });

        res.status(200).json({
            message: 'user successfully authenticated!'
        });
        return;
    }

    res.status(400).json({
        message: 'user is not authorized due to invalid credentials'
    });
    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error in signing in user.'
        });
    }
})

app.get('/check', (req, res) => {
    try{
        const userToken= req.query.userToken
        if(!userToken){
            res.status(400).json({
                message: 'Token is required!'
            })
            return;
        }

        if(userToken===token){
            res.status(200).json({
                message: 'user is authenticated.'
            });
            return;
        }

        res.status(400).json({
            message: 'user is not authenticated!'
        })

    }catch(error){
        console.log(error);
        res.status(500).json({
            message: 'Error deleting user data'
        });
    }
})

app.listen(Port, () => {
    console.log(`server is running on port ${Port}`);
});