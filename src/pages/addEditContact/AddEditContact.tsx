import "./AddEditContact.css";
import { SnackBarComponent } from "../../components/snackBarComponent/SnackBarComponent";

import { useState, useEffect } from "react";

import { TextField, Typography, InputAdornment, Button } from "@mui/material";

import { useFormik } from "formik";

import stetoscope from "../../assets/images/contact/stethoscope.svg";
import clinicalNote from "../../assets/images/contact/editContact/clinical_notes.svg";
import call from "../../assets/images/contact/editContact/call.svg";
import mail from "../../assets/images/contact/editContact/mail.svg";
import location from "../../assets/images/contact/editContact/location_on.svg";
import sticyNote from "../../assets/images/contact/editContact/sticky_note_2.svg";
import save from "../../assets/images/contact/editContact/save.svg";
import { IContact } from "../../models/Contact";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import * as Yup from "yup";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  profession: Yup.string().required("Specialty is required"),
  phone: Yup.string()
    .required("Phone number is required")
    .matches(/^\d+$/, "Phone number must be numeric"),
  email: Yup.string().email("Invalid email format"),
  address: Yup.string(),
  notes: Yup.string()
});

function AddEditContact() {
  const navigate = useNavigate();
  const locationID = useLocation();

  const { id } = locationID.state || "";
  const isEditing = !!id;
  const [snackBarError, setSnackBarError] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<boolean>(false);
  const handleOnClickBackButton = () => {
    if (isEditing) {
      navigate(`/contacts/details`, { state: { id: id } });
    } else {
      navigate("/contacts");
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      profession: "",
      phone: "",
      email: "",
      address: "",
      notes: ""
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const titre = "Dr";
        const newContact = {
          name: values.name,
          notes: values.notes,
          qualification: titre,
          profession: values.profession,
          phone: values.phone,
          email: values.email,
          address: values.address
        };

        let response;
        if (isEditing) {
          response = await fetch(`http://localhost:3000/contacts/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
          });
        } else {
          response = await fetch("http://localhost:3000/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newContact)
          });
        }

        if (response.ok) {
          formik.resetForm();
          const savedContact = await response.json();
          if (isEditing){
            navigate("/contacts/details", { state: { id: savedContact.id } });
          }else {
            navigate("/contacts", { state: { newContact: savedContact } });
          }
          
        }
      } catch (error) {
        setSubmitError(true);
      }
    }
  });

  useEffect(() => {
    if (isEditing) {
      const fetchContactById = async (contactId: string) => {
        try {
          const response = await fetch(
            `http://localhost:3000/contacts/${contactId}`
          );
          const data: IContact = await response.json();
          formik.setValues({
            name: data.name || "",
            notes: data.notes || "",
            profession: data.profession || "",
            phone: data.phone || "",
            email: data.email || "",
            address: data.address || ""
          });
        } catch (error) {
          setSnackBarError(true);
        }
      };
      fetchContactById(id!);
    }
  }, [id, isEditing]);

  const [labelsEnable, setLabelsEnable] = useState({
    name: false,
    notes: false,
    profession: false,
    phone: false,
    email: false,
    address: false
  });

  const handleFocus = (field: keyof IContact) => {
    setLabelsEnable((prev) => ({
      ...prev,
      [field]: true
    }));
  };

  function HeadTitle() {
    if (isEditing) {
      return "Edit Doctor";
    } else {
      return "New Doctor";
    }
  }

  const title = HeadTitle();
  const handleSnackbarClose = () => {
    setSnackBarError(false);
  };

  const closeSubmitSnackBar = () => {
    setSnackBarError(false);
  };

  return (
    <>
      {snackBarError && (
        <SnackBarComponent
          open={snackBarError}
          close={handleSnackbarClose}
          severity="error"
          message="failled to fetch contact"
        />
      )}

      {submitError && (
        <SnackBarComponent
          open={snackBarError}
          close={closeSubmitSnackBar}
          severity="error"
          message="failled to submit data"
        />
      )}

      <Header
        showBackButton={true}
        title={title}
        onBackButtonClick={handleOnClickBackButton}
        showRightButton={false}
      />
      <div className="addContact-Container">
        <form onSubmit={formik.handleSubmit}>
          <div className="containPanel">
            <div className="panelContact">
              <div className="addPanel">
                <TextField
                  fullWidth
                  type="text"
                  name="name"
                  style={{ color: "#B3B3B3" }}
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  label={labelsEnable.name ? "Name" : ""}
                  onFocus={() => handleFocus("name")}
                  placeholder=""
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
                  style={{ color: "#B3B3B3" }}
                  name="profession"
                  value={formik.values.profession}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.profession &&
                    Boolean(formik.errors.profession)
                  }
                  helperText={
                    formik.touched.profession && formik.errors.profession
                  }
                  label={labelsEnable.profession ? "Specialty" : ""}
                  onFocus={() => handleFocus("profession")}
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
                  type="text"
                  name="phone"
                  style={{ color: "#B3B3B3" }}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.phone && Boolean(formik.errors.phone)}
                  helperText={formik.touched.phone && formik.errors.phone}
                  label={labelsEnable.phone ? "Phone number" : ""}
                  onFocus={() => handleFocus("phone")}
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
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  label={labelsEnable.email ? "E-mail" : ""}
                  onFocus={() => handleFocus("email")}
                  style={{ color: "#B3B3B3" }}
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
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.address && Boolean(formik.errors.address)
                  }
                  helperText={formik.touched.address && formik.errors.address}
                  label={labelsEnable.address ? "Address" : ""}
                  onFocus={() => handleFocus("address")}
                  style={{ color: "#B3B3B3" }}
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
                  value={formik.values.notes}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.notes && Boolean(formik.errors.notes)}
                  helperText={formik.touched.notes && formik.errors.notes}
                  sx={{ color: "#B3B3B3" }}
                  label={labelsEnable.notes ? "Notes" : ""}
                  onFocus={() => handleFocus("notes")}
                  placeholder="Notes"
                  InputProps={{
                    sx: {
                      display: "flex",
                      alignItems: "start",
                      padding: 2.4
                    },
                    startAdornment: (
                      <InputAdornment position="start">
                        <img
                          src={sticyNote}
                          alt="notes"
                          style={{ width: "20px", height: "20px" }}
                        />
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
