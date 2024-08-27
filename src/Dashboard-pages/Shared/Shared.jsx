import useAuth from "../../Hook/UseAuth";


const Shared = () => {
    const{user} =useAuth()
    console.log('user', user)
    return (
        <div className="flex justify-center mt-24 ">
            <h1 className="text-5xl font-bold text-green-800 ">Welcome to your Dashboard {user?.displayName}!</h1>
        </div>
    );
};

export default Shared;