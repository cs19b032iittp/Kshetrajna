import { Box, Button } from "@mui/material";

export default function Info(props) {
    return (
        <Box sx={{textAlign:"left", marginLeft: 45, marginRight: 45 }}>
        <div>
            <p style={{fontWeight: "bold"}}> What is my role?</p>
            <p> {props.role} </p>
        </div>
        
        <div>
            <p style={{fontWeight: "bold"}}>Benefits I get?</p>
            <p> {props.benefit} </p>

        </div>
        <Button>Signup</Button>    
        </Box>
    );
}