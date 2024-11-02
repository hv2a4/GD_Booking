import React from "react";
import LayoutAdmin from "../../../../components/layout/admin/DefaultLayout";
import Account from "./employee";
const Accountemployee = () => {
    return (
        <LayoutAdmin>
            <div className="container-fluid">
                <Account/>
            </div>
        </LayoutAdmin>
    );
};

export default Accountemployee; 