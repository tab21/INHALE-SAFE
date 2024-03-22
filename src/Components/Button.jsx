import React, { useEffect } from "react";
import mqtt from "mqtt";
import "../styles/button.css";

const clientId = "emqx_react_" + Math.random().toString(16).substring(2, 8);
const username = "emqx";
const password = "public";
const client = mqtt.connect("wss://broker.emqx.io:8084/mqtt", {
  clientId,
  username,
  password,
  // ...other options
});

const Button = () => {
  const mqttSub = () => {
    if (client) {
      const topic = "inhalesafe";
      const qos = 0;
      client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.log("Subscribe to topics error", error);
          return;
        }
        console.log(`Subscribe to topics: ${topic}`);
      });
    }
  };

  const mqttPublish = (message) => {
    if (client) {
      const topic = "inhalesafe";
      const qos = 0;
      const payload = message;
      const retain = true;
      client.publish(topic, payload, { qos, retain }, (error) => {
        if (error) {
          console.log("Publish error: ", error);
        }
      });
    }
  };

  client.on("message", (topic, message) => {
    console.log(`received message: ${message} from topic: ${topic}`);
    let btn = document.getElementById("btn");

    if (message == "on") {
      if (typeof window != undefined) {
        btn.checked = true;
      }
    } else if (message == "off") {
      btn.checked = false;
    }
  });

  useEffect(() => {
    mqttSub();
    // Cleanup function to unsubscribe when component unmounts
    return () => {
      if (client) {
        const topic = "inhalesafe";
        client.unsubscribe(topic, (error) => {
          if (error) {
            console.log("Unsubscribe error:", error);
          }
        });
      }
    };
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      mqttPublish("on");
    } else {
      mqttPublish("off");
    }
  };
  return (
    <>
      <div className="toggle">
        <input type="checkbox" onChange={handleChange} id="btn" />
        <label htmlFor="btn">
          <span className="track">
            <span className="txt"></span>
          </span>
          <span className="thumb">|||</span>
        </label>
      </div>
    </>
  );
};

export default Button;
