import PropTypes from "prop-types";
import { useEffect } from "react";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
} from "react-google-places-autocomplete";

export default function AutoCompleteLocation(props) {
  // const [address, setAddress] = useState();
  // const [addressObj, setAddressObj] = useState();

  const getAddressObject = (address_components) => {
    const ShouldBeComponent = {
      street_number: ["street_number"],
      postal_code: ["postal_code"],
      street: ["street_address", "route"],
      province: [
        "administrative_area_level_1",
        "administrative_area_level_2",
        "administrative_area_level_3",
        "administrative_area_level_4",
        "administrative_area_level_5",
      ],
      city: [
        "locality",
        "sublocality",
        "sublocality_level_1",
        "sublocality_level_2",
        "sublocality_level_3",
        "sublocality_level_4",
      ],
      country: ["country"],
    };

    let address = {
      street_number: "",
      postal_code: "",
      street: "",
      province: "",
      city: "",
      country: "",
    };

    address_components.forEach((component) => {
      for (var shouldBe in ShouldBeComponent) {
        if (ShouldBeComponent[shouldBe].indexOf(component.types[0]) !== -1) {
          if (shouldBe === "country") {
            address[shouldBe] = component.short_name;
          } else {
            address[shouldBe] = component.long_name;
          }
        }
      }
    });

    // Fix the shape to match our schema
    address.address = address.street_number + " " + address.street;
    delete address.street_number;
    delete address.street;
    if (address.country === "US" || address.country == "PK") {
      address.state = address.province;
      delete address.province;
    }
    return address;
  };
  const { address, setAddressObj } = props;
  useEffect(() => {
    const func = async () => {
      const geocodeObj =
        address &&
        address.value &&
        (await geocodeByPlaceId(address.value.place_id));

      const addressObject =
        geocodeObj && getAddressObject(geocodeObj[0].address_components);
      setAddressObj(addressObject);
    };
    func();
  }, [address, setAddressObj]);

  return (
    <div
      style={{
        border: "2px solid #c3c3c7",
        borderRadius: "8px",
        padding: "4px",
      }}
    >
      <GooglePlacesAutocomplete
        placeholder="Type in an address"
        // autocompletionRequest={{
        //   componentRestrictions: {
        //     country: ["us"],
        //   },
        // }}
        apiKey={process.env.REACT_APP_google_location}
        name={props.name}
        selectProps={{
          isClearable: true,
          value: props.address,
          onChange: (val) => {
            props.setAddress(val);
            props.setData(val);
          },
        }}
      />
    </div>
  );
}

AutoCompleteLocation.propTypes = {
  address: PropTypes.any,
  addressObj: PropTypes.any,
  setAddress: PropTypes.func,
  setAddressObj: PropTypes.func,
  name: PropTypes.string,
  setData: PropTypes.any,
};
