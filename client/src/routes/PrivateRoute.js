import { LinearProgress } from "@mui/material";
import axios from "axios";
import Landing from "pages/Landing";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Private = () => {
    const [authorised, setAuthorised] = useState(0);
    let navigate = useNavigate();

    useEffect(() => {

        const Authenticate = async () => {
            setAuthorised(0)
            const token = localStorage.getItem("authToken");
            if (token) {
                const config =
                {
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                };
                try {
                    const { data } = await axios.get("/api/private", config);
                    console.log("data: ", data.success)
                    setAuthorised(2);

                    navigate("/farmer/farm/my-fields")
                }
                catch (error) {
                    console.log("got into catch")
                    localStorage.removeItem("authToken");
                    setAuthorised(1);
                    navigate("/login");
                }
            }
            else {
                setAuthorised(1)
            }
        };
        Authenticate()
        window.addEventListener("storage", Authenticate, false);
    }, []);

    const Render = () => {
        switch (authorised) {
            case 0:
                return <LinearProgress />;
            case 1:
                return <Landing />
            case 2:
                return <Outlet />
        }
    }
    return (
        <>
            <Outlet />
        </>
    );
};

export default Private;
