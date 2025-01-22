import React, { FC, useEffect, useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Box, Grid2, useTheme } from '@mui/material';
import { tabProps } from '../../utils/helpers'
import TabPanel from '../../components/tab-panel'
import { tokens } from '../../theme';
import { useStyles } from './styles';
import SettingsPersonalInfoComponent from '../../components/settings-personal-info';
import { useAppDispatch } from '../../utils/hook';
import { getPublicUser } from '../../store/thunks/auth';
import ChangePasswordComponent from '../../components/change-password';
import DeleteUserComponent from '../../components/delete_user';

const SettingsComponent:FC = ():JSX.Element => {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const classes = useStyles()
  const dispatch = useAppDispatch()
          useEffect(() => {
          dispatch(getPublicUser())
                 
      }, [dispatch])
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }
  return (
    <Grid2 className={classes.root}>
    <Box className={classes.tabsWrapper}>
    <Tabs 
          value={value} 
          onChange={handleChange} 
          aria-label="Settings tabs"
          centered
          textColor='secondary'
          TabIndicatorProps={{
            style:{
              backgroundColor: colors.blue,
            },
          }}>
      <Tab label="Персональные данные" {...tabProps(0)} />
      <Tab label="Изменить пароль" {...tabProps(1)} />
      <Tab label="Удалить аккаунт" {...tabProps(2)} />
    </Tabs>
  </Box>
  <TabPanel value={value} index={0}>
    <SettingsPersonalInfoComponent />
  </TabPanel>
  <TabPanel value={value} index={1}>
    <ChangePasswordComponent />
  </TabPanel>
  <TabPanel value={value} index={2}>
    <DeleteUserComponent />
  </TabPanel>
  </Grid2>
  )
}

export default SettingsComponent