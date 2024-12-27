import { Router } from "express";
import {
  getAnalyticsAll,
  getAnalyticsByAlias,
  getAnalyticsByTopic,
} from "../controllers/analytics";
import { auth } from "../middleware/auth";

const router = Router();
/**
 * @swagger
 * paths:
 *   /api/analytics/all:
 *     get:
 *       summary: Fetch analytics for all records
 *       security:
 *         - sessionCookie: []  # Require the session cookie to access this endpoint *       description: Retrieve overall analytics data for all URLs, including total clicks, unique users, and breakdowns by device and OS.
 *       tags:
 *         - Analytics
 *       responses:
 *         '200':
 *           description: Successful response with analytics data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   totalClicks:
 *                     type: integer
 *                   uniqueClicks:
 *                     type: integer
 *                   uniqueUsers:
 *                     type: integer
 *                   clicksByDate:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date
 *                         clicks:
 *                           type: integer
 *                   osType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         osName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *                   deviceType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         deviceName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *
 *   /api/analytics/{id}:
 *     get:
 *       summary: Fetch analytics by alias
 *       description: Retrieve analytics data for a specific URL alias, including total clicks, unique users, and breakdowns by device and OS.
 *       tags:
 *         - Analytics
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the URL alias
 *           schema:
 *             type: string
 *       security:
 *         - sessionCookie: []  # Require the session cookie to access this endpoint *       description: Retrieve overall analytics data for all URLs, including total clicks, unique users, and breakdowns by device and OS.
 *       responses:
 *         '200':
 *           description: Successful response with analytics data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   totalClicks:
 *                     type: integer
 *                   uniqueClicks:
 *                     type: integer
 *                   uniqueUsers:
 *                     type: integer
 *                   clicksByDate:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date
 *                         clicks:
 *                           type: integer
 *                   osType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         osName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *                   deviceType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         deviceName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *         '404':
 *           description: Not Found
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
 *
 *   /api/analytics/topic/{topic}:
 *     get:
 *       summary: Fetch analytics by topic
 *       description: Retrieve analytics data for all URLs under a specific topic.
 *       tags:
 *         - Analytics
 *       parameters:
 *         - in: path
 *           name: topic
 *           required: true
 *           description: Topic name
 *           schema:
 *             type: string
 *       security:
 *         - sessionCookie: []  # Require the session cookie to access this endpoint *       description: Retrieve overall analytics data for all URLs, including total clicks, unique users, and breakdowns by device and OS.
 *       responses:
 *         '200':
 *           description: Successful response with analytics data
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   totalClicks:
 *                     type: integer
 *                   uniqueClicks:
 *                     type: integer
 *                   uniqueUsers:
 *                     type: integer
 *                   clicksByDate:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         date:
 *                           type: string
 *                           format: date
 *                         clicks:
 *                           type: integer
 *                   osType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         osName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *                   deviceType:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         deviceName:
 *                           type: string
 *                         uniqueUsers:
 *                           type: integer
 *         '404':
 *           description: Not Found
 *         '401':
 *           description: Unauthorized
 *         '500':
 *           description: Internal Server Error
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
 * */
router.get("/all", auth, getAnalyticsAll);
router.get("/:id", auth, getAnalyticsByAlias);
router.get("/topic/:topic", auth, getAnalyticsByTopic);

export default router;
