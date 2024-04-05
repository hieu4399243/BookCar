import { ColorRing } from "react-loader-spinner";
import React from "react";

export default function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <ColorRing
        visible={true}
        height="80"
        width="80"
        ariaLabel="color-ring-loading"
        wrapperStyle={{}}
        wrapperClass="color-ring-wrapper"
        colors={["#4465f0", "#1e48ed", "#637eec", "#6782ec", "#637eec"]}
      />
    </div>
  );
}
