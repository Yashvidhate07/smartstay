import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

/* ===================================================
   🚀 IMPORT ROUTES
=================================================== */

import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recommendRoutes from "./routes/recommendRoutes.js";

/* ===================================================
   ⚙️ ENV CONFIG
=================================================== */

dotenv.config();

/* ===================================================
   🚀 EXPRESS APP
=================================================== */

const app = express();

/* ===================================================
   🌐 DATABASE CONNECTION
=================================================== */

mongoose.connect(process.env.MONGO_URI)

  .then(() => {

    console.log("=======================================");
    console.log("✅ MongoDB Connected Successfully");
    console.log("=======================================");
  })

  .catch((err) => {

    console.log("=======================================");
    console.log("❌ MongoDB Connection Failed");
    console.log(err.message);
    console.log("=======================================");
  });

/* ===================================================
   🌐 GLOBAL MIDDLEWARE
=================================================== */

app.use(cors({

  origin: [

    "http://localhost:3000",
    "http://localhost:5173",
  ],

  credentials: true,

  methods: [

    "GET",
    "POST",
    "PUT",
    "DELETE",
    "OPTIONS",
  ],
}));

app.use(express.json({
  limit: "10mb",
}));

app.use(express.urlencoded({
  extended: true,
}));

app.use(morgan("dev"));

/* ===================================================
   🧠 REQUEST LOGGER
=================================================== */

app.use((req, res, next) => {

  console.log(
    `🚀 ${req.method} ${req.url}`
  );

  next();
});

/* ===================================================
   🏠 ROOT ROUTE
=================================================== */

app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "🚀 SmartStay AI Backend Running Successfully",

    serverTime:
      new Date(),

    environment:
      process.env.NODE_ENV || "development",
  });
});

/* ===================================================
   🚀 API ROUTES
=================================================== */

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/user",
  userRoutes
);

app.use(
  "/api/listings",
  listingRoutes
);

app.use(
  "/api/bookings",
  bookingRoutes
);

app.use(
  "/api/recommend",
  recommendRoutes
);

/* ===================================================
   📂 STATIC UPLOADS
=================================================== */

app.use(
  "/uploads",
  express.static("uploads")
);

/* ===================================================
   ❌ 404 HANDLER
=================================================== */

app.use((req, res) => {

  res.status(404).json({

    success: false,

    message:
      `❌ Route not found: ${req.originalUrl}`,
  });
});

/* ===================================================
   ⚠️ GLOBAL ERROR HANDLER
=================================================== */

app.use((err, req, res, next) => {

  console.error("🔥 SERVER ERROR:");
  console.error(err);

  res.status(
    err.statusCode || 500
  ).json({

    success: false,

    message:
      err.message ||
      "Internal Server Error",

    stack:
      process.env.NODE_ENV === "development"
        ? err.stack
        : undefined,
  });
});

/* ===================================================
   🔊 SERVER START
=================================================== */

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log("\n=======================================");
  console.log(
    `🚀 SmartStay AI Server Running`
  );
  console.log(
    `🌐 URL: http://localhost:${PORT}`
  );
  console.log(
    `📦 Environment: ${process.env.NODE_ENV || "development"}`
  );
  console.log("=======================================\n");
});