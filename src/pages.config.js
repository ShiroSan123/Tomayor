/**
 * pages.config.js - Page routing configuration
 * 
 * This file is AUTO-GENERATED. Do not add imports or modify PAGES manually.
 * Pages are auto-registered when you create files in the ./pages/ folder.
 * 
 * THE ONLY EDITABLE VALUE: mainPage
 * This controls which page is the landing page (shown when users visit the app).
 * 
 * Example file structure:
 * 
 *   import HomePage from './pages/HomePage';
 *   import Dashboard from './pages/Dashboard';
 *   import Settings from './pages/Settings';
 *   
 *   export const PAGES = {
 *       "HomePage": HomePage,
 *       "Dashboard": Dashboard,
 *       "Settings": Settings,
 *   }
 *   
 *   export const pagesConfig = {
 *       mainPage: "HomePage",
 *       Pages: PAGES,
 *   };
 * 
 * Example with Layout (wraps all pages):
 *
 *   import Home from './pages/Home';
 *   import Settings from './pages/Settings';
 *   import __Layout from './Layout.jsx';
 *
 *   export const PAGES = {
 *       "Home": Home,
 *       "Settings": Settings,
 *   }
 *
 *   export const pagesConfig = {
 *       mainPage: "Home",
 *       Pages: PAGES,
 *       Layout: __Layout,
 *   };
 *
 * To change the main page from HomePage to Dashboard, use find_replace:
 *   Old: mainPage: "HomePage",
 *   New: mainPage: "Dashboard",
 *
 * The mainPage value must match a key in the PAGES object exactly.
 */
import Actuated from './pages/Actuated.jsx';
import Events from './pages/Events.jsx';
import Ferry from './pages/Ferry.jsx';
import Home from './pages/Home.jsx';
import Market from './pages/Market.jsx';
import News from './pages/News.jsx';
import Payments from './pages/Payments.jsx';
import Transport from './pages/Transport.jsx';
import Wrestling from './pages/Wrestling.jsx';
import Ysyakh from './pages/Ysyakh.jsx';
import Traditions from './pages/Traditions.jsx';
import Sports from './pages/Sports.jsx';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Actuated": Actuated,
    "Events": Events,
    "Ferry": Ferry,
    "Home": Home,
    "Market": Market,
    "News": News,
    "Payments": Payments,
    "Transport": Transport,
    "Wrestling": Wrestling,
    "Ysyakh": Ysyakh,
    "Traditions": Traditions,
    "Sports": Sports,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};