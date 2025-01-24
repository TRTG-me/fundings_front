
import { ITableTopCoins } from '../../common/types/assets';
import AssetsTableComponent from '../assets_table';
import { FC } from 'react';



const TopPriceComponent: FC<ITableTopCoins> = (props: ITableTopCoins): JSX.Element => {
    const { coins } = props
    return <AssetsTableComponent coins={coins} />
}

export default TopPriceComponent