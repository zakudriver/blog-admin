import { History, Location } from 'history';

declare global {
  interface IRouteComponentProps {
    location?: Location;
    history?: History;
    match?: any;
  }
}
