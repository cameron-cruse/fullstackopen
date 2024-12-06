// eslint-disable-next-line react/prop-types
const Notification = ({ message, messageType }) => {
  let messageStyle = {};
  if (messageType) {
    messageStyle = {
      color: "Green",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  } else {
    messageStyle = {
      color: "Red",
      background: "lightgrey",
      fontSize: 20,
      borderStyle: "solid",
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
    };
  }

  if (message === null) {
    return null;
  }

  return (
    <div style={messageStyle} className="error">
      {message}
    </div>
  );
};

export default Notification;
