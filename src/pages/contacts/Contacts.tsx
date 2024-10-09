import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import "./Contacts.css";

import { useEffect, useState } from "react";
import search from "../../assets/images/contact/Icon.svg";
import arrowFoward from "../../assets/images/contact/arrow_forward_ios.svg";
import stethoscope from "../../assets/images/contact/stethoscope.svg";
import { IContact } from "../../models/Contact";
import Header from "../../components/header/Header";
import { FabButton } from "../../components/fabButton/FabButton";
import { useNavigate, useLocation } from "react-router-dom";

function Contacts() {
  const navigate = useNavigate();
  const location = useLocation();

  const [contacts, setContacts] = useState<IContact[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string>("");

  const getContacts = async (): Promise<void> => {
    try {
      const result = await fetch("http://localhost:3000/contacts");
      const fetchedContacts: IContact[] = await result.json();
  
      // Check if there's a new contact passed through location.state
      if (location.state && location.state.newContact) {
        const newContact = location.state.newContact;
  
        // Remove the new contact from the fetched list (if it exists)
        const updatedContacts = fetchedContacts.filter(contact => contact.id !== newContact.id);
  
        // Add the new contact at the top of the list
        updatedContacts.unshift(newContact);
  
        // Update the state with the updated list
        setContacts(updatedContacts);
      } else {
        // If no new contact, just set the fetched contacts
        setContacts(fetchedContacts);
      }
  
    } catch {
      setError("Failed to load contacts");
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const filteredContacts = contacts?.filter(
    (contact: IContact) =>
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.profession.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function emptyContacts(contacts: IContact[]): boolean {
    return contacts.length === 0;
  }
  function isNull(error: string): boolean {
    return error === "";
  }

  return (
    <>
      <Header title="Contacts" />
      <div className="contacts-container">
        <div className="searchContainer">
          <Paper
            component="div"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "90%",
              borderRadius: 20,
              backgroundColor: "#FFEFEF",
              maxHeight: 300
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search doctor"
              inputProps={{ "aria-label": "search doctor" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <img src={search} alt="search icon" />
            </IconButton>
          </Paper>

          <div className="listContact">
            {!isNull(error) ? (
              <Typography sx={{ color: "red" }}>{error}</Typography>
            ) : emptyContacts(contacts) ? (
              <Typography>No contact available</Typography>
            ) : (
              filteredContacts.map((contact: IContact) => (
                <Paper
                  key={contact.id}
                  component="form"
                  sx={{
                    p: "2px 4px",
                    display: "flex",
                    width: "90%",
                    justifyContent: "space-between",
                    backgroundColor: "#F4F4F4",
                    paddingTop: 1.5,
                    paddingBottom: 1.5
                  }}
                >
                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="stethoscope"
                  >
                    <img src={stethoscope} alt="stethoscope icon" />
                  </IconButton>

                  <div className="contactName">
                    <Typography
                      sx={{ fontSize: 17, fontWeight: 700 }}
                      className="typography1"
                    >
                      {contact.qualification}. {contact.name}
                    </Typography>

                    <Typography
                      sx={{ fontSize: 10, fontWeight: 400 }}
                      className="typography2"
                    >
                      {contact.profession}
                    </Typography>
                  </div>

                  <IconButton
                    type="button"
                    sx={{ p: "10px" }}
                    aria-label="arrowBack"
                    onClick={() => {
                      navigate(`/viewContact/${contact.id}`);
                    }}
                  >
                    <img src={arrowFoward} alt="arrowFoward icon" />
                  </IconButton>
                </Paper>
              ))
            )}
          </div>
        </div>

        <FabButton path="/addEditContact" />
      </div>
    </>
  );
}

export default Contacts;
