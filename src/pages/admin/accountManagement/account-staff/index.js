import React from "react";
import LayoutAdmin from "../../../../components/layout/admin/DefaultLayout";
import Account from "./staff";
const AccountStaff = () => {
    return (
        <LayoutAdmin>
            <div className="container-fluid">
                <Account/>
            </div>
        </LayoutAdmin>
    );
};

export default AccountStaff; 