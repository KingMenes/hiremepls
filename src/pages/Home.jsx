import Header from "../components/Header/Header";
import SectionCardContainer from "../components/SectionCardContainer/SectionCardContainer";
import CreateQuestion from "../components/CreateQuestion";

function Home() {
  return (
    <>
      <CreateQuestion />
      <Header />
      <SectionCardContainer />
    </>
  );
}

export default Home;
