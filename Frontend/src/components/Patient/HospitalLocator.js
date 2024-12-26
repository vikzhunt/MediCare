import { useEffect, useState } from "react";
import axios from "axios";

const HospitalLocator = () => {
  const [map, setMap] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [distances, setDistances] = useState([]);

  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
      });
      setMap(map);

      const fetchHospitals = (pos) => {
        axios
          .get(
            `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?keyword=Hospital&location=${pos.lat}%2C${pos.lng}&radius=1500&type=hospital&key=AlzaSy2-nu3N5iP5toXTRKlpED2F0_hza6eFKHb`
          )
          .then((response) => {
            if (response.data?.results) {
              setHospitals(response.data.results);
              console.log(response.data.results)

              const destinations = response.data.results.map(
                (hospital) =>
                  new window.google.maps.LatLng(
                    hospital.geometry.location.lat,
                    hospital.geometry.location.lng
                  )
              );
              const service = new window.google.maps.DistanceMatrixService();
              service.getDistanceMatrix(
                {
                  origins: [pos],
                  destinations,
                  travelMode: window.google.maps.TravelMode.DRIVING,
                },
                (result, status) => {
                  if (status === "OK") {
                    const distanceResults = result.rows[0].elements.map(
                      (element, index) => ({
                        hospital: response.data.results[index],
                        distance: element.distance.text,
                        distanceValue: element.distance.value,
                      })
                    );
                    distanceResults.sort((a, b) => a.distanceValue - b.distanceValue);

                    setDistances(distanceResults);
                    console.log(distanceResults)
                  } else {
                    console.error("Distance Matrix request failed:", status);
                  }
                }
              );

              response.data.results.forEach((hospital) => {
                new window.google.maps.Marker({
                  position: {
                    lat: hospital.geometry.location.lat,
                    lng: hospital.geometry.location.lng,
                  },
                  map: map,
                  title: hospital.name,
                });
              });
            } else {
              console.error("No hospital results found:", response.data);
            }
          })
          .catch((error) => {
            console.error("Error fetching hospitals:", error);
          });
      };

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            map.setCenter(pos);
            fetchHospitals(pos);
          },
          () => {
            alert("Geolocation is not supported by this browser.");
          }
        );
      } else {
        alert("Geolocation is not supported by this browser.");
      }
    };

    if (!window.google) {
      const script = document.createElement("script");
      script.src = `https://maps.gomaps.pro/maps/api/js?key=AlzaSy2-nu3N5iP5toXTRKlpED2F0_hza6eFKHb`;
      script.async = true;
      script.defer = true;
      window.initMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, []);

  return (
    <div style={{ display: "flex" }}>
      <div
        id="map"
        style={{ height: "100vh", width: "80%" }} 
      ></div>
      <div
        style={{
          width: "20%",
          padding: "10px",
          overflowY: "scroll",
          height: "100vh",
          backgroundColor: "#f4f4f4",
          boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2>Nearby Hospitals</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {distances.map((item, index) => (
            <li
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3>{item.hospital.name}</h3>
              <p><strong>Distance:</strong> {item.distance}</p>
              <p><strong>Address:</strong> {item.hospital.vicinity}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default HospitalLocator;
