import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
export default function ShowInfo() {
  const [allData, setAlldata] = useState();
  const location = useLocation();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (location.state && location.state.id !== null) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/showTreqs/${location.state.id}`,
            {
              headers: {
                Accept: "application/json",
                Authorization: `Bearer  ${token}`,
              },
            }
          );

          setAlldata(response);

          //   if (response.data.data[0].autograph_photo) {
          //     const photoFilename = response.data.data[0].autograph_photo;
          //     const photoUrl = `http://127.0.0.1:8000/Autographs/${photoFilename}`;
          //     setProfilePhoto(photoUrl);

          //     const fileExtension = response.data.data[0].autograph_photo
          //       .split(".")
          //       .pop();
          //     const mimeType = `image/${fileExtension}`;
          //     const blob = new Blob(["Placeholder content"], { type: mimeType });
          //     const file = new File(
          //       [blob],
          //       response.data.data[0].autograph_photo,
          //       { type: mimeType }
          //     );

          //     setFormData((prevFormData) => ({
          //       ...prevFormData,
          //       autograph_photo: file,
          //     }));
          //   }
        } catch (error) {
          console.error(error);
        }
      };
      fetchData();
    }
  }, [location.state]);
  console.log(allData);
  return <div className="registeration">dd{location.state.id}</div>;
}
