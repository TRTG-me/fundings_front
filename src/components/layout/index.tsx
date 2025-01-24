import React, { FC, useEffect, useState } from 'react'
import TopBarComponent from '../top-bar'
import { Outlet, useLocation } from 'react-router-dom'
import { useMediaQuery, Box } from '@mui/material'
import SidebarComponent from '../sidebar'
import { useStyles } from './styles'
import { getPublicUser } from '../../store/thunks/auth'
import { useAppDispatch } from '../../utils/hook'

const LayoutComponent: FC = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true)
  const location = useLocation()
  const isNonMobile = useMediaQuery('(min-width:760px)');
  const classes = useStyles()
  const dispatch = useAppDispatch()

  return (
    location.pathname === '/login' || location.pathname === '/register' ?
      (
        <>
          <Outlet />
        </>
      ) :
      (<Box display={isNonMobile ? 'flex' : 'block'}
        justifyContent='space-between'
        width='100%' height='100%'>
        <SidebarComponent
          isNonMobile={isNonMobile}
          drawerWidth='250px'
          isOpen={isOpen}
          setIsOpen={setIsOpen}

        />
        <Box className={classes.mainSection}>
          <TopBarComponent
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            isNonMobile={isNonMobile}
          />
          <Outlet />
        </Box>
      </Box>

      )

  )
}

export default LayoutComponent