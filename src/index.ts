import express from 'express';
import { PrismaClient } from "@prisma/client";
import { parse } from 'path';

const app = express();
const client = new PrismaClient();

app.get("/users" , async(req , res) => {
    const users =  await   client.user.findFirst() as unknown as string;
        res.json({
            users
        })

})

app.get("/todos/:id" ,async (req , res) => {
    const id = req.params.id;
    const user = await client.user.findFirst({
        where : {
            id : parseInt(id)
        },
        select:{
            todos:true
        }
    })
    res.json({
        user
    })
})

app.listen(3000)

async function getUser(){
    const user = await client.user.findFirst({
        where:{
            id :1
        },
        include:{
            todos:true
        }
    })

    console.log(user)
}

getUser();