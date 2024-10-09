import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ViewContact.css";

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

export function ViewContact(): JSX.Element {
  // recupper l'id du contact de l'URLs
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const editRoute: string = `/addEditContact/${id} `;
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
          <ContactMoreComponent edit={editRoute} delete={deleteRoute} />
        }
      />
      <div className="viewContact-Container">
        <div className="contaierView">
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
                <img src={phone} alt="contact" />
                <Typography
                  sx={{
                    paddingTop: 0.1,
                    // fontFamily: "Open Sans",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 2
                  }}
                >
                  {contact.phone}
                </Typography>
              </div>
              <div className="doctorProps">
                <img src={mail} alt="mail" />
                <Typography
                  sx={{
                    paddingTop: 0.1,
                    color: "#444444",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 2
                  }}
                >
                  {" "}
                  {contact.email}{" "}
                </Typography>
              </div>
              <div className="doctorProps">
                <img src={location} alt="location" />
                <Typography
                  sx={{
                    paddingTop: 0.1,
                    color: "#444444",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 2
                  }}
                >
                  {" "}
                  {contact.address}{" "}
                </Typography>
              </div>
              <div className="doctorProps">
                <img src={notes} alt="notes" />
                <Typography
                  sx={{
                    paddingTop: 0.1,
                    color: "#444444",
                    fontSize: 14,
                    fontWeight: 400,
                    lineHeight: 2
                  }}
                  width={240}
                  height="auto"
                >
                  {contact.notes}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
