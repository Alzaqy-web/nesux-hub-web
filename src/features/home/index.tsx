import EventList from "./components/EventList";
import Jumbotron from "./components/Jumbotron";

const HomePage = () => {
  return (
    <main className="container mx-auto p-4">
      <Jumbotron />
      <EventList />
    </main>
  );
};

export default HomePage;
