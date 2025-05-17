import React, { useState, useEffect } from 'react';
import { Stack, Typography, TextField, Button, Box } from '@mui/material';
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

  useEffect(() => {
    fetch('/api/getAlumnos', {
      headers: {
        // si hubiera token guardado, lo mandamos
        'Authorization': 'Bearer ' + localStorage.getItem('docente_token') || ''
      }
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
    const res = await fetch('/api/crearAlumno', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('docente_token') || ''
      },
      body: JSON.stringify({ nombre: name.trim() })
    });

    if (res.ok) {
      setUsuarios([...usuarios, name.trim()]);
      login(name.trim());
    } else {
      console.error('Error al crear alumno');
    }
  };

  const handleDocenteLogin = async () => {
    const pw = window.prompt('Clave del Docente:');
    if (!pw) return;
    const res = await fetch('/api/loginDocente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: pw })
    });
    if (res.ok) {
      const { token } = await res.json();
      localStorage.setItem('docente_token', token);
      setDocente(true);
    } else {
      alert('Clave incorrecta');
    }
  };

  return (
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

      <Button variant="text" color="secondary" onClick={handleDocenteLogin}>
        ACCEDER COMO DOCENTE
      </Button>
    </Stack>
  );
}
