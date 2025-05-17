import React, { useState, useEffect } from 'react';
import {
  Stack,
  Typography,
  TextField,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useActua } from '../context/ActuaContext';
import textos from '../textos';

const isValidName = name => /^[A-Za-zÀ-ÿ\s]{2,30}$/.test(name.trim());

export default function IngresoAlumno() {
  const { login, idioma, setDocente } = useActua();
  const ui = textos[idioma].ui;

  const [usuarios, setUsuarios] = useState([]);
  const [name, setName] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Estados para login docente
  const [showLogin, setShowLogin] = useState(false);
  const [senha, setSenha] = useState('');
  const [loginError, setLoginError] = useState('');

  // Al montar, carga lista de alumnos (si ya estás autenticado como docente)
  useEffect(() => {
    const token = localStorage.getItem('docente_token');
    fetch('/api/getAlumnos', {
      headers: token
        ? { Authorization: 'Bearer ' + token }
        : {}
    })
      .then(res => res.json())
      .then(json => setUsuarios(json.map(a => a.nombre)))
      .catch(() => setUsuarios([]))
      .finally(() => setLoading(false));
  }, []);

  const handleNew = async () => {
    if (!isValidName(name)) {
      setError(true);
      return;
    }
    setError(false);

    const token = localStorage.getItem('docente_token');
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers.Authorization = `Bearer ${token}`;

    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers,
      body: JSON.stringify({ nombre: name.trim() })
    });

    if (res.ok) {
      setUsuarios([...usuarios, name.trim()]);
      login(name.trim());
    } else {
      console.error('Error al crear alumno', await res.text());
    }
  };

  // Función para hacer login de docente
  const handleDocenteLogin = async () => {
    setLoginError('');
    if (!senha) {
      setLoginError('Introduce la contraseña');
      return;
    }
    try {
      const res = await fetch('/api/loginDocente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: senha })
      });
      if (!res.ok) {
        setLoginError('Contraseña incorrecta');
        return;
      }
      const { token } = await res.json();
      localStorage.setItem('docente_token', token);
      setDocente(true);
      setShowLogin(false);
      setSenha('');
    } catch {
      setLoginError('Error de conexión');
    }
  };

  return (
    <>
      <Stack spacing={4} alignItems="center" sx={{ mt: 6 }}>
        {!loading && usuarios.length > 0 && (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              {ui.ingresoPrompt}:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center">
              {usuarios.map(u => (
                <Button key={u} variant="outlined" onClick={() => login(u)}>
                  {u}
                </Button>
              ))}
            </Stack>
          </Box>
        )}

        <Typography variant="h6">{ui.ingresoPrompt}</Typography>
        <TextField
          label={ui.ingresoLabel}
          value={name}
          onChange={e => { setName(e.target.value); setError(false); }}
          error={error}
          helperText={error ? ui.ingresoError : ''}
        />
        <Button variant="contained" onClick={handleNew} disabled={!name.trim()}>
          {ui.ingresoButton}
        </Button>

        <Button
          variant="text"
          color="secondary"
          onClick={() => setShowLogin(true)}
        >
          ACCEDER COMO DOCENTE
        </Button>
      </Stack>

      {/* Diálogo de login de docente */}
      <Dialog open={showLogin} onClose={() => setShowLogin(false)}>
        <DialogTitle>Acceso Docente</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Contraseña"
            type="password"
            fullWidth
            value={senha}
            onChange={e => setSenha(e.target.value)}
            error={!!loginError}
            helperText={loginError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLogin(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleDocenteLogin}>
            Acceder
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
