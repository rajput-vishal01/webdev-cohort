import axios from "axios";

// import Image from "next/image"; 

// export default async function Home() {
//   const { results } = (
//     await axios.get("https://randomuser.me/api/")
//   ).data;

//   return (
//     <div>
//       {results.map((user, i) => (
//         <div key={i} style={{ marginBottom: 16 }}>
//           <Image
//             src={user.picture.thumbnail}
//             alt={`${user.name.first} ${user.name.last}`}
//             width={50}
//             height={50}
//             style={{ borderRadius: "50%" }}
//           />
//           <p>
//             {user.name.first} {user.name.last}
//           </p>
//           <p>{user.email}</p>
//         </div>
//       ))}
//     </div>
//   );
// }



export default async function Home() {
  const res =   await axios.get("http://localhost:3000/api/user")
  console.log(res.data)
  

  return (
    <div>
      {res.data.email}
      <br />
      {res.data.name}
    </div>
  );
}
