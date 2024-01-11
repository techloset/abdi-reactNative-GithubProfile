import HomeScreen from '../screens/HomeScreen';
import RepoScreen from '../screens/RepoScreen';
import UserScreen from '../screens/UserScreen';
import SCREENS from './SCREENS';

const NAVIGATION = [
  {
    screenName: SCREENS.HOME,
    component: HomeScreen,
  },
  {
    screenName: SCREENS.USER_INFO,
    component: UserScreen,
  },
  {
    screenName: SCREENS.REPO_INFO,
    component: RepoScreen,
  },
];

export default NAVIGATION;
