import { useState, useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import covidLogo from './covid-19.svg'
import './App.css';
import { fetchCountries } from './api'
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { AreaChart } from './component/AreaChart';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: "50px auto",
    minWidth: "50%",
  },

}));


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("turkey");  //Dropdown'da ki country

  useEffect(() => {
    const fetchCountriesData = async () => {
      const countries = await fetchCountries();
      setCountries(countries);
    };
    fetchCountriesData();
  }, [])


  const classes = useStyles();
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container className="grid-container">
          <img src={covidLogo} alt="Covid 19 Logo"></img>
          <FormControl className={classes.formControl}>
            <Select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              {
                countries.map(country => (
                  <MenuItem value={country.Slug}>{country.Country}</MenuItem>))
              }
            </Select>
          </FormControl>


        </Grid>
       
          <Grid item sx={12}>
          <Paper>
            <AreaChart country={country}/>
            </Paper>
          </Grid>
      </Container>
    </>
  );
}

export default App;
