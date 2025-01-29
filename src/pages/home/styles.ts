import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
    const colors = tokens(theme.palette.mode)
    return {
        root: {
            flexGrow: 1,
            padding: '32px',
        },
        topCardItem: {
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '16px 16px',
            minHeight: 'auto',
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
        },
        assetName: {
            fontSize: 25,
            fontWeight: 600,
            lineHeight: '5px',
            textTransform: 'capitalize',
        },
        itemDetails: {
            display: 'flex',
            height: '80%',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            paddingBottom: '16px',
            gap: '1px'
        },
        cardPrice: {
            fontSize: 32,
            fontWeight: 700,
            flexDirection: 'column',
            lineHeight: '5px',

        },
        priceTrend: {
            width: 80,
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
            borderRadius: 4,
        },
        trendUp: {
            backgroundColor: '#A9FFA7',
            color: '#037400',
        },
        trendDown: {
            backgroundColor: '#FFA7A7',
            color: '#740000',
        },
        areaChart: {
            marginBottom: 32,
        },
        lineChartBlock: {
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '16px 16px',
            minHeight: 'auto',
            marginBottom: 32,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
        },
        topPriceRoot: {
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '20px 16px',
            marginBottom: 32,
            minHeight: 'auto',
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
            '& .MuiPaper-root': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                backgroundImage: 'none !important',
            },
        },
        buttonBlock: {
            marginTop: 32,
            display: 'flex',       // Добавляем flex-контейнер
            //justifyContent: 'center', // Центрируем по горизонтали
            //alignItems: 'center',    // Центрируем по вертикали (если нужно)
        },
        rootFields: {
            '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                    borderColor: colors.blue,
                },
            },
            '& label.Mui-focused': {
                color: `${theme.palette.mode === 'dark'
                    ? colors.white.DEFAULT
                    : colors.black.DEFAULT
                    }`,
            },
        },
        formWrapper: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 40
        },
        inputField: {
            width: '25%',
            marginBottom: '15px !important',
        },
    }
})