// Importing required icons for input fields
import { IoIosLink } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaUser } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";

// Array of input field configurations
const inputFields = [
  // Business Owner Name
  {
    name: "ownerName",
    placeholder: "Business Owner Name",
    icon: FaUser,
    type: "text",
    validation: {
      required: "Owner name is required", // Validation: Field is required
    },
  },

  // Contact Number
  {
    name: "contactNumber",
    placeholder: "Contact Number",
    icon: IoMdCall,
    type: "tel",
    validation: {
      required: "Contact number is required", // Validation: Field is required
      pattern: {
        value: /^[0-9]{10}$/, // Regex for a 10-digit number
        message: "Enter a valid 10-digit contact number", // Error message for invalid input
      },
    },
  },

  // Business Email
  {
    name: "email",
    placeholder: "Business Email",
    icon: MdOutlineMail,
    type: "email",
    validation: {
      required: "Email is required", // Validation: Field is required
      pattern: {
        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regex for a valid email address
        message: "Enter a valid email address", // Error message for invalid input
      },
    },
  },

  // Website URL
  {
    name: "website",
    placeholder: "Website URL",
    icon: IoIosLink,
    type: "url",
    validation: {
      // required: "Website URL is required", // Validation: Field is required
      pattern: {
        value: /^(https?:\/\/)?(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+(\/\S*)?$/, // Regex for a valid URL
        message: "Enter a valid website URL", // Error message for invalid input
      },
    },
  },

  // Instagram Profile URL
  {
    name: "instagram",
    placeholder: "Instagram Profile Name or URL",
    icon: IoLogoInstagram,
    type: "text",
    required: "Instagram profile name or url is required",
    validation: {
      required: "Instagram username is required", // Required validation
      pattern: {
        value: /^[a-zA-Z0-9._-]+$/, // Regex for a valid Instagram username
        message: "Enter a valid Instagram username (letters, numbers, dots, underscores, or hyphens only)", // Error message
      },
    },
  },

  // Facebook Profile URL
  {
    name: "facebook",
    placeholder: "Facebook Profile Name or URL",
    icon: FaFacebook,
    type: "text",
    validation: {
      required: "Facebook username is required", // Required validation
      pattern: {
        value: /^[a-zA-Z0-9._-]+$/, // Regex for a valid Facebook username
        message: "Enter a valid Facebook username (letters, numbers, dots, underscores, or hyphens only)", // Error message
      },
    },
  },
];

// Exporting the input fields configuration
export default inputFields;