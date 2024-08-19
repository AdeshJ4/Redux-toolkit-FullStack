import * as React from "react";
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import * as Yup from "yup";
import { createMovie } from "../redux/slices/movieDetailsSlice";
import { useDispatch } from "react-redux";

const validationSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  releaseDate: Yup.date().required("Release Date is required"),
  genre: Yup.array()
    .min(1, "Select at least on genre")
    .required("Select at least one genre"),
  director: Yup.array().min(1, "At least one director must be added"),
  cast: Yup.array().min(1, "At least one cast member must be added"),
  synopsis: Yup.string().required("Synopsis is required"),
  duration: Yup.number().required("Duration is required").positive().integer(),
  language: Yup.string().required("Language is required"),
  country: Yup.string().required("Country is required"),
  rating: Yup.string().required("Rating is required"),
  boxOffice: Yup.number().required("Box Office is required").positive(),
  awards: Yup.array(), // Optional, not required
  trailerUrl: Yup.string().url("Enter a valid URL"),
  posterUrl: Yup.string().url("Enter a valid URL"),
  format: Yup.string().required("Format is required"),
  aspectRatio: Yup.string().required("Aspect Ratio is required"),
  resolution: Yup.string().required("Resolution is required"),
});

const MovieForm = () => {
  const dispatch = useDispatch();

  const [formValues, setFormValues] = useState({
    title: "",
    releaseDate: "",
    genre: [],
    director: [],
    newDirector : "",
    cast: [],
    newCastMember: "", // for the input field where the user types a new cast member's name
    synopsis: "",
    duration: "",
    language: "",
    country: "",
    rating: "",
    boxOffice: "",
    awards: [],
    newAward: "",
    trailerUrl: "",
    posterUrl: "",
    format: "",
    aspectRatio: "",
    resolution: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const validateForm = async () => {
    try {
      await validationSchema.validate(formValues, { abortEarly: false });
      const parsedData = validationSchema.cast(formValues);
      console.log("parsedData", parsedData);
      setErrors({});
      return true;
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return false;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await validateForm();
    if (isValid) {
      console.log("Form submitted:", formValues);
      const { newCastMember, newAward, ...dataToSubmit } = formValues;

      const result = await dispatch(createMovie(dataToSubmit));

      console.log("result", result);

      if (createMovie.fulfilled.match(result)) {
        console.log("Movie created successfully:", result.payload);
      } else {
        console.error("Failed to create movie:", result.payload);
      }

      setFormValues({
        // title: '',
        // releaseDate: '',
        // genre: [],
        // director: '',
        // cast: [],
        // synopsis: '',
        // duration: '',
        // language: '',
        // country: '',
        // rating: '',
        // boxOffice: '',
        // awards: [],
        // trailerUrl: '',
        // posterUrl: '',
        // format: '',
        // aspectRatio: '',
        // resolution: '',
        // newCastMember: '',
      });
    }
  };

  //  Genre Logic
  const handleGenreChange = (event) => {
    const { name, checked } = event.target;
    setFormValues((prevValues) => {
      const newGenres = checked
        ? [...prevValues.genre, name]
        : prevValues.genre.filter((genre) => genre !== name);
      return {
        ...prevValues,
        genre: newGenres,
      };
    });
  };

  // Cast Member logic
  const handleAddCastMember = () => {
    if (formValues.newCastMember.trim()) {
      setFormValues((prevValues) => ({
        ...prevValues,
        cast: [...prevValues.cast, formValues.newCastMember.trim()],
        newCastMember: "",
      }));
    }
  };

  const handleRemoveCastMember = (memberToRemove) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      cast: prevValues.cast.filter((member) => member !== memberToRemove),
    }));
  };


  // Director logic
  const handleAddDirector = () => {
    if (formValues.newDirector.trim()) {
      setFormValues((prevValues) => ({
        ...prevValues,
        director: [...prevValues.director, formValues.newDirector.trim()],
        newDirector: "",
      }));
    }
  };

  const handleRemoveDirector = (directorToRemove) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      director: prevValues.director.filter((director) => director !== directorToRemove),
    }));
  };


  // Award logic
  const handleAddAward = () => {
    if (formValues.newAward.trim()) {
      setFormValues((prevValues) => ({
        ...prevValues,
        awards: [...prevValues.awards, formValues.newAward.trim()],
        newAward: "",
      }));
    }
  };

  const handleRemoveAward = (awardToRemove) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      awards: prevValues.awards.filter((award) => award !== awardToRemove),
    }));
  };

  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit}
    >
      <TextField
        id="title"
        name="title"
        label="Title"
        value={formValues.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
      />
      <TextField
        id="releaseDate"
        name="releaseDate"
        label="Release Date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formValues.releaseDate}
        onChange={handleChange}
        error={!!errors.releaseDate}
        helperText={errors.releaseDate}
      />

      {/* Genre Checkboxes */}
      <FormControl component="fieldset" error={!!errors.genre}>
        <FormLabel component="legend">Genres</FormLabel>
        <FormGroup>
          {["Action", "Comedy", "Sci-fi", "Anime", "Thriller"].map((genre) => (
            <FormControlLabel
              key={genre}
              control={
                <Checkbox
                  checked={formValues.genre?.includes(genre)}
                  onChange={handleGenreChange}
                  name={genre}
                />
              }
              label={genre}
            />
          ))}
        </FormGroup>
        {errors.genre && <div style={{ color: "red" }}>{errors.genre}</div>}
      </FormControl>

      <TextField
        id="director"
        name="director"
        label="Director"
        value={formValues.director}
        onChange={handleChange}
        error={!!errors.director}
        helperText={errors.director}
      />

      {/* Cast Input Field with Add Button */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="newCastMember"
          name="newCastMember"
          label="Add Cast Member"
          value={formValues.newCastMember}
          onChange={handleChange}
          sx={{ flexGrow: 1 }}
        />
        <Button
          onClick={handleAddCastMember}
          variant="contained"
          sx={{ ml: 1 }}
        >
          Add
        </Button>
      </Box>
      {errors.cast && <div style={{ color: "red" }}>{errors.cast}</div>}

      {/* List of Cast Members with Delete Option */}
      <List>
        {formValues.cast?.map((member, index) => (
          <ListItem key={index}>
            <ListItemText primary={member} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveCastMember(member)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      {/* Award Input Field with Add Button */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="newAward"
          name="newAward"
          label="Add Award"
          value={formValues.newAward}
          onChange={handleChange}
          sx={{ flexGrow: 1 }}
        />
        <Button onClick={handleAddAward} variant="contained" sx={{ ml: 1 }}>
          Add
        </Button>
      </Box>
      {errors.awards && <div style={{ color: "red" }}>{errors.awards}</div>}

      {/* List of Awards with Delete Option */}
      <List>
        {formValues.awards?.map((award, index) => (
          <ListItem key={index}>
            <ListItemText primary={award} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveAward(award)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>


      {/* Director Input Field with Add Button */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <TextField
          id="newDirector"
          name="newDirector"
          label="Add Director"
          value={formValues.newDirector}
          onChange={handleChange}
          sx={{ flexGrow: 1 }}
        />
        <Button onClick={handleAddDirector} variant="contained" sx={{ ml: 1 }}>
          Add
        </Button>
      </Box>
      {errors.director && <div style={{ color: "red" }}>{errors.director}</div>}

      {/* List of Directors with Delete Option */}
      <List>
        {formValues.director?.map((director, index) => (
          <ListItem key={index}>
            <ListItemText primary={director} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleRemoveDirector(director)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>

      <TextField
        id="synopsis"
        name="synopsis"
        label="Synopsis"
        multiline
        rows={4}
        value={formValues.synopsis}
        onChange={handleChange}
        error={!!errors.synopsis}
        helperText={errors.synopsis}
      />
      <TextField
        id="duration"
        name="duration"
        label="Duration (minutes)"
        type="number"
        value={formValues.duration}
        onChange={handleChange}
        error={!!errors.duration}
        helperText={errors.duration}
      />
      <TextField
        id="language"
        name="language"
        label="Language"
        value={formValues.language}
        onChange={handleChange}
        error={!!errors.language}
        helperText={errors.language}
      />
      <TextField
        id="country"
        name="country"
        label="Country"
        value={formValues.country}
        onChange={handleChange}
        error={!!errors.country}
        helperText={errors.country}
      />
      <TextField
        id="rating"
        name="rating"
        label="Rating"
        value={formValues.rating}
        onChange={handleChange}
        error={!!errors.rating}
        helperText={errors.rating}
      />
      <TextField
        id="boxOffice"
        name="boxOffice"
        label="Box Office"
        type="number"
        value={formValues.boxOffice}
        onChange={handleChange}
        error={!!errors.boxOffice}
        helperText={errors.boxOffice}
      />

      <TextField
        id="trailerUrl"
        name="trailerUrl"
        label="Trailer URL"
        type="url"
        value={formValues.trailerUrl}
        onChange={handleChange}
        error={!!errors.trailerUrl}
        helperText={errors.trailerUrl}
      />
      <TextField
        id="posterUrl"
        name="posterUrl"
        label="Poster URL"
        type="url"
        value={formValues.posterUrl}
        onChange={handleChange}
        error={!!errors.posterUrl}
        helperText={errors.posterUrl}
      />
      <TextField
        id="format"
        name="format"
        label="Format"
        value={formValues.format}
        onChange={handleChange}
        error={!!errors.format}
        helperText={errors.format}
      />
      <TextField
        id="aspectRatio"
        name="aspectRatio"
        label="Aspect Ratio"
        value={formValues.aspectRatio}
        onChange={handleChange}
        error={!!errors.aspectRatio}
        helperText={errors.aspectRatio}
      />
      <TextField
        id="resolution"
        name="resolution"
        label="Resolution"
        value={formValues.resolution}
        onChange={handleChange}
        error={!!errors.resolution}
        helperText={errors.resolution}
      />

      {/* Submit Button */}
      <Button color="primary" variant="contained" type="submit">
        Submit
      </Button>
    </Box>
  );
};

export default MovieForm;
