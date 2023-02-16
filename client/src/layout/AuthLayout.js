import { Link } from "@mui/material";
import Box from "@mui/material/Box";
import Logo from "components/Logo";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        <>
            <Box
                sx={{
                    background: "rgb(249, 250, 251)",
                    height: "100vh",
                    display: "grid",
                    placeItems: "center",
                }}
                color="neutral"
                variant="soft"
            >
                <Box
                    sx={{
                        background: "#fff",
                        maxWidth: 480,
                        padding: 5,
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        borderRadius : 4
                    }}
                >
                    <Box>
                        <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                            <Link href="/">
                                <Logo />
                            </Link>
                        </Box>
                        <Outlet />
                    </Box>
                </Box>
            </Box>
        </>
    );
};

export default AuthLayout;
