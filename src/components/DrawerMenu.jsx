import React from 'react'
import {
  Box,
  List,
  ListSubheader,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'

/**
 * DrawerMenu recibe:
 *  - items: array de escenas
 *  - currentIndex: índice de la escena activa
 *  - completed: objeto elecciones (sceneId => opcionId)
 *  - categories: objeto { key: label }
 *  - onSelect: función (newIndex) al hacer click
 */
const DrawerMenu = ({ items, currentIndex, completed, categories, onSelect }) => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List disablePadding>
        {Object.entries(categories).map(([catKey, catLabel]) => {
          // Filtrar items de esta categoría
          const escenasCat = items
            .map((item, idx) => ({ ...item, idx }))
            .filter(item => item.categoria === catKey)
          if (escenasCat.length === 0) return null

          return (
            <React.Fragment key={catKey}>
              <ListSubheader>{catLabel}</ListSubheader>
              {escenasCat.map(({ id, titulo, idx }) => (
                <ListItemButton
                  key={id}
                  selected={idx === currentIndex}
                  onClick={() => onSelect(idx)}
                >
                  <ListItemText primary={titulo} />
                  {completed[id] && (
                    <ListItemIcon sx={{ minWidth: 'auto', ml: 1 }}>
                      <CheckIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                  )}
                </ListItemButton>
              ))}
              <Divider />
            </React.Fragment>
          )
        })}
      </List>
    </Box>
  )
}

export default DrawerMenu
