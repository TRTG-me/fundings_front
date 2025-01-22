
import AssetsTableComponent from '../assets_table';
import { ITablePriceData } from '../../common/types/assets';
import { FC } from 'react';



const TopPriceComponent: FC<ITablePriceData> = (props: ITablePriceData): JSX.Element => {
    const {assets} = props
    return <AssetsTableComponent assets={assets}/>
}

export default TopPriceComponent