import { NextRequest, NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    email: "askvishal.me@gmail.com",
    name: "vishal",
  });
}

//its similar as
//app.get("/api/user", (req,res)=>{
//     res.json({
//       email: "",
//       name:""
//     })
// })




export async function POST(req: NextRequest){
  //body
  const body = await req.json();
  console.log(body)
  //header
  console.log(req.headers.get("authorization"))
  //query params
  console.log(req.nextUrl.searchParams.get("name"))

  return NextResponse.json({
    message: "You Are signed up"
  })
}

/*
Send using postman::
http://localhost:3000/api/user?name=vishal (query)

body: {
    "username":"abc",
    "password":"1212",
    "name":"user1"

}
and Authorization Headers as well

*/