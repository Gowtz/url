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
    // res.status(200).json({ msg: "Authenticated", user: req.user })
  },
);
export default router;
