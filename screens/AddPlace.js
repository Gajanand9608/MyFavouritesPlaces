import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

function AddPlace({ navigation }) {
  async function createPlaceHandler(placeData) {
    console.log("chech here ->" + placeData);
    await insertPlace(placeData);
    navigation.navigate("AllPlaces");
  }
  return <PlaceForm createPlaceHandler={createPlaceHandler} />;
}

export default AddPlace;
