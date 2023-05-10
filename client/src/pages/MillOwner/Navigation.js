import AddToPhotosIcon from '@mui/icons-material/AddToPhotos';
import ConnectWithoutContactIcon from '@mui/icons-material/ConnectWithoutContact';
import ForestIcon from '@mui/icons-material/Forest';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Card, Divider, CardContent, Stack, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import { useLocation, useNavigate } from "react-router-dom";
import CategoryIcon from '@mui/icons-material/Category';

const NavItems = [
  {
    group: false,
    name: 'Products',
    route: 'products',
    icon: <CategoryIcon />,
  }
]
const MillOwnerNavigation = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const path = location.pathname
  const route = path.substring(path.lastIndexOf('/') + 1)
  console.log(route)


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
                      <ListItem key={index} sx={{ borderRadius: 4 }} disablePadding selected={(nav.route === route)} as={Link} color='inherit' underline='none' onClick={() => navigate(`${nav_item.route}/${nav.route}`)} >
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

export default MillOwnerNavigation