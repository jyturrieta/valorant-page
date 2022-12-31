import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Input } from '@mui/material';
import {Box} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';
import {Button} from '@mui/material';


export default function CardAgent() {

  const [agents, setAgents] = useState([]);
  const [search, setSearch] = useState("");


  const fetchAgents = async () => {
    const res = await axios.get(`https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=es-MX`)
    setAgents(res.data.data);
    
  }

  useEffect(() => {
    fetchAgents();
    
  }, [])

  function ordenarPorRol(){
    const ordenar = [...agents].sort((a, b) => {
      if (a.role.displayName > b.role.displayName) {
        return 1;
      }
      if (a.role.displayName < b.role.displayName) {
        return -1;
      }
      return 0;
    });
    setAgents(ordenar);
  }

  function filtrarControladores(){
    const filtrar = [...agents].filter((a) => {
      if (a.role.displayName === "Controlador") {
        return a;
      }
    });
    setAgents(filtrar);
  }

  function ordenarPorNombre() {
    const ordenar = [...agents].sort((a, b) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
    setAgents(ordenar);
  }

  function ordernarPorNombreDescendente(){
    const ordenar = [...agents].sort((a, b) => {
      if (a.displayName < b.displayName) {
        return 1;
      }
      if (a.displayName > b.displayName) {
        return -1;
      }
      return 0;
    });
    setAgents(ordenar);
  }

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const results = !search ? agents : agents.filter((agent) => agent.displayName.toLowerCase().includes(search.toLowerCase()));



  
  return (
    <>
      <input type="text" placeholder="search" value={search} onChange={searcher}/>
      <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", flexDirection:"row"}}>
        {results.map((agent) => (
          
          <Card sx={{ maxWidth: 345, margin:"1rem"}}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="agent"
              height="500px"
              image={agent.fullPortrait}
              sx={{backgroundColor:"#000", backgroundImage:`url(${agent.background})`}}
            />
            <CardContent >
              <Box sx={{display:"flex", justifyContent:"center"}}>
                <Typography gutterBottom variant="h5">
                  {agent.displayName}
                </Typography>
              </Box>
              <Typography variant="body2" textOverflow="ellipsis">
                {agent.description}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        
        ))  
        }
      </Box>
    </>
  );
}