import React, { FC, useContext } from 'react'
import { Grid2, IconButton, useTheme } from '@mui/material'
import { DarkMode, LightMode, NotificationsNone } from '@mui/icons-material'
import { ColorModeContext } from '../../theme'
import { useStyles } from './style'

const ThemeSwitcherComponent: FC = (): JSX.Element => {
    const theme = useTheme()
    const colorMode: any = useContext(ColorModeContext)
    const classes = useStyles()

    return (
         <Grid2  className={classes.iconBlock}>
                    <IconButton onClick={colorMode.toggleColorMode} className={classes.themeIcon}>
                      {theme.palette.mode === 'dark' ? (<DarkMode />) : (<LightMode />)}
                    </IconButton>
                    <IconButton>
                      <NotificationsNone />
                    </IconButton>
                  </Grid2>
    )
}

export default ThemeSwitcherComponent