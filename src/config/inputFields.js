// Importing required icons for input fields
import { IoIosLink } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook, FaUser } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { MdCategory } from "react-icons/md";

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
    name: "business_phone",
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
    name: "business_email",
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
    name: "business_url",
    placeholder: "Website URL",
    icon: IoIosLink,
    type: "text",
    validation: {
      pattern: {
        value: new RegExp(
          "^(https?:\\/\\/)?(" +                               // optional protocol
          "localhost|" +                                       // localhost
          "((\\d{1,3}\\.){3}\\d{1,3})|" +                      // IPv4
          "([\\p{L}0-9-]+\\.)+[\\p{L}]{2,}" +                  // international domain
          ")(:\\d{1,5})?" +                                    // optional port
          "(\\/[^\\s]*)?$",                                    // optional path
          "u"                                                  // unicode flag
        ),
        message: "Enter a valid website URL",
      },
    },
  },

  // Instagram Profile URL
  {
    name: "instagram",
    placeholder: "Instagram Username",
    icon: IoLogoInstagram,
    type: "text",
    required: "Instagram profile name or url is required",
    validation: {
      required: "Instagram username is required",
      pattern: {
        value: /^[a-zA-Z0-9._]{1,30}$/, // Max length = 30
        message: "Enter a valid Instagram username (only letters, numbers, underscores, and dots)",
      },
    },
  },

  // Facebook Profile URL
  {
    name: "facebook",
    placeholder: "Facebook Username",
    icon: FaFacebook,
    type: "text",
    validation: {
      required: "Facebook username is required",
      pattern: {
        value: /^[\p{L}0-9._\- ]+$/u, // Unicode friendly
        message: "Enter a valid Facebook username (letters, numbers, dots, dashes, underscores, and spaces)",
      },
    },
  },
  {
    name: "businessCategory",
    placeholder: "Select Business Category",
    icon:MdCategory,
    type: "select",
    options: [
      "Real Estate & Builders",
      "Local Shops & D2C Brands",
      "Healthcare & Clinics",
      "Education & Coaching Institutes",
      "Salons & Spas",
      "Restaurants, Cafes & Cloud Kitchens",
      "Jewellery & Fashion Boutiques",
      "Fitness, Gyms & Yoga Studios",
      "Event Planners & Wedding Vendors",
      "Interior Designers & Architects",
    ],
    validation: {
      required: "Business category is required",
    },
  },
];

// Exporting the input fields configuration
export default inputFields;