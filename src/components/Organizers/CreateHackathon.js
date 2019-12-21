import React, { useState } from "react";
import "date-fns";
import useForm from "react-hook-form";
import {
  Button,
  FormLabel,
  TextField,
  Typography,
  InputAdornment,
  makeStyles
} from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import LanguageIcon from "@material-ui/icons/Language";
import TitleIcon from "@material-ui/icons/Title";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GroupIcon from "@material-ui/icons/Group";
import TodayIcon from "@material-ui/icons/Today";
import EventIcon from "@material-ui/icons/Event";
import ScheduleIcon from "@material-ui/icons/Schedule";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

// const useStyles = makeStyles(theme => ({}));

const CreateHackathon = () => {
  // const classes = useStyles();

  const [page1, setPage1] = useState(true);
  const [page1Info, setPage1Info] = useState({});
  const [page2, setPage2] = useState(false);
  const [page2Info, setPage2Info] = useState({});
  const [selectedStartDate, setSelectedStartDate] = useState(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState(new Date());

  let { register, handleSubmit, errors, clearError } = useForm();

  const handlePage1Change = e => {
    setPage1Info({ ...page1Info, [e.target.name]:e.target.value });
  };

  const handlePage2Change = e => {
    setPage2Info({ ...page2Info, [e.target.name]:e.target.value });
  };

  const handleStartDateChange = date => {
    setSelectedStartDate(date);
  };

  const handleEndDateChange = date => {
    setSelectedEndDate(date);
  };

  const toPage1 = () => {
    setPage1(true);
    setPage2(false);
  };

  const toPage2 = () => {
    setPage1(false);
    setPage2(true);
  };

  const handleFormSubmit = (data, e) => {
    e.preventDefault();
    const hackathonName = page1Info.hackathonName
    const hackathonLocation = page1Info.hackathonLocation
    const hackathonURL = page1Info.hackathonURL
    const pageTitle = page1Info.pageTitle
    const prize = page1Info.prize
    console.log('STATE ON SUBMIT', { ...data, hackathonName, hackathonLocation, hackathonURL, pageTitle, prize});
  };

  return (
    <div className="createHackathonContainer1">
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        style={{ width: "50%", margin: "0 auto" }}
      >
        {page1 && (
          <>
            <FormLabel>Hackathon info</FormLabel>
            <label className="hackathonName">
              <br />
              <FormLabel>Hackathon name</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="hackathonName"
                variant="outlined"
                margin="dense"
                defaultValue={page1Info.hackathonName}
                onChange={handlePage1Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <label className="hackathonLocation">
              <br />
              <FormLabel>Hackathon location</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="hackathonLocation"
                variant="outlined"
                margin="dense"
                defaultValue={page1Info.hackathonLocation}
                onChange={handlePage1Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOnIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <label className="hackathonURL">
              <br />
              <FormLabel>Event URL</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="hackathonURL"
                variant="outlined"
                margin="dense"
                defaultValue={page1Info.hackathonURL}
                onChange={handlePage1Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <label className="pageTitle">
              <br />
              <FormLabel>Page title</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="pageTitle"
                variant="outlined"
                margin="dense"
                defaultValue={page1Info.pageTitle}
                onChange={handlePage1Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <TitleIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <label className="prize">
              <br />
              <FormLabel>Prize</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="prize"
                variant="outlined"
                margin="dense"
                defaultValue={page1Info.prize}
                onChange={handlePage1Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CardGiftcardIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <br />
            <div
              style={{
                width: "16%",
                display: "flex",
                margin: "0 auto",
                justifyContent: "space-between"
              }}
            >
              <ArrowBackIosIcon
                onClick={() => toPage1()}
                style={{ fontSize: "1.5rem", color: "lightGrey" }}
              />
              <Typography>Step</Typography>
            <Typography>1</Typography>
            <Typography style={{ color: "lightGrey" }}>
                2
              </Typography>
              <ArrowForwardIosIcon
                onClick={() => toPage2()}
                style={{ fontSize: "1.5rem" }}
              />
            </div>
          </>
        )}
        {page2 && (
          <>
            <FormLabel>Hackathon info</FormLabel>
            <label className="teamMin">
              <br />
              <FormLabel>Team size (min.)</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="teamMin"
                variant="outlined"
                margin="dense"
                defaultValue={page2Info.teamMin}
                onChange={handlePage2Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <label className="teamMax">
              <br />
              <FormLabel>Team size (max.)</FormLabel>
              <br />
              <TextField
                type="text"
                fullWidth
                name="teamMax"
                variant="outlined"
                margin="dense"
                defaultValue={page2Info.teamMax}
                onChange={handlePage2Change}
                inputRef={register}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <GroupIcon />
                    </InputAdornment>
                  )
                }}
              />
            </label>
            <div>
              <label className="startDate">
                <br />
                <FormLabel>Event start date</FormLabel>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    autoOk
                    fullWidth
                    name="startDate"
                    margin="dense"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    keyboardIcon={<TodayIcon style={{ color: "black" }} />}
                    inputRef={register}
                    value={selectedStartDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={handleStartDateChange}
                  />
                </MuiPickersUtilsProvider>
              </label>
              <label className="startTime">
                <br />
                <FormLabel>Event start time</FormLabel>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    fullWidth
                    ampm={true}
                    name="startTime"
                    margin="dense"
                    inputVariant="outlined"
                    value={selectedStartDate}
                    onChange={handleStartDateChange}
                    inputRef={register}
                    keyboardIcon={<ScheduleIcon style={{ color: "black" }} />}
                    InputAdornmentProps={{ position: "start" }}
                  />
                </MuiPickersUtilsProvider>
              </label>
            </div>
            <div>
              <label className="endDate">
                <br />
                <FormLabel>Event end date</FormLabel>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    fullWidth
                    autoOk
                    name="endDate"
                    margin="dense"
                    inputVariant="outlined"
                    format="MM/dd/yyyy"
                    keyboardIcon={<EventIcon style={{ color: "black" }} />}
                    inputRef={register}
                    value={selectedEndDate}
                    InputAdornmentProps={{ position: "start" }}
                    onChange={handleEndDateChange}
                  />
                </MuiPickersUtilsProvider>
              </label>
              <label className="endTime">
                <br />
                <FormLabel>Event end time</FormLabel>
                <br />
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardTimePicker
                    fullWidth
                    ampm={true}
                    name="endTime"
                    margin="dense"
                    inputVariant="outlined"
                    value={selectedEndDate}
                    onChange={handleEndDateChange}
                    inputRef={register}
                    keyboardIcon={<ScheduleIcon style={{ color: "black" }} />}
                    InputAdornmentProps={{ position: "start" }}
                  />
                </MuiPickersUtilsProvider>
              </label>
            </div>
            <br />
            <Button type="submit">Submit</Button>
            <div
              style={{
                width: "16%",
                display: "flex",
                margin: "0 auto",
                justifyContent: "space-between"
              }}
            >
              <ArrowBackIosIcon
                onClick={() => toPage1()}
                style={{ fontSize: "1.5rem" }}
              />
              <Typography>Step</Typography>
              <Typography style={{ color: "lightGrey" }}>
                1
              </Typography>
              <Typography>2</Typography>
              <ArrowForwardIosIcon
                onClick={() => toPage2()}
                style={{ fontSize: "1.5rem", color: "lightGrey" }}
              />
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default CreateHackathon;
