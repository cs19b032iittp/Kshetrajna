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
import { useNavigate } from "react-router-dom";

const NavItems = [
  {
    group: true,
    name: 'Farm',
    route: 'farm',
    icon: <></>,
    children: [
      {
        group: false,
        name: 'My Fields',
        route: 'my-fields',
        icon: <ForestIcon />
      },
      {
        group: false,
        name: 'Add Field',
        route: 'add-field',
        icon: <AddToPhotosIcon />
      },
    ]
  },
  {
    group: true,
    name: 'Connect',
    route: 'connect',
    icon: <></>,
    children: [
      {
        group: false,
        name: 'Consultants',
        route: 'consultants',
        icon: <PeopleAltIcon />
      },
      {
        group: false,
        name: 'Data Providers',
        route: 'data-providers',
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
const FarmerNavigation = () => {
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

      <Card sx={{ minWidth: 250, bgcolor: 'grey.300', borderRadius: 5, p: 2 }}>
        <CardContent sx={{ mt: -2 }}>
          <Stack>
            <img src='https://climatestyles.netlify.app/assets/2.2183248b.png' alt='weather'/>
            <Typography gutterBottom variant="h6" sx={{ textAlign: 'center' }} component="div">
              30 °C
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </>
  )
}

export default FarmerNavigation