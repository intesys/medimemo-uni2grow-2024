import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./DoctorDetails.css";

import ContactMoreComponent from "../../components/contactMorecOPtion/ContactMoreComponent";

import wPhone from "../../assets/images/viewContact/wcall.svg";
import wMail from "../../assets/images/viewContact/wmail.svg";
import wLocation from "../../assets/images/viewContact/wlocation_on.svg";
import phone from "../../assets/images/contact/editContact/call.svg";
import mail from "../../assets/images/contact/editContact/mail.svg";
import location from "../../assets/images/contact/editContact/location_on.svg";
import notes from "../../assets/images/viewContact/demography.svg";

import { Typography } from "@mui/material";
import { IContact } from "../../models/Contact";
import Header from "../../components/header/Header";

export function DoctorDetails(): JSX.Element {
  // recupper l'id du contact de l'URLs
 
  const navigate = useNavigate();
  const locationID = useLocation();
  const { id } = locationID.state ;

  const [contact, setContact] = useState<IContact>({
    id: "",
    name: "",
    notes: "",
    qualification: "",
    profession: "",
    phone: "",
    email: "",
    address: ""
  });
  const [load, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch les details du contact via l'API
    fetch(`http://localhost:3000/contacts/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("failed to Fetch contact details");
        }
        return response.json();
      })
      .then((data) => {
        setContact(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (load) {
    return <Typography>loading Contact</Typography>;
  }

  if (error) {
    return <Typography>Error : {error}</Typography>;
  }

  if (!contact) {
    return <Typography>No contact found</Typography>;
  }

  const handleOnClickBackButton = () => {
    navigate("/contacts");
  };

  const editRoute: string = `/contacts/edit`;
  const deleteRoute: string = `http://localhost:3000/contacts/${id}`; // Pass the delete URL

  const contactName: string = ` ${contact.qualification}. ${contact.name}`;

  return (
    <>
      <Header
        title={contactName}
        showBackButton={true}
        showRightButton={true}
        onBackButtonClick={handleOnClickBackButton}
        RightButton={
          <ContactMoreComponent edit={editRoute} delete={deleteRoute} id={id}/>
        }
      />

      <div className="headTitle">
        <Typography
          height={22}
          sx={{
            fontSize: 14,
            fontWeight: 400,
            textAlign: "center",
            // paddingTop: 20px,
            paddingBottom: 2,
            color: "#444"
          }}
        >
          {contact.profession}
        </Typography>
      </div>

      <div className="viewContact-Container">
        <div className="viewContactPanel">
          <div className="boxDiv">
            <div className="boxInfos">
              <img color="white" src={wPhone} alt="contact" />
              <Typography sx={{ color: "white" }}>Ring</Typography>
            </div>
            <div className="boxInfos">
              <img color="white" src={wMail} alt="contact" />
              <Typography sx={{ color: "white" }}>E-mail</Typography>
            </div>
            <div className="boxInfos">
              <img color="white" src={wLocation} alt="contact" />
              <Typography sx={{ color: "white" }}>View</Typography>
            </div>
          </div>

          <div className="doctorProfile">
            <div className="doctorProps">
              <img src={phone} alt="contact" className="doctorPropsImg" />
              <Typography
                sx={{
                  paddingTop: 0.1,
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 2,
                  wordWrap: "break-word", // Ensure words break inside the container
                  overflowWrap: "break-word",
                  whiteSpace: "normal"
                }}
              >
                {contact.phone}
              </Typography>
            </div>
            <div className="doctorProps">
              <img src={mail} alt="mail" className="doctorPropsImg" />
              <Typography
                sx={{
                  paddingTop: 0.1,
                  color: "#444444",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 2,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal"
                }}
              >
                {" "}
                {contact.email}{" "}
              </Typography>
            </div>
            <div className="doctorProps">
              <img src={location} alt="location" className="doctorPropsImg" />
              <Typography
                sx={{
                  paddingTop: 0.1,
                  color: "#444444",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 2,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal"
                }}
              >
                {" "}
                {contact.address}{" "}
              </Typography>
            </div>
            <div className="doctorProps">
              <img src={notes} alt="notes" className="doctorPropsImg" />

              <Typography
                sx={{
                  paddingTop: 0.1,
                  color: "#444444",
                  fontSize: 14,
                  fontWeight: 400,
                  lineHeight: 2,
                  wordWrap: "break-word",
                  overflowWrap: "break-word",
                  whiteSpace: "normal",
                  flex: 1
                }}
                height="auto"
                width={240}
                
              >
                {contact.notes}
              </Typography>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
