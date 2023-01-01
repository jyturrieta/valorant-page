import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, FormControl, Input, Button, TextField } from '@mui/material';
import {Box} from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

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


  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const results = !search ? agents : agents.filter((agent) => agent.displayName.toLowerCase().includes(search.toLowerCase()));

  function ordenarPorNombre() {
    results.sort((a, b) => {
      if (a.displayName > b.displayName) {
        return 1;
      }
      if (a.displayName < b.displayName) {
        return -1;
      }
      return 0;
    });
    setAgents([...results]);
  }
  
  

  
  return (
    <>
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexWrap:"wrap", flexDirection:"row"}}>
      <TextField label="buscar agente" value={search} onChange={searcher} variant="outlined" sx={{margin:"1rem"}}/>
      <Button sx={{margin:"1rem"}}>Ordenar por rol</Button>
      <Button  sx={{margin:"1rem"}}>Filtrar controladores</Button>
      <Button  sx={{margin:"1rem"}}>Ordenar por nombre</Button>
      <Button   sx={{margin:"1rem"}}>Ordenar por nombre descendente</Button>
    </Box>  
      <Box sx={{display:"flex", justifyContent:"center", flexWrap:"wrap", flexDirection:"row"}}>
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
              <Box sx={{textOverflow:"ellipsis"}}>
                <Typography variant="body2" textOverflow="ellipsis">
                  {agent.description}
                </Typography>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
        
        ))  
        }
      </Box>
    </>
  );
}