import useAuth from "../../Hook/UseAuth";


const Shared = () => {
    const{user} =useAuth()
    return (
        <div >
            <h1 className="flex items-center ">Welcome to your Dashboard {user?.DisplayName}</h1>
        </div>
    );
};

export default Shared;