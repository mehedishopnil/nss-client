import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProviders';

const AdminOverview = () => {

    const {user,allUsers} = useContext(AuthContext);

    return (
        <div>
            <h1 className="text-2xl font-bold">Admin Overview</h1>
            <p className="mt-4">Welcome to the admin overview page.</p>
        </div>
    );
};

export default AdminOverview;