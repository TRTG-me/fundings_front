import { makeStyles } from '@mui/styles'
import { tokens } from '../../theme'
import { Theme } from '@mui/material'

export const useStyles = makeStyles((theme: Theme) => {
    const colors = tokens(theme.palette.mode)
    return {
        root: {
            padding: 32,
            alignItems: 'center',
        },
        assetName: {
            display: 'flex',
            justifyContent: 'center',
            margin: '50px 0 !important',
        },
        card: {
            display: 'flex',
            justifyContent: 'center',
        },
        cardItem: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '20px 16px',
            width: '100%',
            maxWidth: 500,
            minHeight: 185,
            marginBottom: '25px !important',
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
        },
        assetIcon: {
            marginRight: 2,
        },
        assetSymbol: {
            fontSize: '20px !important',
            fontWeight: 600,
        },
        cardTitle: {
            fontSize: '20px !important',
            fontWeight: 600,
            marginRight: 2
        },
        assetPrice: {
            fontSize: '20px !important',
        },
        assetPriceDetail: {
            fontSize: '20px !important',
        },
        trendUp: {
            color: '#A9FFA7',
        },
        trendDown: {
            color: '#FFA7A7',
        },
        cardButtonBlock: {
            marginTop: 20,

        },
        cardButton: {
            '&:first-child': {
                marginRight: 20,
            },
        },
        topPriceRoot: {
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '20px 16px',
            marginBottom: 32,
            minHeight: 100,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
            '& .MuiPaper-root': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                backgroundImage: 'none !important',
            },
        },
        bidask: {
            backgroundColor: `${theme.palette.mode === 'light'
                ? colors.primary.DEFAULT
                : colors.primary[600]
                }`,
            padding: '20px 16px',
            marginBottom: 32,
            minHeight: 100,
            border: `1px solid ${colors.borderColor}`,
            borderRadius: 12,
            '& .MuiPaper-root': {
                backgroundColor: 'transparent !important',
                boxShadow: 'none !important',
                backgroundImage: 'none !important',
            },
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
    }
})