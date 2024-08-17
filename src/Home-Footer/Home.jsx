
import CardSessions from '../Card&details/CardSessions';
import Tutors from '../Tutors/Tutors';
import Banner from './../Banner/Banner';


const Home = () => {
    return (
        <div className='mx-auto container'>
        
          <Banner></Banner>
          <CardSessions></CardSessions>
          <Tutors></Tutors>
        </div>
    );
};

export default Home;