
function Loading() {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        gap: "30px",
        backgroundColor: "#fff",
      }}
    >
      <img
        src="../todoist.png"
        style={{
          width: "70px",
          height: "auto",
        }}
        alt="Loading Logo"
        loading="lazy"
      />
      <div
        style={{
          position: "relative",
          width: "25px",
          height: "25px",
          border: "4px solid rgba(236, 236, 236, 0.41)",
          borderRadius: "50%",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "25px",
            height: "25px",
            border: "2px solid transparent",
            borderTop: "2px solid red",
            transform: "rotate(-45deg)",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        ></div>
      </div>

      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
}

export default Loading
