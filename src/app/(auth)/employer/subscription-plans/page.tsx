"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";

const SubscriptionPlansPage: React.FC = () => {
  const [selectedAccess, setSelectedAccess] =
    useState<string>("1 Month Access");

  const plans = [
    {
      name: "Basic",
      price: "3,500",
      description: "Best for small companies with less than 2 employees",
      features: [
        "Unlimited Views",
        "90 Unlocks",
        "6 Jobs",
        "30 Invitations",
        "2 Users",
        "Access unlocked profiles for up to 3 months",
      ],
      highlight: false,
    },
    {
      name: "Pro",
      price: "5,500",
      description: "Best for small companies hiring 1-2 people per month",
      features: [
        "Unlimited Views",
        "150 Unlocks",
        "60 Invitations",
        "3 Users",
        "Premium Support",
        "Access unlocked profiles for up to 3 months",
      ],
      highlight: false,
    },
    {
      name: "Gold",
      price: "8,400",
      description:
        "Best for companies with medium hiring needs or changing roles on the team",
      features: [
        "Unlimited Views",
        "300 Unlocks",
        "15 Jobs",
        "105 Invitations",
        "25 Users",
        "Featured Support",
        "Premium Support",
        "Access unlocked profiles for up to 3 months 0",
      ],
      highlight: true,
    },
    {
      name: "Platinum",
      price: "12,000",
      description:
        "Best for companies with large hiring needs or needing support with",
      features: [
        "Unlimited Views",
        "750+ Unlocks",
        "60+ Jobs",
        "300+ Invitations",
        "Premium Support",
        "Access unlocked profiles",
      ],
      highlight: true,
    },
  ];

  const handleAccessSelection = (access: string) => {
    setSelectedAccess(access);
  };

  return (
    <Box sx={{ p: 2 }}>
      {/* Heading */}
      <Typography
        variant="h4"
        textAlign="center"
        className="text-main"
        fontWeight={600}
        mb={2}
      >
        Ready to get started?
      </Typography>
      <Typography
        variant="subtitle1"
        textAlign="center"
        className="text-secondary"
        mb={4}
      >
        14 days unlimited free trial. No contract or credit card required.
      </Typography>

      {/* Access Buttons */}
      <Box
        className="bg-primary-100"
        sx={{
          display: "flex",
          justifyContent: "center", // Centers horizontally
          alignItems: "center", // Centers vertically
          gap: 2,
          padding: 1,
          width: "60%",
          margin: "0 auto",
          borderRadius: 5,
        }}
      >
        {[
          "1 Month Access",
          "3 Months Access",
          "6 Months Access",
          "6 Year Access",
        ].map((access) => (
          <Button
            key={access}
            onClick={() => handleAccessSelection(access)}
            sx={{
              px: 2,
              py: 1,
              borderRadius: 2,
              backgroundColor:
                selectedAccess === access ? "white" : "transparent",
              color: selectedAccess === access ? "#000" : "#333",
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
              },
            }}
          >
            {access}
          </Button>
        ))}
      </Box>

      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3, mb: 4 }}>
        {plans.map((plan, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{
                p: 1, // Reduced padding for a smaller overall card size
                position: "relative",
                border:
                  index === 3
                    ? "1px solid transparent" // Reduced border size
                    : index === 2
                      ? "none" // Remove border for the third card
                      : plan.name === "Platinum"
                        ? "2px solid #4CAF50" // Green border for Platinum plan
                        : plan.highlight && plan.name === "Gold"
                          ? "2px solid green"
                          : plan.highlight
                            ? "2px solid #1976d2"
                            : "1px solid #e0e0e0", // Default border style for others
                borderRadius: "18px", // Slightly smaller radius for a more compact look
                backgroundColor:
                  index === 0
                    ? "white"
                    : index === 1
                      ? "#D9D9D933"
                      : index === 2
                        ? "#d4ecd1" // Background color for the third card
                        : index === 3
                          ? "white" // Optional background color for the last card
                          : "white", // Default white background for others
                boxShadow:
                  plan.name === "Platinum"
                    ? "0 4px 12px rgba(76, 175, 80, 0.5)" // Green shadow for Platinum plan
                    : plan.highlight
                      ? "0 4px 12px rgba(0, 0, 0, 0.1)"
                      : "",
                ...(index === 3 && {
                  backgroundImage:
                    "linear-gradient(#FFFFFF, #FFFFFF), linear-gradient(90deg, #FFFFFF 0%, #2BA149 80%, #82C341 90%, #7BC48D 100%)", // Adjusted gradient stops for smaller border
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                }),
              }}
            >
              {/* Top-right badge */}
              {index === 1 ? (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "var(--primary)", // Background color for "Simple Pack"
                    color: "white",
                    px: 2,
                    py: 1,
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    borderTopLeftRadius: "0",
                    borderBottomLeftRadius: "20px",
                    borderTopRightRadius: "0",
                    display: "inline-block",
                  }}
                >
                  Simple Pack
                </Box>
              ) : (
                plan.highlight && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      background:
                        plan.name === "Gold"
                          ? "#2BA149" // Background color for "Most Popular"
                          : plan.name === "Platinum"
                            ? "#2EAE7D" // Background color for "Highly Suggested"
                            : "#1976d2", // Default fallback
                      color: "white",
                      px: 2,
                      py: 1,
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      borderTopLeftRadius: "0",
                      borderBottomLeftRadius: "20px",
                      borderTopRightRadius: "0",
                      display: "inline-block",
                    }}
                  >
                    {plan.name === "Gold"
                      ? "Most Popular"
                      : plan.name === "Platinum"
                        ? "Highly Suggested"
                        : ""}
                  </Box>
                )
              )}

              <CardContent>
                <Typography
                  variant="h4"
                  fontWeight={700}
                  sx={{
                    ...(plan.highlight &&
                      plan.name === "Gold" && {
                        background:
                          "linear-gradient(90deg, #185D43CC 0%, #82C341CC 60%)",
                        WebkitBackgroundClip: "text", // Apply gradient to the text
                        color: "transparent", // Make the text transparent so the gradient shows
                      }),
                  }}
                >
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" mb={3}>
                  {plan.description}
                </Typography>
                <Typography fontWeight={600}>
                  <span style={{ color: "black", fontSize: "24px" }}>
                    {plan.price}
                  </span>
                  <span style={{ color: "#AEAEAE", fontSize: "20px" }}>
                    {" "}
                    EGP/mo
                  </span>
                </Typography>

                {/* Total price section */}
                <Divider sx={{ my: 2 }} />
                {index === 0 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#000", marginTop: "8px" }}
                  >
                    Total price 11,700 EGP 11,200 EGP All prices are subject to
                    VAT
                  </Typography>
                ) : index === 1 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#000", marginTop: "8px" }}
                  >
                    Total price 17,400 EGP 16,600 EGP All prices are subject to
                    VAT
                  </Typography>
                ) : index === 2 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#000", marginTop: "8px" }}
                  >
                    Total price 26,250 EGP 25,000 EGP All prices are subject to
                    VAT
                  </Typography>
                ) : index === 3 ? (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ color: "#000", marginTop: "8px" }}
                  >
                    Total price 11,700 EGP 11,200 EGP All prices are subject to
                    VAT
                  </Typography>
                ) : null}

                {/* Add Excl. Vat Text */}
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ fontStyle: "italic", marginTop: "8px" }}
                >
                  Excl. Vat
                </Typography>
                <Divider sx={{ my: 2 }} />

                {/* Button with custom background color */}
                <Button
                  fullWidth
                  sx={{
                    backgroundColor:
                      index === 0
                        ? "#000" // First card: black button
                        : index === 3
                          ? "white" // Last card: white button
                          : "var(--primary)", // Second and third cards: green button
                    color: index === 3 ? "var(--primary)" : "white", // Text color for last card
                    borderRadius: 3,
                    border: index === 3 ? "2px solid var(--primary)" : "none", // Border for last card
                    "&:hover": {
                      backgroundColor:
                        index === 0
                          ? "#000" // First card: no hover effect (keeps black button)
                          : index === 3
                            ? "white" // Last card: no hover effect (keeps white button)
                            : "var(--primary)", // Second and third cards: no hover effect (keeps green button)
                      boxShadow: "none", // Remove hover shadow effect
                    },
                  }}
                >
                  Get started
                </Button>

                <Typography variant="subtitle1" fontWeight={600} my={2}>
                  Features Included:
                </Typography>
                <ul style={{ padding: 0, listStyle: "none" }}>
                  {plan.features.map((feature, idx) => (
                    <li
                      key={idx}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "8px",
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        component="span"
                        sx={{ marginRight: "8px", color: "#185D43" }} // Add space between the text and the chip
                      >
                        {feature}
                      </Typography>
                      {/* Chips for First Card */}
                      {index === 0 && [0, 2, 4].includes(idx) && (
                        <Chip
                          label="New"
                          sx={{
                            backgroundColor: "#127E64", // Background color for the Chip
                            color: "white", // White text color
                            fontSize: "0.400rem", // Even smaller font size
                            height: "15px", // Smaller height
                            marginLeft: "8px", // Add space between chip and text
                            borderRadius: "10px", // Optionally adjust the border radius for a rounder look
                          }}
                        />
                      )}
                      {/* Chips for Second Card */}
                      {index === 1 && [1, 2, 4].includes(idx) && (
                        <Chip
                          label="New"
                          sx={{
                            backgroundColor: "#127E64", // Background color for the Chip
                            color: "white", // White text color
                            fontSize: "0.400rem", // Even smaller font size
                            height: "15px", // Smaller height
                            marginLeft: "8px", // Add space between chip and text
                            borderRadius: "10px", // Optionally adjust the border radius for a rounder look
                          }}
                        />
                      )}
                      {/* Chips for Third Card */}
                      {index === 2 && [0, 2, 3, 5, 6].includes(idx) && (
                        <Chip
                          label="New"
                          sx={{
                            backgroundColor: "#127E64", // Background color for the Chip
                            color: "white", // White text color
                            fontSize: "0.400rem", // Even smaller font size
                            height: "15px", // Smaller height
                            marginLeft: "8px", // Add space between chip and text
                            borderRadius: "10px", // Optionally adjust the border radius for a rounder look
                          }}
                        />
                      )}
                      {/* Chips for Last Card */}
                      {index === 3 && (
                        <Chip
                          label="New"
                          sx={{
                            backgroundColor: "#127E64", // Background color for the Chip
                            color: "white", // White text color
                            fontSize: "0.400rem", // Even smaller font size
                            height: "15px", // Smaller height
                            marginLeft: "8px", // Add space between chip and text
                            borderRadius: "10px", // Optionally adjust the border radius for a rounder look
                          }}
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Typography
        variant="h4"
        textAlign="center"
        color={"#000B33"}
        sx={{ mb: 2, fontWeight: 700 }}
      >
        Try our 100% free Plan
      </Typography>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
          mt: 2,
          padding: 2.5,
          border: "2px solid #4CAF50",
          width: "60%",
          margin: "0 auto",
        }}
      >
        {/* Text with green border */}
        <Typography
          variant="subtitle1"
          sx={{
            padding: "8px 16px",
            borderRadius: "10px",
            fontWeight: 500,
            textAlign: "center",
            backgroundColor: "#F9FFF9",
            color: "#000",
          }}
        >
          Get started with our free plan and make 10 lookups per month
          absolutely free!
        </Typography>

        {/* Signup for Free button */}
        <Button
          sx={{
            backgroundColor: "#4CAF50",
            color: "#fff",
            fontWeight: "bold",
            px: 3,
            py: 1,
            "&:hover": {
              backgroundColor: "#45A049",
            },
          }}
        >
          Signup for Free
        </Button>
      </Box>
    </Box>
  );
};

export default SubscriptionPlansPage;
