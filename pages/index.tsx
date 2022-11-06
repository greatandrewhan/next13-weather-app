import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Paper, TextInput, Button, Text, Group } from "@mantine/core";
import { useState } from "react";

const API_KEY = "9546929f0c7cdacd2cf95ff31dd2fc43";

export default function Home() {
  const [cityInput, setCityInput] = useState(""); //seattle

  const [weatherData, setWeatherData] = useState<any>({});

  async function getWeatherData() {
    console.log("Getting weather data...");
    console.log(cityInput);
    try {
      const res = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?" +
          "q=" +
          cityInput +
          "&appid=" +
          API_KEY +
          "&units=imperial"
      );
      const data = await res.json();
      console.log(data);
      if (data?.cod === "400") throw data;
      setWeatherData(data);
    } catch (error) {
      console.log(error);
    }
  }

  console.log(cityInput);

  return (
    <div
      style={{
        position: "static",
        height: "100vh",
        backgroundImage:
          "url('https://littlevisuals.co/images/atlantic_ridge.jpg')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Paper withBorder p="lg" style={{ maxWidth: "500px" }}>
          <Group position="apart">
            <Text size="xl">Get The Weather!</Text>
          </Group>
          <Group position="apart">
            <Text size="lg">Enter a city, and get the weather below!</Text>
          </Group>
          <Group position="apart" mb="xs">
            <TextInput
              label="City Name"
              placeholder="ex: New York"
              onChange={(e) => setCityInput(e.target.value)} // c -> setCityInput(c)
            />
          </Group>
          <Group position="apart">
            <Button
              variant="gradient"
              size="md"
              onClick={() => getWeatherData()}
            >
              Get Weather
            </Button>
          </Group>
          {Object.keys(weatherData).length !== 0 ? (
            <>
              <Group position="left" mt={"sm"}>
                <Text>{weatherData.name} Weather</Text>
              </Group>
              <Group position="left">
                <img
                  src={
                    "http://openweathermap.org/img/wn/" +
                    weatherData.weather[0].icon +
                    "@4x.png"
                  }
                  width="100px"
                  height="100px"
                />
                <Text size="lg" weight={500}>
                  {weatherData.main.temp} &deg;F
                </Text>
              </Group>
            </>
          ) : null}
        </Paper>
      </div>
    </div>
  );
}
