import React from 'react';
import Home from './pages/home';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/router/privateRoute';
import AuthRootComponent from './components/auth';
import { ColorModeContext, useMode } from './theme';
import { ThemeProvider, CssBaseline } from '@mui/material';
import LayoutComponent from './components/layout';
import WatchListCOmponent from './pages/watchlist';
import NewsComponent from './pages/News';
import SettingsComponent from './pages/settings/settings';
import SingleAssetPage from './pages/single-asset';

function App() {
  const [theme, colormode] = useMode()
  return (
    <ColorModeContext.Provider value={colormode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <div className="app">
          <Routes>
            <Route element={<LayoutComponent />}>
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/" element={<Home />} />
              <Route path="/watchlist" element={<WatchListCOmponent />} />
              <Route path="/news" element={<NewsComponent />} />
              <Route path="/settings" element={<SettingsComponent />} />
              <Route path="/single/:id" element={<SingleAssetPage />} />
              {/* </Route> */}
              {/* <Route path="Login" element={<AuthRootComponent />} />
              <Route path="Register" element={<AuthRootComponent />} /> */}
            </Route>
          </Routes>
        </div>

      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
