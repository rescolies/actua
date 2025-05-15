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
 * @param {Object[]} items       – array de escenas
 * @param {number}   currentIndex– escena activa
 * @param {Object}   completed   – elecciones { sceneId: opcionId }
 * @param {Object}   categories  – { key: label }
 * @param {fn}       onSelect    – fn(newIndex)
 */
const DrawerMenu = ({ items, currentIndex, completed, categories, onSelect }) => {
  return (
    <Box
      sx={{
        width: 250,
        height: '100%',
        overflowY: 'auto',        // <-- permite scroll
        bgcolor: 'background.paper'
      }}
      role="presentation"
    >
      <List disablePadding>
        {Object.entries(categories).map(([catKey, catLabel]) => {
          // filtramos por categoría
          const escenasCat = items
            .map((item, idx) => ({ ...item, idx }))
            .filter(item => item.categoria === catKey)
          if (!escenasCat.length) return null

          return (
            <React.Fragment key={catKey}>
              <ListSubheader
                sx={{
                  fontSize: '1rem',    // <-- un poco más grande
                  lineHeight: 2,
                  bgcolor: 'background.paper'
                }}
              >
                {catLabel}
              </ListSubheader>

              {escenasCat.map(({ id, titulo, idx }) => (
                <ListItemButton
                  key={id}
                  selected={idx === currentIndex}
                  onClick={() => onSelect(idx)}
                >
                  <ListItemText
                    primary={titulo}
                    primaryTypographyProps={{
                      fontSize: '0.875rem'  // <-- un poco más pequeño
                    }}
                  />
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
