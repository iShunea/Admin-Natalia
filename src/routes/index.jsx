import { createBrowserRouter } from 'react-router-dom';

// project-imports
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import ComponentsRoutes from './ComponentsRoutes';
import config from 'config/runtime-config';

// ==============================|| ROUTES RENDER ||============================== //

const router = createBrowserRouter([LoginRoutes, ComponentsRoutes, MainRoutes], { basename: config.BASE_NAME });

export default router;
