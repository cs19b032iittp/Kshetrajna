import { Agriculture } from '@mui/icons-material';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Divider } from '@mui/material';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useNavigate } from "react-router-dom";

const NavItems = [
  {
    group: true,
    name: 'Requests',
    route: 'requests',
    icon: <></>,
    children: [
      {
        group: false,
        name: 'Farmer',
        route: 'farmer',
        icon: <Agriculture />
      },
      {
        group: false,
        name: 'Model Builder',
        route: 'model-builder',
        icon: <PeopleAltIcon />
      },
      {
        group: false,
        name: 'Data Provider',
        route: 'data-provider',
        icon: <ConnectWithoutContactIcon />
      },
    ]
  },
  {
    group: true,
    name: 'Prediction',
    route: 'prediction',
    icon: <></>,
    children: [
      {
        group: false,
        name: 'Predict',
        route: 'predict',
        icon: <PeopleAltIcon />
      },
    ]
  }
]
const ConsultantNavigation = () => {
  const navigate = useNavigate();

  return (
    <>

      {NavItems.map((nav_item, index) =>
        <>
          {nav_item.group ?
            <>
              {index !== 0 ? <Divider /> : <></>}
              <List>
                <ListSubheader> {nav_item.name} </ListSubheader>
                {nav_item.children.map((nav) =>
                  <>
                    {
                      <ListItem key={index} sx={{ borderRadius: 4 }} disablePadding as={Link} color='inherit' underline='none' onClick={() => navigate(`${nav_item.route}/${nav.route}`)} >
                        <ListItemButton sx={{ borderRadius: 4 }}>
                          <ListItemIcon>
                            {nav.icon}
                          </ListItemIcon>
                          <ListItemText primary={`${nav.name}`} />
                        </ListItemButton>
                      </ListItem>
                    }
                  </>
                )}
              </List>

            </> :
            <>
              <List>
                <ListItem key={index} sx={{ borderRadius: 4 }} disablePadding as={Link} color='inherit' underline='none' onClick={() => navigate(`${nav_item.route}`)} >
                  <ListItemButton sx={{ borderRadius: 4 }}>
                    <ListItemIcon>
                      {nav_item.icon}
                    </ListItemIcon>
                    <ListItemText primary={`${nav_item.name}`} />
                  </ListItemButton>
                </ListItem>
              </List>
            </>}
        </>
      )}
    </>
  )
}

export default ConsultantNavigation