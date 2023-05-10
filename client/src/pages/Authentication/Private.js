import React, { useState, useEffect } from "react";
import { useNavigate, Link as RouterLink, Outlet } from "react-router-dom";
import axios from "axios";
import { Link } from "@mui/material";
import { APIService } from "config";

const Private = () => {
    const [authorised, setAuthorised] = useState(true);
    let navigate = useNavigate();

    useEffect(() => {
    
        if (!localStorage.getItem("authToken")) {
            navigate("/login");
        }

        const Authenticate = async () => {
            const token = localStorage.getItem("authToken");
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
                console.log("data: ", data.success)
                setAuthorised(data.success);

                navigate("/farmer/farm/my-fields")
            }
            catch (error) {
                localStorage.removeItem("authToken");
                setAuthorised(false);
                navigate("/login");
            }
        };
        Authenticate()
        window.addEventListener("storage", Authenticate, false);
    }, []);
    return (
        <>
            {!authorised ? (
                <>
                    you are not authorised. please click{" "}
                    <Link
                        component={RouterLink}
                        variant="subtitle2"
                        to="/login"
                        underline="hover"
                    >
                        Here
                    </Link>
                </>
            ) : (
                <Outlet />
            )}
        </>
    );
};

export default Private;
