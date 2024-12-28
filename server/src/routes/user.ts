import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  }),
);
// Callback URL
router.get(
  "/api/auth/callback/google",
  passport.authenticate("google", { failureRedirect: "/not-authenticated" }),
  (_req, res) => {
    res.redirect(`${process.env.FRONT_URL}`);
  },
);
// Route to check session data
router.get("/getsession", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});
export default router;
