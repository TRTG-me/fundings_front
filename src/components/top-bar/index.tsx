import { AppBar, Box, Toolbar, Typography } from '@mui/material'
import React, { FC } from 'react'
import { MenuOutlined } from '@mui/icons-material';

import { useStyles } from './styles';

import FlexBetween from '../Flex-Between/indext';
import { ITopBarProps } from '../../common/types/topbar';
import ThemeSwitcherComponent from '../ThemeSwitcherComponent';
import SearchBarComponent from '../Search-block';
import { useAppSelector } from '../../utils/hook';

const TopBarComponent: FC<ITopBarProps> = (props: ITopBarProps): JSX.Element => {

  const classes = useStyles()
  const { setIsOpen, isOpen, isNonMobile } = props
  const { user } = useAppSelector((state) => state.auth.user)

  return (
    <AppBar className={classes.root} position="static">
      <Toolbar className={classes.toolBar}>
        <FlexBetween>
          <MenuOutlined className={classes.menuIcon} onClick={() => setIsOpen(!isOpen)} />
          <Typography variant='h3'>
            Welcome TORTUGA
          </Typography></FlexBetween>
        {isNonMobile && (
          <Box display='flex'>

            <ThemeSwitcherComponent />
            <SearchBarComponent />

          </Box>)}
      </Toolbar>
    </AppBar>

  )
}

export default TopBarComponent
