import { Router } from "express";
import { redirect, shorten } from "../controllers/url";
import { auth } from "../middleware/auth";
import { ip } from "../middleware/ip";

const router = Router();
/**
 * @swagger
 * /api/shorten:
 *   post:
 *     summary: Create a shortened URL
 *     description: Generate a shortened URL from a given input.
 *     security:
 *       - sessionCookie: []  # Require the session cookie to access this endpoint
 *     tags:
 *       - URL Shortener
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               longUrl:
 *                 type: string
 *                 example: "https://example.com"
 *     responses:
 *       200:
 *         description: Successfully created shortened URL.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 hash:
 *                   type: string
 *                   example: "abc123"
 *                 shortUrl:
 *                   type: string
 *                   example: "https://short.ly/abc123"
 *       401:
 *         description: Unauthorized.
 *       400:
 *         description: Bad Request.
 *
 * /api/shorten/{hash}:
 *   get:
 *     summary: Redirect to original URL
 *     description: Retrieve and redirect to the original URL using a shortened hash.
 *     tags:
 *       - URL Shortener
 *     parameters:
 *       - in: path
 *         name: hash
 *         required: true
 *         schema:
 *           type: string
 *           example: "abc123"
 *         description: The hash of the shortened URL.
 *     responses:
 *       301:
 *         description: Redirect to the original URL.
 *       404:
 *         description: URL not found.
 *       400:
 *         description: Bad Request.
 *
 *
 * components:
 *   securitySchemes:
 *     sessionCookie:
 *       type: apiKey
 *       in: cookie
 *       name: connect.sid
 *       description: Session ID cookie (connect.sid)
 *   security:
 *     - sessionCookie: []  # Use the session cookie as a security scheme
 */
router.post("/", auth, shorten);
router.get("/:hash", ip, redirect);

export default router;
