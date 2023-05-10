import { LinearProgress } from "@mui/material";
import axios from "axios";
import { APIService } from "config";
import Landing from "pages/Landing";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const routing = {
    "Farmer" : "/farmer/farm/my-fields",
    "Consultant" : "consultant/farming/farms",
    "Mill Owner" : "mill_owner/products"

}
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
                    const url = APIService + "/api/private"
                    const { data } = await axios.get(url, config);
                    console.log(data)
                    
                    setAuthorised(2);

                    localStorage.setItem("id", data.id )
                    navigate(routing[data.role])
                }
                catch (error) {
                    console.log("got into catch")
                    console.log(error.message)
                    localStorage.removeItem("id")
                    localStorage.removeItem("authToken");
                    setAuthorised(1);
                    navigate("/");
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
            default:
                return <LinearProgress />
        }
    }
    return (

        <Render />

    );
};

export default Private;
