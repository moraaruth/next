"use client"
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/navigation';
import { gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../../../lib/apollo';
import axios from 'axios';

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
  const { data } = useQuery(GET_GAMES, { client: apolloClient });
  const router = useRouter();

  const [games, setGames] = useState(data ? data.games : []);

  const containerStyle = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gridGap: '20px',
  };

  const gameStyle = {
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

  const platformStyle = {
    color: '#555',
  };

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      router.push('/login');
    } catch (error) {
      console.log("message");
    }
  };

  const handleDelete = (gameId: any) => {
    const updatedGames = games.filter((game: any) => game.id !== gameId);
    setGames(updatedGames);
  };

  return (
    <ApolloProvider client={apolloClient}>
      <div style={containerStyle}>
        {games &&
          games.map((game: any) => (
            <div key={game.id} style={gameStyle}>
              <h2 style={titleStyle}>{game.title}</h2>
              <p style={platformStyle}>Platform: {game.platform}</p>
              <button onClick={() => handleDelete(game.id)}>Delete</button>
            </div>
          ))}
      </div>
      <button
        onClick={logout}
        style={{
          backgroundColor: '#4285f4',
          color: 'white',
          fontWeight: 'bold',
          padding: '10px 20px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
      >
        Logout
      </button>
    </ApolloProvider>
  );
};

export default GamesPage;
