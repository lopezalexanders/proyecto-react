import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate} from 'react-router-dom';
import { useAlert, useAxios } from '../../hooks';
import { useAuth } from '../../hooks/useAuth';
import type { ActionState } from '../../interfaces';
import { createInitialState, handleZodError } from '../../helpers';
import {  useActionState, useState } from "react";
import { schemaTask, type TaskFormValues } from '../../models/task.model';
import Checkbox from '@mui/material/Checkbox';;

export type TaskActionState = ActionState<TaskFormValues>;
const initialState = createInitialState<TaskFormValues>();

export const NewtaskPage = () => {
    const { showAlert } = useAlert();
  const navigate = useNavigate();
  const axios = useAxios();

  const { token } = useAuth();
  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  const createTaskApi = async (
    _: TaskActionState | undefined,
        formData: FormData,
      ): Promise<TaskActionState | undefined> =>{
        const rawData: TaskFormValues = {
              name: formData.get('name') as string,
              done: formData.get('done') as unknown as boolean,
            };
        try {     
            schemaTask.parse(rawData);
            await axios.post('/tasks', {
              name: rawData.name,
              done: rawData.done,
            });
            showAlert('Tarea creada', 'success');
            navigate('/tasks');

        } catch (error) {
            console.error(error);
            const err = handleZodError<TaskFormValues>(error, rawData);
            showAlert(err.message, 'error');
            return err;
      }
    return;
  };

  const [state, submitAction, isPending] = useActionState(
    createTaskApi,
    initialState,
  );

const [done, setDone] = useState<boolean>(false);

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: '100vh',
          textAlign: 'center',
        }}
      >
        <Paper elevation={1} sx={{ padding: 4, width: '100%' }}>
          <Typography component={'h1'} variant="h4" gutterBottom>
            NUEVA TAREA
          </Typography>

          <Box component={'form'} action={submitAction} sx={{ mt: 10, width: '50%', padding: 4, margin: '0 auto' }}>
            <TextField
              name="name"
              required
              fullWidth
              label="Nombre de la tarea"
              sx={{ mt: 3, mb: 2, height:  40 }}
              type="text"
              autoComplete="name"
            />
            <Checkbox
              name="done"
              checked={done}
              onChange={(event) => { setDone(event.target.checked); }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, height:  40 }}
              disabled={isPending}
              startIcon={
                isPending ? (
                  <CircularProgress size={20} color="inherit" />
                ) : null
              }
            >
              {isPending ? 'Creando...' : 'Crear Tarea'}
            </Button>
            <Link to={'/tasks'}>Regresar a la lista de tareas</Link>
          </Box>
        </Paper>
      </Box>            
    </Container>
  );
};


