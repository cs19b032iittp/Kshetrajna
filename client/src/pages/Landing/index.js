import NavBar from "components/NavBar";
import { Box, ThemeProvider } from '@mui/system';
import CustomTabs from "components/Tabs";
import Carousel from "components/carousel";

export default function LandingPage() {
    return (
        <>
         <NavBar />
          <div style={{textAlign: 'center'}}>
            <Box sx={{fontSize: 50, fontWeight: 'bold', color: '#11ad2e', marginTop: 8}}>One Stop Platform for your Agricultular Needs</Box>
            <div style={{marginLeft: 'auto', marginRight: 'auto', width: '65%'}}>
              <Carousel />
            </div>
            <p style={{fontSize: 30}}>Roles supported on our Platform</p>
            <CustomTabs/>
          </div> 
        </>
    )
}