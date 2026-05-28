export const startVoice = (navigate, speak) => {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    alert("Voice recognition not supported");
    return;
  }

  const recognition = new SpeechRecognition();

  recognition.lang = "en-US";
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  let isStopped = false;
  let lastCommand = "";
  let cooldown = false;

  /* =========================
     HELPERS
  ========================= */

  const includes = (text, ...phrases) =>
    phrases.some((p) => text.includes(p));

  /* =========================
     NAVIGATION COMMANDS
  ========================= */

  const navigationCommands = [

    /* ---------- HOME ---------- */
    {
      route: "/",
      label: "home",
      phrases: [
        "go home", "open home", "take me home",
        "go to home", "navigate home", "home page", "main page",
      ],
    },

    /* ---------- STAYS ---------- */
    {
      route: "/stays",
      label: "stays",
      phrases: [
        "open stays", "go to stays", "show stays",
        "view stays", "browse stays", "find stays",
        "search stays", "all stays", "available stays",
        "find a place", "find a stay", "book a stay",
      ],
    },

    /* ---------- LISTINGS ---------- */
    {
      route: "/listings",
      label: "listings",
      phrases: [
        "open listings", "go to listings", "show listings",
        "view listings", "all listings", "browse listings",
        "open listing", "show listing",
      ],
    },

    /* ---------- SEARCH ---------- */
    {
      route: "/search",
      label: "search",
      phrases: [
        "open search", "go to search", "search page",
        "search properties", "find properties",
        "search for stays", "search results",
      ],
    },

    /* ---------- RECOMMENDED ---------- */
    {
      route: "/recommended",
      label: "recommended",
      phrases: [
        "open recommended", "show recommended",
        "go to recommended", "recommendations",
        "show recommendations", "view recommended",
        "suggested for me", "best picks", "top picks",
        "what's recommended",
      ],
    },

    /* ---------- WISHLIST ---------- */
    {
      route: "/wishlist",
      label: "wishlist",
      phrases: [
        "open wishlist", "go to wishlist", "show wishlist",
        "view wishlist", "my wishlist", "open wish list",
        "favourites", "my favourites", "open favourites",
        "saved places", "my saved", "saved listings",
      ],
    },

    /* ---------- BOOKINGS ---------- */
    {
      route: "/bookings",
      label: "bookings",
      phrases: [
        "open bookings", "go to bookings", "my bookings",
        "show bookings", "view bookings", "my reservations",
        "open reservations", "show reservations",
        "upcoming bookings", "my trips", "open trips",
        "view trips", "show trips",
      ],
    },

    /* ---------- NEW BOOKING ---------- */
    {
      route: "/bookings/new",
      label: "new booking",
      phrases: [
        "new booking", "create booking", "make a booking",
        "add booking", "book now", "start booking",
        "make a reservation", "new reservation",
      ],
    },

    /* ---------- PROFILE ---------- */
    {
      route: "/profile",
      label: "profile",
      phrases: [
        "open profile", "go to profile", "my profile",
        "show profile", "view profile", "edit profile",
        "my account", "open account", "account settings",
        "update profile",
      ],
    },

    /* ---------- DASHBOARD ---------- */
    {
      route: "/dashboard",
      label: "dashboard",
      phrases: [
        "open dashboard", "go to dashboard", "show dashboard",
        "my dashboard", "view dashboard", "navigate to dashboard",
        "control panel",
      ],
    },

    /* ---------- ADMIN ---------- */
    {
      route: "/admin",
      label: "admin",
      phrases: [
        "open admin", "go to admin", "admin panel",
        "open admin panel", "admin page", "admin dashboard",
        "show admin", "manage site",
      ],
    },

    /* ---------- LOGIN ---------- */
    {
      route: "/login",
      label: "login",
      phrases: [
        "open login", "go to login", "login page",
        "sign in", "go to sign in", "open sign in",
        "log in", "log me in",
      ],
    },

    /* ---------- REGISTER / SIGNUP ---------- */
    {
      route: "/register",
      label: "register",
      phrases: [
        "register", "sign up", "create account",
        "open register", "go to register", "new account",
        "create a new account", "open signup", "join now",
      ],
    },

    /* ---------- LOGOUT ---------- */
    {
      route: "/logout",
      label: "logout",
      phrases: [
        "log out", "logout", "sign out",
        "log me out", "sign me out",
      ],
    },

    /* ---------- NOTIFICATIONS ---------- */
    {
      route: "/notifications",
      label: "notifications",
      phrases: [
        "open notifications", "show notifications",
        "view notifications", "my notifications",
        "any notifications", "check notifications",
        "open alerts", "show alerts",
      ],
    },

    /* ---------- MESSAGES / INBOX ---------- */
    {
      route: "/messages",
      label: "messages",
      phrases: [
        "open messages", "go to messages", "my messages",
        "show messages", "open inbox", "check inbox",
        "view inbox", "open chat", "show chat",
        "any messages",
      ],
    },

    /* ---------- SETTINGS ---------- */
    {
      route: "/settings",
      label: "settings",
      phrases: [
        "open settings", "go to settings", "settings page",
        "my settings", "preferences", "app settings",
        "account preferences",
      ],
    },

    /* ---------- HELP / SUPPORT ---------- */
    {
      route: "/help",
      label: "help",
      phrases: [
        "open help", "go to help", "help page",
        "support", "open support", "contact support",
        "i need help", "help me", "faq", "open faq",
      ],
    },

    /* ---------- ABOUT ---------- */
    {
      route: "/about",
      label: "about",
      phrases: [
        "open about", "about page", "about us",
        "go to about", "who are you", "what is this",
      ],
    },

    /* ---------- CONTACT ---------- */
    {
      route: "/contact",
      label: "contact",
      phrases: [
        "open contact", "contact us", "contact page",
        "go to contact", "get in touch", "reach out",
      ],
    },

    /* ---------- PRICING / PLANS ---------- */
    {
      route: "/pricing",
      label: "pricing",
      phrases: [
        "open pricing", "pricing page", "show pricing",
        "how much does it cost", "plans", "open plans",
        "subscription", "open subscription",
      ],
    },

    /* ---------- REVIEWS ---------- */
    {
      route: "/reviews",
      label: "reviews",
      phrases: [
        "open reviews", "show reviews", "view reviews",
        "my reviews", "all reviews", "ratings",
        "open ratings",
      ],
    },

    /* ---------- OFFERS / DEALS ---------- */
    {
      route: "/offers",
      label: "offers",
      phrases: [
        "open offers", "show offers", "view offers",
        "deals", "open deals", "special offers",
        "discounts", "open discounts", "promotions",
      ],
    },

    /* ---------- PAYMENT ---------- */
    {
      route: "/payment",
      label: "payment",
      phrases: [
        "open payment", "go to payment", "payment page",
        "billing", "open billing", "payment method",
        "add payment", "my payments",
      ],
    },

    /* ---------- MAP VIEW ---------- */
    {
      route: "/map",
      label: "map",
      phrases: [
        "open map", "show map", "view map",
        "map view", "explore map", "map of stays",
        "see on map",
      ],
    },

    /* ---------- CATEGORIES ---------- */
    {
      route: "/categories",
      label: "categories",
      phrases: [
        "open categories", "show categories",
        "view categories", "all categories",
        "browse categories",
      ],
    },

    /* ---------- HOST / ADD PROPERTY ---------- */
    {
      route: "/host",
      label: "host",
      phrases: [
        "become a host", "open host", "add property",
        "list my property", "add listing",
        "create listing", "host my place",
        "i want to host",
      ],
    },

  ];

  /* =========================
     START
  ========================= */

  recognition.start();
  console.log("🎤 Voice Started");

  /* =========================
     RESULT
  ========================= */

  recognition.onresult = (event) => {
    if (cooldown) return;

    const text = event.results[event.results.length - 1][0].transcript
      .toLowerCase()
      .trim();

    console.log("🎙 Heard:", text);

    if (text === lastCommand) return;

    lastCommand = text;
    cooldown = true;

    setTimeout(() => {
      cooldown = false;
      lastCommand = "";
    }, 1500);

    /* =========================
       STOP VOICE
    ========================= */

    if (
      includes(
        text,
        "stop voice", "close voice", "stop listening",
        "turn off voice", "disable voice", "voice off",
        "stop recognition", "mute voice"
      )
    ) {
      isStopped = true;
      recognition.stop();
      speak?.("Voice stopped");
      return;
    }

    /* =========================
       GO BACK
    ========================= */

    if (
      includes(
        text,
        "go back", "navigate back",
        "previous page", "last page",
        "take me back"
      )
    ) {
      window.history.back();
      speak?.("Going back");
      return;
    }

    /* =========================
       GO FORWARD
    ========================= */

    if (includes(text, "go forward", "next page", "forward")) {
      window.history.forward();
      speak?.("Going forward");
      return;
    }

    /* =========================
       REFRESH
    ========================= */

    if (includes(text, "refresh", "reload", "refresh page", "reload page")) {
      speak?.("Refreshing page");
      setTimeout(() => window.location.reload(), 800);
      return;
    }

    /* =========================
       SCROLL DOWN
    ========================= */

    if (
      includes(
        text,
        "scroll down", "move down",
        "slide down", "page down"
      )
    ) {
      window.scrollBy({ top: 400, behavior: "smooth" });
      speak?.("Scrolling down");
      return;
    }

    /* =========================
       SCROLL UP
    ========================= */

    if (
      includes(
        text,
        "scroll up", "move up",
        "slide up", "page up"
      )
    ) {
      window.scrollBy({ top: -400, behavior: "smooth" });
      speak?.("Scrolling up");
      return;
    }

    /* =========================
       TOP OF PAGE
    ========================= */

    if (
      includes(
        text,
        "go to top", "scroll to top",
        "top of page", "jump to top", "back to top"
      )
    ) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      speak?.("Going to top");
      return;
    }

    /* =========================
       BOTTOM OF PAGE
    ========================= */

    if (
      includes(
        text,
        "go to bottom", "scroll to bottom",
        "bottom of page", "jump to bottom"
      )
    ) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      speak?.("Going to bottom");
      return;
    }

    /* =========================
       ZOOM IN
    ========================= */

    if (includes(text, "zoom in", "make it bigger", "increase zoom")) {
      document.body.style.zoom =
        (parseFloat(document.body.style.zoom || 1) + 0.1).toFixed(1);
      speak?.("Zooming in");
      return;
    }

    /* =========================
       ZOOM OUT
    ========================= */

    if (includes(text, "zoom out", "make it smaller", "decrease zoom")) {
      document.body.style.zoom =
        (parseFloat(document.body.style.zoom || 1) - 0.1).toFixed(1);
      speak?.("Zooming out");
      return;
    }

    /* =========================
       RESET ZOOM
    ========================= */

    if (includes(text, "reset zoom", "normal zoom", "default zoom")) {
      document.body.style.zoom = "1";
      speak?.("Zoom reset");
      return;
    }

    /* =========================
       DARK MODE
    ========================= */

    if (includes(text, "dark mode", "enable dark", "turn dark", "night mode")) {
      window.dispatchEvent(new CustomEvent("voice:darkmode", { detail: "dark" }));
      speak?.("Dark mode on");
      return;
    }

    /* =========================
       LIGHT MODE
    ========================= */

    if (includes(text, "light mode", "enable light", "turn light", "day mode")) {
      window.dispatchEvent(new CustomEvent("voice:darkmode", { detail: "light" }));
      speak?.("Light mode on");
      return;
    }

    /* =========================
       PRINT PAGE
    ========================= */

    if (includes(text, "print page", "print this", "print")) {
      speak?.("Opening print dialog");
      setTimeout(() => window.print(), 800);
      return;
    }

    /* =========================
       COPY URL
    ========================= */

    if (includes(text, "copy link", "copy url", "copy this link")) {
      navigator.clipboard.writeText(window.location.href);
      speak?.("Link copied to clipboard");
      return;
    }

    /* =========================
       NAVIGATION COMMANDS
    ========================= */

    for (const { route, label, phrases } of navigationCommands) {
      if (phrases.some((phrase) => text.includes(phrase))) {
        navigate(route);
        speak?.(`Opening ${label}`);
        return;
      }
    }

    /* =========================
       UNRECOGNISED
    ========================= */

    console.log("🤷 Not recognised:", text);
  };

  /* =========================
     ERROR
  ========================= */

  recognition.onerror = (e) => {
    if (e.error === "no-speech") return;
    console.error("❌ Voice Error:", e.error);
  };

  /* =========================
     END — auto restart
  ========================= */

  recognition.onend = () => {
    console.log("🛑 Voice Ended");
    if (!isStopped) {
      setTimeout(() => recognition.start(), 500);
    }
  };

  return recognition;
};