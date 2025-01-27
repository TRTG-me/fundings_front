
import { ITableTopCoins } from '../../common/types/assets';
import AssetsTableComponent from '../assets_table';
import { FC } from 'react';



const TopPriceComponent: FC<ITableTopCoins> = ({ coins, GoodBad }): JSX.Element => {

    return <AssetsTableComponent coins={coins} GoodBad={GoodBad} />
}

export default TopPriceComponent