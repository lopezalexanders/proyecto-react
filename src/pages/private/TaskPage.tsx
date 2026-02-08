import { Container, Box, Typography, Button}from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import {  useAxios } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import {  useEffect, useState } from "react";


interface Tarea {
  id: number;
  name: string;
  done: boolean;
} 

export const TaskPage = () => {
  const axios = useAxios();
  const navigate = useNavigate();
  const [rows, setRows] = useState<Tarea[]>([]);

  const { token } = useAuth();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const getTaskApi = async (
    ): Promise<Tarea[]> => {

    try {
      const listatareas = await axios.get<any>('/tasks', {
        headers
      });
      console.log('Tareas obtenidas 1:', listatareas.data.data);
      if (Array.isArray(listatareas.data)) {
        console.log('Tareas obtenidas 2:', listatareas.data);
        return (listatareas.data);
      }
      if (listatareas.data && Array.isArray(listatareas.data.data)) {
        return listatareas.data.data;
      }

    } catch (error) {
      console.error(error);
    }
    return [];
  };

  const getListTask = async (): Promise<void> => {
    const tasks = await getTaskApi();
    setRows(tasks);
    console.log(typeof tasks);
    console.log(Array.isArray(tasks));
    console.log(tasks);
  };

  const deleteTaskApi = async (id: number): Promise<void> => {
    try {
      await axios.delete(`/tasks/${id}`, {
        headers
      });
      getListTask();
    } catch (error) {
      console.error(error);
    }
  };

   const updateestadoTaskApi = async (id: number, done: boolean): Promise<void> => {
    try {
      console.log('Actualizando estado de la tarea con ID:', id);
      await axios.patch<any>(`/tasks/${id}`, { done: done ? false : true }, {
        headers
      });
      getListTask();
    } catch (error) {
      console.error(error);
    }
  };
  
useEffect(() => {
  const cargartareas = async () => {
    try {
      await getListTask();
   } catch (error) {
     console.error(error);
   }
  }
  cargartareas();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleDelete = async (id: number) => {
    if (window.confirm("¿Estás seguro de eliminar esta tarea?")) {
      await deleteTaskApi(id);
    }
  };

  const handleUpdateEstado = async (id: number, done: boolean) => {
    if (window.confirm("¿Estás seguro de cambiar esta tarea?")) {
      await updateestadoTaskApi(id,done);
    }
  };

  return (
    <Container>
      <Box>
          <Link to={'/newtasks'}>Registrar nueva Tarea</Link>
      </Box>
      <Box>
          <Typography component={'h1'} variant="h4" gutterBottom>
            Lista de Tareas
          </Typography>
          <Paper sx={{ height: 400, width: '100%' }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead sx={{ backgroundColor: '#2AA63E' }}>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Actividad</TableCell>
                    <TableCell>Estado</TableCell>   
                    <TableCell>Acciones</TableCell>     
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 }, ...(row.done ? { backgroundColor: '#e0f7fa' } : {}) }}
                    >
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell >{row.name}</TableCell>
                      <TableCell >{row.done ? 'Completada' : 'Pendiente'}</TableCell>
                      <TableCell >
                        <Button size="small" color="primary"  onClick={() => handleUpdateEstado(row.id, row.done ? true : false)}>
                          Cambiar estado
                        </Button>
                        <Button size="small" color="error" startIcon={<DeleteIcon />} onClick={() => handleDelete(row.id)}>
                          Eliminar
                        </Button>
                        <Button size="small" color="secondary" startIcon={<EditIcon />} onClick={() => navigate(`/tasks/${row.id}`)}>
                          Actualizar
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
      </Box>
    </Container>
  );
};



