import "./AddEditContact.css";

import {
  validateContactForm,
  formError,
  validationContactField
} from "../../utils/ValidateContact";

import { useState, useEffect } from "react";

import {
  TextField,
  Typography,
  InputAdornment,
  Button,
  Alert
} from "@mui/material";

import stetoscope from "../../assets/images/contact/stethoscope.svg";
import clinicalNote from "../../assets/images/contact/editContact/clinical_notes.svg";
import call from "../../assets/images/contact/editContact/call.svg";
import mail from "../../assets/images/contact/editContact/mail.svg";
import location from "../../assets/images/contact/editContact/location_on.svg";
import sticyNote from "../../assets/images/contact/editContact/sticky_note_2.svg";
import save from "../../assets/images/contact/editContact/save.svg";
import { IContact } from "../../models/Contact";
import { formValues } from "../../utils/Validation";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../components/header/Header";

function AddEditContact() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = !!id;

  const handleOnClickBackButton = () => {
    navigate("/contacts");
  };

  const [contact, setContact] = useState<formValues>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: ""
  });

  const [errors, setErrors] = useState<formError>({
    name: "",
    notes: "",
    profession: "",
    phone: "",
    email: "",
    address: ""
  });

  const [labelsEnable, setLabelsEnable] = useState({
    name: false,
    notes: false,
    profession: false,
    phone: false,
    email: false,
    address: false
  });

  useEffect(() => {
    if (isEditing) {
      const fetchContactById = async (contactId: string) => {
        try {
          const response = await fetch(
            `http://localhost:3000/contacts/${contactId}`
          );
          const data: IContact = await response.json();
          setContact({
            name: data.name,
            notes: data.notes || "",
            profession: data.profession || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || ""
          });
        } catch (error) {}
      };
      fetchContactById(id);
    }
  }, [id, isEditing]);

  // Handle input change for each field
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validationContactField(name, value);

    setErrors((prevState) => ({
      ...prevState,
      [name]: error || ""
    }));

    setContact({
      ...contact,
      [name]: value
    });
  };

  let alertError: boolean = false;

  const handleFocus = (field: keyof IContact) => {
    setLabelsEnable((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    // Validate the entire form before proceeding
    const validationErrors = validateContactForm(contact);

    // If there are validation errors, update the errors state and stop submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Set the validation errors to the state
      return; // Stop submission if validation fails
    }

    try {
      const titre: string = "Dr";
      const newContact: IContact = {
        name: contact.name,
        notes: contact.notes,
        qualification: titre,
        profession: contact.profession,
        phone: contact.phone,
        email: contact.email,
        address: contact.address
      };
      let response;

      // If editing make a PUT request
      if (isEditing) {
        response = await fetch(`http://localhost:3000/contacts/${id}`, {
          method: "PUT", // Use PUT to update the existing contact
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContact)
        });
      } else {
        // else, we're creating a new contact
        response = await fetch("http://localhost:3000/contacts", {
          method: "POST", // Use POST to create a new contact
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newContact)
        });
      }

      if (response.ok) {
        // clear the form
        setContact({
          name: "",
          notes: "",
          profession: "",
          phone: "",
          email: "",
          address: ""
        });

        const savedContact = await response.json(); // Get the saved contact with the ID
        navigate("/contacts", { state: { newContact: savedContact } }); // Pass the new contact
      } else {
        alertError = true;
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  function HeadTitle() {
    if (isEditing) {
      return "Edit Doctor";
    } else {
      return "New Doctor";
    }
  }

  const title = HeadTitle();

  return (
    <>
      <Header
        showBackButton={true}
        title={title}
        onBackButtonClick={handleOnClickBackButton}
        showRightButton={false}
      />
      <div className="addContact-Container">
        <form onSubmit={handleSubmit}>
          <div className="containPanel">
            <div className="panelContact">
              <div className="addPanel">
                {alertError ? (
                  <Alert severity="error">Contact was not added</Alert>
                ) : (
                  ""
                )}
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  style={{ color: "#B3B3B3" }}
                  value={contact.name}
                  onChange={handleInputChange}
                  error={!!errors.name}
                  helperText={errors.name}
                  onFocus={() => handleFocus("name")}
                  label={labelsEnable.name ? "Name" : ""}
                  placeholder=" "
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={stetoscope} alt="stetoscope" />
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 400,
                            fontStyle: "normal",
                            color: "#444"
                          }}
                          paddingLeft={2}
                        >
                          Dr.
                        </Typography>
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  type="text"
                  name="profession"
                  style={{ color: "#B3B3B3" }}
                  value={contact.profession}
                  onChange={handleInputChange}
                  error={!!errors.profession}
                  helperText={errors.profession}
                  onFocus={() => handleFocus("profession")}
                  label={labelsEnable.profession ? "Profession" : ""}
                  placeholder="Specialty"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={clinicalNote} alt="clinical notes" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  type="number"
                  name="phone"
                  style={{ color: "#B3B3B3" }}
                  value={contact.phone}
                  onChange={handleInputChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  onFocus={() => handleFocus("phone")}
                  label={labelsEnable.phone ? "Phone Number" : ""}
                  placeholder="Phone Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={call} alt="phone" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  value={contact.email}
                  style={{ color: "#B3B3B3" }}
                  onChange={handleInputChange}
                  error={!!errors.email}
                  helperText={errors.email}
                  onFocus={() => handleFocus("email")}
                  label={labelsEnable.name ? "E-mail" : ""}
                  placeholder="E-mail"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={mail} alt="email" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  type="text"
                  name="address"
                  style={{ color: "#B3B3B3" }}
                  value={contact.address}
                  onChange={handleInputChange}
                  error={!!errors.address}
                  helperText={errors.address}
                  onFocus={() => handleFocus("address")}
                  label={labelsEnable.address ? "Address" : ""}
                  placeholder="Address"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={location} alt="location" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  multiline
                  maxRows={5}
                  type="text"
                  name="notes"
                  value={contact.notes}
                  sx={{ color: "#B3B3B3" }}
                  onChange={handleInputChange}
                  error={!!errors.notes}
                  helperText={errors.notes}
                  onFocus={() => handleFocus("notes")}
                  label={labelsEnable.notes ? "Notes" : ""}
                  placeholder="Notes"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <img src={sticyNote} alt="notes" />
                      </InputAdornment>
                    )
                  }}
                />
              </div>
            </div>
          </div>
          <div className="button">
            <Button
              type="submit"
              fullWidth
              sx={{ background: "#f00" }}
              variant="contained"
            >
              <img src={save} />
              <Typography paddingLeft={1} paddingTop={0.5}>
                Save
              </Typography>
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default AddEditContact;
