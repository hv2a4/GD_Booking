import React from "react";
import LayoutAdmin from "../../../../components/layout/admin/DefaultLayout";
import Account from "./client";
const AccountClient = () => {
    return (
        <LayoutAdmin>
            <div className="container-fluid">
                <Account/>
            </div>
        </LayoutAdmin>
    );
};

export default AccountClient; 