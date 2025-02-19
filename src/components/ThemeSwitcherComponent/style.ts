import { makeStyles } from '@mui/styles'
import { Theme } from '@mui/material'
import { tokens } from '../../theme'

export const useStyles = makeStyles((theme: Theme) => {
    const colors = tokens(theme.palette.mode)

    return {
        iconBlock: {
            paddingRight: '15px',
            paddingTop: '8px'


        },
        themeIcon: {
            marginRight: '45px',
        },
    }
})