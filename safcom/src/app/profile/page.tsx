"use client"
// import { useState } from 'react'
// import { useRouter } from "next/navigation"
// import axios from "axios"
// import Game from '../../../Games'
// import Link from "next/link"
// import gamesData from '../../../_db'
// import { GetStaticProps, NextPage } from "next";



// export const getStaticProps: GetStaticProps = async () => {
//     const res = await fetch('http://localhost:4000/');
//     const games: Game[] = await res.json();

//     return {
//       props: {
//         games,
//       },
//     };
//   };


// export default function ProfilePage() {
//     const router = useRouter()
//     const [data, setData] = useState("")

//     const logout = async () => {
//         try {
//             await axios.get("/api/users/logout")
//             router.push("/login")

//         } catch (error: any) {
//             console.log(error.message)

//         }

//     }

//     const getUserDetails = async () => {
//         const res = await axios.get('api/users/me')
//         console.log(res.data);
//         setData(res.data.data._id)
//     }
//     return (
//         <div>
//             <h1>Profile</h1>

//             <hr />
//             <p>Profile page</p>


//             <hr />
//             {/* <div>
//                 <h1>List of Games</h1>
//                 <ul>
//                     {Games.map((game: Game, index: number) => (
//                         <li key={index}>
//                             <h2>{game.title}</h2>
//                             <p>Platform: {game.platform}</p>
//                             <p>Reviews: {game.reviews}</p>
//                         </li>
//                     ))}
//                 </ul>
//             </div> */}
//             <button
//                 onClick={logout}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 Logout
//             </button>
//             <button
//                 onClick={getUserDetails}
//                 className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//             >
//                 User Details
//             </button>
//         </div>
//     )
// }


import { useQuery, gql } from '@apollo/client';
import client from '../../../apollo-client';
import { useRouter } from "next/navigation";
import axios from "axios";

const GET_GAMES = gql`
  query GetGames {
    games {
      id  
      title  
      platform  
    }
  }
`;

const GamesPage = () => {
    const { loading, error, data } = useQuery(GET_GAMES, { client });
    const router = useRouter()

    const containerStyle = {
        fontFamily: 'Arial, sans-serif',
        padding: '20px',
        backgroundColor: '#f4f4f4',
    };

    const gameStyle = {
        marginBottom: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#fff',
    };

    const titleStyle = {
        fontSize: '1.5em',
        fontWeight: 'bold',
        marginBottom: '5px',
    };

    const logout = async () => {
        try {
            await axios.get("/api/users/logout")
            router.push("/login")

        } catch (error: any) {
            console.log(error.message)

        }

    }
    const platformStyle = {
        color: '#555',
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <>
            <div style={containerStyle}>
                <h1>Games</h1>
                {data.games.map((game: any) => (
                    <div key={game.id} style={gameStyle}>
                        <h2 style={titleStyle}>{game.title}</h2>
                        <p style={platformStyle}>Platform: {game.platform}</p>
                        {/* Display other details */}
                    </div>
                ))}
            </div>
            <button
                onClick={logout}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </>
    );
};

export default GamesPage;
