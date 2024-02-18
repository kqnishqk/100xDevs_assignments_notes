import { useState } from 'react'

import './App.css'

function App() {
  const [name, setName] = useState("kanishak")
  const [description, setDescription] = useState("a student of 100xDevs")
  const [interests, setInterests] = useState(['playing chess', 'listening podcasts'])
  const [linkedin, setLinkedIn] = useState("somerandomlink")
  const [twitter, setTwitter] = useState("anotherrandomlink")
  

  return (
    <>
      <div>
        <ComponentBusinessCard name = {name} description= {description} interests = {interests} linkedin ={linkedin} twitter={twitter}></ComponentBusinessCard>
      </div>
    </>
  )
}

function ComponentBusinessCard(props){
  const styles = {
    card: {
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '20px',
      margin: '20px',
      maxWidth: '400px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#f8f9fa'
    },
    name: {
      fontSize: '24px',
      marginBottom: '10px',
      color: '#333',
    },
    description: {
      fontSize: '16px',
      color: '#555',
      marginBottom: '15px',
    },
    socialLinks: {
      display: 'flex',
      marginBottom: '15px',
    },
    link: {
      textDecoration: 'none',
      color: '#fff', // Text color
      padding: '10px 15px', // Padding for the button
      borderRadius: '5px', // Border radius for rounded corners
      backgroundColor: '#007BFF', // Background color for the button
      display: 'inline-block', // Display as inline-block to be side by side
      margin: '10px', // Margin between buttons
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for a subtle lift
    },
    interestsHeader: {
      fontSize: '18px',
      marginBottom: '10px',
      color: '#333',
    },
    interestsList: {
      listStyle: 'none',
      padding: 0,
      margin: 0,
    },
    interestItem: {
      fontSize: '14px',
      marginBottom: '5px',
      color: '#555',
    },
  }
  
  return <div style={styles.card}>
    <h1 style={styles.name}>{props.name}</h1>
    <p style={styles.description}>{props.description}</p>
    <h3 style={styles.interestsHeader}>Interests</h3>
    <ul style={styles.interestsList}>
      {props.interests.map((interest) => (
        <li key={interest} style={styles.interestItem}>
          {interest}
        </li>
      ))}
    </ul>
    <div style={styles.socialLinks}>
        <a href={props.linkedin} style={styles.link}>LinkedIn</a>
        <a href={props.twitter} style={styles.link}>Twitter</a>
    </div>
  </div>

    
}

export default App
