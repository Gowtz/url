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
router.get(
  "/api/auth/callback/google",
  passport.authenticate("google", { failureRedirect: "/not-authenticated" }),
  function (_req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
  },
);
export default router;
