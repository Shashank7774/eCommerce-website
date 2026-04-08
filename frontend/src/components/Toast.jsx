export default function Toast ({message}){
    if(!message) return null;
    return(
        <div style={{position: "fixed",
      bottom: 30,
      right: 30,
      background: "#0f9d58",
      color: "white",
      padding: "12px 20px",
      borderRadius: 5,
      zIndex: 1000}}>{message}</div>
    );
};