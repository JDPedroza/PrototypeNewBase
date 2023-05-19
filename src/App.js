import RealEstate from "./components/realEstate";
import RealEstateState from "./context/realEstate/RealEstateState";

const App = () => {
  return (
    <RealEstateState>
		<RealEstate />
    </RealEstateState>
  );
};

export default App;
