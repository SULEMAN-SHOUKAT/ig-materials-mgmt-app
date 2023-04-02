import React from "react";
import { Toaster, ToastBar, toast } from "react-hot-toast";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Alert from "@mui/material/Alert";

const Toast = () => {
  return (
    <Toaster
      toastOptions={{
        success: {
          style: {
            background: "#edf7ed",
          },
        },
        error: {
          style: {
            background: "#fdeded",
          },
        },
      }}
    >
      {(t) => (
        <ToastBar toast={t}>
          {({ message }) => {
            return (
              <>
                <Alert severity={message.props.children.type}>
                  {message.props.children.text}
                </Alert>
                {t.type !== "loading" && (
                  <IconButton
                    onClick={() => toast.dismiss(t.id)}
                    sx={{ color: "black" }}
                  >
                    <CloseIcon sx={{ fontSize: "16px", fontWeight: "600" }} />
                  </IconButton>
                )}
              </>
            );
          }}
        </ToastBar>
      )}
    </Toaster>
  );
};

export default Toast;
