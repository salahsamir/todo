import React, { ReactNode, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

interface IAlerts {
    children: ReactNode;
}

function ProductRoute({ children }: IAlerts) {
    const [data, setData] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        setData(token)
    }, []);

    if (data === null) {
        // While checking the token, you can show a loading spinner or similar
        return <div>Loading...</div>;
    }

    return data ? children : <Navigate to="/login" />;
}

export default ProductRoute;
